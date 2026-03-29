const express=require("express");
const multer = require("multer");
const PORT=8000;
const server=express();
const mongoose=require("mongoose");
const cors=require("cors");
const {User1 ,staff,Student,Attendance} = require("./schemas")
const jwt=require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretkey="secret";
const userroutes=require("./routes/userroutes");
const { deviceconnec } = require("./deviceconnection/deviceconn");


server.use(cors());
server.use(express.json());
server.use("/api",userroutes);
const url="mongodb+srv://nalikusuma2004_db_user:attendance123@cluster0.wtyue9h.mongodb.net/userdata?retryWrites=true&w=majority";

mongoose.connect(url)
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.error("Could not connect to MongoDB",err));


// server.get("/",(req,res)=>{
//     res.send("Hello World!");
// });
server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
});

// sign in api 
// server.post("/sign",async  (req, res) => {
//   const { username, password ,role} = req.body;
//  const exist= await User1.findOne({ username: username });
//     if (exist) {
//       // user already exists
//       return res.status(409).send({
//         message: "User already exists",
//       });
//     }
//     const hashedPassword =await bcrypt.hash(password, 10);
      
//       // create new user
//       const newUser = new User1({ username, password:hashedPassword ,role});
//      await newUser
//         .save()
//         .then(() => {
//           res.status(201).send({ message: "User Created" });
//         })
//         .catch((err) => {
//           res.status(500).send({
//             message: "Error Creating User",
//             error: err.message,
//           });
//         });
//     });

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 16 * 1024 * 1024 }, // 16 MB
});


server.post("/sign", async (req, res) => {

const { username, password, role } = req.body;

if(!username || !password){
  return res.status(400).json({
    message:"Username and Password required"
  })
}

const exist = await User1.findOne({ username });

if (exist) {
  return res.status(409).send({
    message: "User already exists",
  });
}

const hashedPassword = await bcrypt.hash(password, 10);

const newUser = new User1({
  username,
  password: hashedPassword,
  role
});

await newUser.save();
// console.log("New user created:", newUser);
res.status(201).json({
  message:"User created successfully"
});

});

//login api
server.post("/login",async (req,res)=>{
    const {username,password}=req.body;
    const data= await User1.findOne({username:username});
      if(!data){
        return res.status(401).send({
          message:"Invalid Username or Password"
        })
      }
      // check the password that is stored in database 
      const isPasswordValid = await bcrypt.compare(password, data.password);
    if(!isPasswordValid){
      return res.status(401).send({
        message:"Invalid Username or Password"
      })
    }
    
    //create jwt token to send it to the client
    const token=jwt.sign({id:data._id,username:data.username},secretkey,{expiresIn:'1h'})
    res.json({
      token,
      username:data.username,
      role:data.role
    })
    
})


// add staff
server.post("/api/staff", async (req, res) => {
  try {

    const newStaff = new staff(req.body);

    await newStaff.save();

    res.status(201).json({
      message: "Staff added successfully",
      data: newStaff
    });

  } catch (error) {

    res.status(500).json({
      message: "Error adding staff",
      error: error.message
    });

  }
});


//get staff
server.get("/api/staff", async (req, res) => {
  try {

    const staffList = await staff.find();

    res.json(staffList);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching staff",
      error: error.message
    });

  }
});


//delete staff
server.delete("/api/staff/:id", async (req, res) => {

  try {

    await staff.findByIdAndDelete(req.params.id);

    res.json({
      message: "Staff deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error deleting staff"
    });

  }

});



// reset password 
server.put("/api/reset-password", async (req,res)=>{

const {username,password,confirmpassword} = req.body;

if(password !== confirmpassword){
  return res.status(400).json({
    message:"Passwords do not match"
  })
}

const user = await User1.findOne({username});

if(!user){
  return res.status(404).json({
    message:"User not found"
  })
}

const hashedPassword = await bcrypt.hash(password,10);

user.password = hashedPassword;

await user.save();

res.json({
message:"Password reset successful"
})

})

// add student
server.post("/api/student",upload.single("image"), async (req, res) => {
  try {

    const newStudent = new Student(req.body);
    if(req.file){
   newStudent.photo = {
    data: req.file.buffer,
    contentType: req.file.mimetype
  }
}
    await newStudent.save();

    res.status(201).json({
      message: "Student added successfully",
      data: newStudent
    });

  } catch (error) {

    res.status(500).json({
      message: "Error adding student",
      error: error.message
    });
  }
});


