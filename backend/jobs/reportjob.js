import cron from "node-cron";
import nodemailer from "nodemailer";
import { transporter } from "../utils/mailer.js"; 
import { Attendance } from "../schemas.js";

// ✅ Email config


// ✅ Get report
const getAttendanceReport = async (type) => {
  const now = new Date();
  let start = new Date();

  if (type === "daily") {
    start.setHours(0, 0, 0, 0);
  }

  if (type === "weekly") {
    start.setDate(now.getDate() - 7);
  }

  if (type === "monthly") {
    start.setMonth(now.getMonth() - 1);
  }

  return await Attendance.find({
    date: { $gte: start, $lte: now },
  });
};

// ✅ Send email
const sendReportEmail = async () => {
  const daily = await getAttendanceReport("daily");
  const weekly = await getAttendanceReport("weekly");
  const monthly = await getAttendanceReport("monthly");

  await transporter.sendMail({
    from: "23005A0506@jntua.ac.in",
    to: "kusumanali2004@gmail.com",
    subject: "📊 Attendance Report",
    html: `
      <h2>Attendance Report</h2>
      <p>Daily: ${daily.length}</p>
      <p>Weekly: ${weekly.length}</p>
      <p>Monthly: ${monthly.length}</p>
    `,
  });

  console.log("📧 Report sent");
};

// ✅ CRON JOB (10 PM daily)
// cron.schedule("00 22* * *", async () => {
//   console.log("⏰ Running report job...");
//   await sendReportEmail();
// });

// ✅ CRON JOB (12:03 AM daily)
cron.schedule("26 0 * * *", async () => {
  console.log("⏰ Running report job at 12:03 AM...");
  await sendReportEmail();
});