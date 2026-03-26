const mongoose=require('mongoose');
const {Schema}=mongoose;
const UserSchema=new Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:['admin','user'],default:'user'}
});

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  department: { type: String },
  shift: { type: String },
  experience: { type: String },
  image: { type: String }
})

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String },
  department: { type: String },
  year: { type: String },
  email: { type: String },
  phone: { type: String },
  biometricId: { type: String,unique:true ,sparse:true}
  
});

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },
  rollNo: String,
  biometricId: {
    type :String
  },
  department:{
    type:String
  },
  year:String,
  // timestamp: {
  //   type: Date,
  //   default: Date.now
  // }, 
  date:{
    type: Date,
    default: Date.now
  } ,  
  status: {
    type: String,
    enum: ["Present", "Absent"],
    default: "present "
  }
});

attendanceSchema.index(
  { biometricId: 1, date: 1 },
  { unique: true }
);


const attendance = mongoose.model("Attendance", attendanceSchema);

const student = mongoose.model("Student", studentSchema);

const staff = mongoose.model("Staff", staffSchema);

const user =mongoose.model("User1 ", UserSchema);

module.exports={User1:user,staff:staff, Student: student, Attendance : attendance}
