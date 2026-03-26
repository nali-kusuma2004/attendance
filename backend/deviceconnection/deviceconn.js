import ZKLib from 'zklib-js';
import { Student, Attendance } from '../schemas.js';

const device = new ZKLib("192.168.0.6", 4370, 10000, 4000);

// ✅ Cache
let studentCache = new Map();

// ✅ Connect
async function connectDevice() {
  try {
    await device.createSocket();
    console.log("✅ Device Connected");
  } catch (err) {
    console.log("❌ Connection Failed:", err.message);
  }
}

// ✅ Load Cache (key = rollNo)
async function loadStudentCache() {
  const students = await Student.find();

  studentCache.clear();
  students.forEach(s => {
    studentCache.set(s.rollNo, s);
  });

  console.log("📦 Cache Loaded:", studentCache.size);
}

// ✅ SYNC USERS (ROLLNO → BIOMETRIC ID)
export const syncUsers = async (req, res) => {
    const result = await device.getUsers();
    const users = result?.data || [];

    let updatedCount = 0;
    let skippedCount = 0;

    for (const user of users) {
      const rollNo = user.name?.trim();   // 👈 rollNo from device
      const biometricId = user.userId;    // 👈 actual ID

      if (!rollNo) {
        console.log("⚠ Skipped: Empty name");
        skippedCount++;
        continue;
      }

      // 🔥 UPDATE ONLY (NO INSERT)
      const updated = await Student.updateOne(
        { rollNo: rollNo },               // find condition
        { $set: { biometricId: biometricId } }
      );

      if (updated.matchedCount === 0) {
        console.log(`❌ Not found: ${rollNo}`);
        skippedCount++;
      } else {
        console.log(`✅ Updated: ${rollNo} → ${biometricId}`);
        updatedCount++;
      }
    }

    res.json({
      message: "Sync completed ✅",
      updated: updatedCount,
      skipped: skippedCount
    });

  
};



// ✅ SYNC ATTENDANCE
export const syncAttendances = async (req, res) => {
  try {
   

    const logs = await device.getAttendances();
    const attendanceLogs = logs?.data || [];

    let saved = 0;
    let skipped = 0;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    for (const log of attendanceLogs) {
      const biometricId = String(log.deviceUserId).trim();

      if (!biometricId) continue;

      // 🔍 Find student using biometricId
      const student = await Student.findOne({ biometricId });

      if (!student) {
        console.log(`❌ Student not found: ${biometricId}`);
        skipped++;
        continue;
      }

      // ❌ CHECK DUPLICATE (IMPORTANT)
      const alreadyMarked = await Attendance.findOne({
        biometricId,
        date: { $gte: startOfDay, $lte: endOfDay }
      });

      if (alreadyMarked) {
        console.log(`⚠ Already marked: ${student.rollNo}`);
        skipped++;
        continue;
      }

      // ✅ SAVE ATTENDANCE
      await Attendance.create({
        studentId: student._id,
        biometricId,
        rollNo: student.rollNo,
        department: student.department,
        year: student.year,
        date: new Date(),
        status: "Present"
      });

      console.log(`✅ Marked: ${student.rollNo}`);
      saved++;
    }

    // res.json({
    //   message: "Attendance sync completed ✅",
    //   saved,
    //   skipped
    // });

  } catch (err) {
    console.error("❌ Error:", err.message);

    // res.status(500).json({
    //   error: "Attendance sync failed"
    // });
  }
};

// ✅ MAIN LOOP
async function startSync() {
  await connectDevice();
  await loadStudentCache();

  setInterval(async () => {
    try {
      await syncUsers();
      
    } catch (err) {
      console.log("⚠️ Reconnecting...");
      await connectDevice();
    }
    await syncAttendances();
  }, 50000);
  
}

startSync();
