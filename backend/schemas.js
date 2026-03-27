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
    fullName: { type: String, required: true },
    dob: { type: Date },
    gender: { type: String },
    bloodGroup: { type: String },
    aadhaar: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    parentPhone: { type: String },
    rollNo: { type: String, required: true ,unique: true },
    course: { type: String },
    branch: { type: String },
    year: { type: String },
    section: { type: String },
    admissionDate: { type: Date },
    category: { type: String },
    entrance: { type: String },
    fatherName: { type: String },
    motherName: { type: String },
    occupation: { type: String },
    photo: { data:Buffer,contentType:String}, // store URL or filename
    timestamps: {type: Date, default: Date.now} ,
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
