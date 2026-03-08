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
  rollNo: { type: String, required: true, unique: true },
  department: { type: String },
  year: { type: String },
  email: { type: String },
  phone: { type: String },
  biometricid: { type: String }
  
});

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },
  rollno:String,
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "Present"
  }
});

const attendance = mongoose.model("Attendance", attendanceSchema);

const student = mongoose.model("Student", studentSchema);

const staff = mongoose.model("Staff", staffSchema);

const user =mongoose.model("user1 ", UserSchema);

module.exports={User1:user,staff:staff, Student: student, Attendance : attendance}
