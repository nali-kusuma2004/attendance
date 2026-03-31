import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
export default function Userdashboard( ) {
  const [student, setStudent] = useState({});
  const [attendance, setattendance] = useState({
    total:30,
    present:0,
    absent:0,
    percentage:0
  });

  const username=localStorage.getItem("username") 

  const scanAttendance = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          biometricId:student.biometricId,
          rollNo: student.rollNo,
          status:"Present"
        }),
      });

      const data = await res.json();
      console.log(data);
      alert(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/studentdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username : username }),
        });

        const data = await res.json();

        setStudent(data.studentdata);
        console.log(data.studentdata);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStudent();
  }, [username]);


  useEffect(() => {

  const fetchAttendance = async () => {

    if(!student.biometricId) return;

    try{

      const res = await fetch(
        `http://localhost:8000/api/attendance/${student.biometricId}`
      );

      const data1 = await res.json();

      setattendance(data1.attendance);

    }catch(err){
      console.log(err);
    }

  };

  fetchAttendance();

}, [student]);

  const percentage = ((attendance.present / attendance.total) * 100).toFixed(1);

  return (

    <>
    {/* <Navbar /> */}

    <div className="min-h-screen bg-gray-100 flex justify-center items-center" style={{backgroundImage:"url(https://image.slidesdocs.com/responsive-images/background/technology-clean-business-geometric-simple-blue-powerpoint-background_e3130f8dc2__960_540.jpg)" , backgroundSize:"cover"} }>
      <div className="w-full max-w-3xl bg-blue-100 shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Student Dashboard
        </h1>

        {/* Student Details */}

        <div className="grid grid-cols-2  mb-6">
          <div className=" flex p-4 ">
            <p className="text-gray-600 pr-3 h-1/3" >Name : </p>
            <p className="font-semibold ">{student.fullName}</p>
            <p className=" text-gray-600 pl-20 mt-15 -ml-57"> Roll No : </p>
            <p className="font-semibold pl-20 mt-15 -ml-18 " >{student.rollNo}</p>
          </div>
           <div className="w-full md:w-1/3 flex justify-center md:justify-end mt-6 md:mt-0 ml-20 mt-5">
      <img
        src={student.photo || "/default.png"}
        alt="Student"
        className="w-50 h-30 object-cover  rounded-4xl shadow-md "
      />
    </div>
  
          <div className=" flex p-4 ">
            <p className="text-gray-600 pr-3 ">Department : </p>
            <p className="font-semibold">{student.branch}</p>
          </div>

          <div className=" flex p-4 ml-10">
            <p className="text-gray-600 pr-3 ">Bio-metric ID : </p>
            <p className="font-semibold">{student.biometricId}</p>
          </div>

          <div className="  flex p-4">
            <p className="text-gray-600 pr-3 ">Email : </p>
            <p className="font-semibold">{student.email}</p>
          </div>
           
           <div className="  flex p-4 ml-10">
            <p className="text-gray-600 pr-3 ">Phone No: </p>
            <p className="font-semibold">{student.phone}</p>
          </div>
        </div>

        {/* Attendance Summary */}

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-3">Attendance Summary</h2>

          <div className="flex justify-between">
            <p>Days: {attendance.total}</p>
            <p>Present: {attendance.present}</p>
            <p>Absent : {attendance.absent}</p>
            <p className="font-bold text-green-600">{percentage}%</p>
          </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={scanAttendance}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition"
            >
              🧬 Scan Fingerprint for Attendance
            </button>
          </div>
      
      </div>
    </div>
    </>
  );
}