//get student
server.get("/api/student", async (req, res) => {

try{

const studentList = await Student.find();

res.json(studentList);

}catch(error){

res.status(500).json({
message:"Error fetching students",
error:error.message
});

}

});

//delete student
server.delete("/api/student/:id", async (req, res) => {

  try {

    await Student.findByIdAndDelete(req.params.id);

    res.json({
      message: "Student deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error deleting student"
    });

  }

});

// retrieve student data
server.post("/api/studentdata", async (req,res)=>{

const {username} = req.body;

const student = await Student.findOne({ fullName: username });

if(!student){
  return res.status(404).json({
    message:"Student not found"
  })
}
let photobase=null;
if(student.photo && student.photo.data){
  photobase = `data:${student.photo.contentType};base64,${student.photo.data.toString('base64')}`;
}
res.json({
message :"student found " , studentdata:{ ...student.toObject(), photo:photobase}
})

// console.log(student);
//res.json({ message :"student found " ,studentdata:student });

})

//attendance mark 
server.post("/api/attendance", async (req, res) => {
  try {

    const { rollNo, biometricId } = req.body;

    const student = await Student.findOne({
      rollNo: rollNo,
      biometricId: biometricId
    });
    // console.log(student);
    if (!student) {
      return res.json({ message: "Student not found" });
    }

    // Start of today
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    // End of today
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const alreadyMarked = await Attendance.findOne({
      biometricId : biometricId,
      date: { $gte: start, $lte: end }
    });

    if (alreadyMarked) {
      return res.json({ message: "Attendance already marked today" });
    }

    const attendance = new Attendance({
      studentId: student._id,
      biometricId: student.biometricId,
      status: "Present",
      date: new Date()
    });

    await attendance.save();

    res.json({ message: "Attendance marked successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

server.get("/api/attendance/:biometricId", async (req, res) => {

  const biometricId = req.params.biometricId;

  try {

    const today = new Date();

    // first day of month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // total classes = days passed in month
    const total = today.getDate();

    // count present days
    const present = await Attendance.countDocuments({
      biometricId:biometricId,
      status: "Present",
      date: { $gte: startOfMonth }
    });

    const absent=total-present;
    const percentage = total > 0
      ? ((present / total) * 100).toFixed(1)
      : 0;
    const attendance = {
      total:total,
      present:present,
      absent:absent,
      percentage:percentage 
    }
    res.json({ message : "Attendance fetched successfully", attendance: attendance});

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching attendance" });
  }

});


server.get("/api/today-attendance", async (req, res) => {
  try {

    const start = new Date();
    start.setHours(0,0,0,0);

    const end = new Date();
    end.setHours(23,59,59,999);

    const attendance = await Attendance.find({
      date: { $gte: start, $lte: end }
    }).populate("studentId");

    res.json(attendance);

  } catch (err) {
    res.status(500).json({error:"Server error"});
  }
});


server.get("/api/dept-attendance", async (req,res)=>{

 try{

  const start = new Date();
  start.setHours(0,0,0,0);

  const end = new Date();
  end.setHours(23,59,59,999);

  const data = await Attendance.aggregate([

    {
      $match:{
        date:{ $gte:start, $lte:end },
        status:"Present"
      }
    },

    {
      $lookup:{
        from:"students",
        localField:"studentId",
        foreignField:"_id",
        as:"student"
      }
    },

    {
      $unwind:"$student"
    },

    {
      $group:{
        _id:"$student.department",
        total:{ $sum:1 }
      }
    }

  ]);

  res.json(data);

 }
 catch(err){
  res.status(500).json({error:"Server error"});
 }

});


const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(403).json({ message: "Token required" });
  }

  const token = bearerHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretkey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
// dashboard data
server.get("/api/dashboarddata", async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalStaff = await staff.countDocuments();

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const present = await Attendance.countDocuments({
      date: { $gte: start, $lte: end },
    });

    const totalToday = await Attendance.countDocuments({
      date: { $gte: start, $lte: end },
    });

    const absent = totalStudents - present;

    const attendancePercent =
      totalStudents > 0 ? ((present / totalStudents) * 100).toFixed(1) : 0;

    // console.log({ totalStudents, totalStaff, present, absent });

  const dashboarddata={
    totalStudents,
      totalStaff,
      present,
      absent,
      attendance: attendancePercent,
      lateEntries: 5,
      onLeave: 2,
      scans: totalToday,
      deviceStatus: "Online",
      fingerprintQuality: 85,
      failedScans: 3,
  }
    res.json({data: dashboarddata});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

