import ZKLib from "zklib-js";

import { Student, Attendance } from "../schemas.js";

const device = new ZKLib("192.168.0.6", 4370, 10000, 4000);

// ✅ Cache
let studentCache = new Map();
let devicestatus="Offline";

// ✅ Connect
async function connectDevice() {
  try {
    await device.createSocket();
    // await device.setTime(new Date());

    console.log("✅ Device Connected");
    devicestatus="Online";
  } catch (err) {
    console.log("❌ Connection Failed:", err.message);
    devicestatus="Offline";
     
  }
}

// ✅ Load Cache (key = rollNo)
async function loadStudentCache() {
  const students = await Student.find();

  studentCache.clear();
  students.forEach((s) => {
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
    const rollNo = user.name?.trim(); // 👈 rollNo from device
    const biometricId = user.userId; // 👈 actual ID

    if (!rollNo) {
      console.log("⚠ Skipped: Empty name");
      skippedCount++;
      continue;
    }

    // 🔥 UPDATE ONLY (NO INSERT)
    const updated = await Student.updateOne(
      { rollNo: rollNo }, // find condition
      { $set: { biometricId: biometricId } },
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
    skipped: skippedCount,
  });
};

// ✅ SYNC ATTENDANCE
export const syncAttendances = async (req, res) => {
  try {
    const logs = await device.getAttendances();
    const attendanceLogs = logs?.data || [];
    // console.log(attendanceLogs.slice(-5))
    let saved = 0;
    let skipped = 0;

    // ✅ TODAY RANGE (IST)
    const now = new Date();

    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    console.log("📥 Total Logs from Device:", attendanceLogs.length);

    for (const log of attendanceLogs) {
  const biometricId = String(log.deviceUserId).trim();
  if (!biometricId) continue;

  // ✅ FIX TIMEZONE (force IST)
  const rawTime = log.recordTime || log.timestamp;
  const logTime = new Date(rawTime);

  // 👉 Adjust if device gives UTC (optional safety)
  // const logTime = new Date(new Date(rawTime).getTime() + (5.5 * 60 * 60 * 1000));

  // ✅ TODAY FILTER
  if (logTime < startOfDay || logTime > endOfDay) continue;

  const student = await Student.findOne({ biometricId });

  if (!student) {
    console.log(`❌ Student not found: ${biometricId}`);
    skipped++;
    continue;
  }

  // ✅ START & END OF DAY (for duplicate check)
  const start = new Date(logTime);
  start.setHours(0, 0, 0, 0);

  const end = new Date(logTime);
  end.setHours(23, 59, 59, 999);

  // ✅ CHECK EXISTING
  const existing = await Attendance.findOne({
    biometricId,
    date: { $gte: start, $lte: end }
  });

  if (existing) {
    skipped++;
    continue;
  }

  // ✅ INSERT
  await Attendance.create({
    studentId: student._id,
    biometricId,
    rollNo: student.rollNo,
    department: student.department,
    year: student.year,
    status: "Present",
    date: logTime   // 🔥 full datetime
  });

  console.log(`✅ Marked: ${student.rollNo}`);
  saved++;
}

    console.log(`🎯 Saved: ${saved}, Skipped: ${skipped}`);

    if (res) {
      res.json({
        message: "Today's Attendance Synced ✅",
        saved,
        skipped
      });
    }

  } catch (err) {
    console.error("❌ Error:", err.message);

    if (res) {
      res.status(500).json({ error: err.message });
    }
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
