import cron from "node-cron";
import { transporter } from "../utils/mailer.js"; 
import { Attendance } from "../schemas.js";

// Helper: get start date based on type
const getStartDate = (type) => {
  const now = new Date();
  let start = new Date(now);
  const istOffset = 5.5 * 60 * 60 * 1000; // 5h30m
start = new Date(start.getTime() - istOffset);
now = new Date(now.getTime() - istOffset);

  if (type === "daily") {
    start.setHours(0, 0, 0, 0);
  }

  if (type === "weekly") {
    start.setDate(now.getDate() - 7);
    start.setHours(0, 0, 0, 0);
  }

  if (type === "monthly") {
    start.setMonth(now.getMonth() - 1);
    start.setHours(0, 0, 0, 0);
  }

  return start;
};

// Fetch attendance grouped by department & year
const getAttendanceReport = async (type) => {
  const now = new Date();
  let start = new Date();

  if (type === "daily") {
    start.setHours(0,0,0,0);
    now.setHours(23,59,59,999);
  }

  if (type === "weekly") {
    start.setDate(now.getDate() - 7);
    start.setHours(0,0,0,0);
  }

  if (type === "monthly") {
    start.setMonth(now.getMonth() - 1);
    start.setHours(0,0,0,0);
  }

  const report = await Attendance.aggregate([
    {
      $match: { date: { $gte: start, $lte: now }, status: "Present" }
    },
    {
      $lookup: {
        from: "students",           // name of the Student collection
        localField: "studentId",
        foreignField: "_id",
        as: "student"
      }
    },
    { $unwind: "$student" },       // flatten the array
    {
      $group: {
        _id: { department: "$student.branch", year: "$student.year" },
        count: { $sum: 1 }
      }
    },
    { $sort: { "_id.department": 1, "_id.year": 1 } }
  ]);

  console.log("Report for", type, report);
  return report;
};
const formatReport = (report) => {
  if (report.length === 0) return "<p>No attendance records</p>";

  let html = "<table border='1' cellpadding='5' cellspacing='0'>";
  html += "<tr><th>Department</th><th>Year</th><th>Count</th></tr>";

  report.forEach(r => {
    html += `<tr>
      <td>${r._id.department}</td>
      <td>${r._id.year}</td>
      <td>${r.count}</td>
    </tr>`;
  });

  html += "</table>";
  return html;
};
const sendReportEmail = async () => {
  const daily = await getAttendanceReport("daily");
  const weekly = await getAttendanceReport("weekly");
  const monthly = await getAttendanceReport("monthly");

  const htmlContent = `
    <h2>📊 Attendance Report</h2>
    <h3>Daily</h3>${formatReport(daily)}
    <h3>Weekly</h3>${formatReport(weekly)}
    <h3>Monthly</h3>${formatReport(monthly)}
  `;

  await transporter.sendMail({
    from: "nalikusuma2004gmail.com",
    to: "kusumanali2004@gmail.com",
    subject: "📈 Attendance Report (Dept & Year Wise)",
    html: htmlContent
  });

  console.log("📧 Attendance report sent successfully!");
};

// Run daily at 10 PM
cron.schedule("07 11 * * *", async () => {
  console.log("⏰ Running report job...");
  await sendReportEmail();
}); 