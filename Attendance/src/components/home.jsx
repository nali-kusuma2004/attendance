import { useNavigate } from "react-router-dom";
import { FaQuestionCircle } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { useEffect } from "react";
import { SiTicktick } from "react-icons/si";
import Navbar from "./Navbar.jsx";
export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
      localStorage.clear();
  }, []);
  return (
    <>
     
 {/* <Navbar /> */}
    <div
      className="min-h-screen  bg-linear-to-br from-blue-50 to-indigo-100  pt-12 bg-cover"
      style={{
        backgroundImage: `url(https://axlesys.com/wp-content/uploads/2023/09/biometric-technology-background-with-fingerprint-scanning-system-virtual-screen-digital-remix-1-1-scaled.jpg)`
      }}
    >
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto ">
        <h1 className="text-4xl font-bold text-pink-500 mb-4" style={{ textShadow: "2px 3px 4px rgba(219, 39, 119, 2)" }}>
          Biometric Attendance Management System
        </h1>
        <p className="text-lg text-white mb-6">
          A secure and intelligent attendance solution using biometric
          authentication such as fingerprint and facial recognition to ensure
          accuracy and transparency.
        </p>

        <button
          onClick={() => navigate("/signin")}
          className="px-6 py-3 bg-indigo-700 text-white rounded-xl font-semibold hover:bg-indigo-800 transition"
        >
          Let’s Get Started
        </button>
      </section>

      {/* Awareness Section */}
      <section className="mt-30 grid grid-cols-1 md:grid-cols-3 gap-15 max-w-6xl mx-auto ">

        <div className="backdrop-blur-sm text-white border-2 shadow-blue-600 p-6 rounded-2xl shadow-md">
          <FaQuestionCircle
            className="text-lime-400 text-6xl mx-auto mb-10 mt-10"
            size="60"
          />
          <h3 className="text-xl font-semibold text-red-600 mb-3">
            Why Biometric Attendance?
          </h3>
          <p className="text-white">
            Biometric attendance prevents proxy attendance and manual errors by
            uniquely identifying each user through fingerprint or facial data,
            ensuring secure and reliable tracking.
          </p>
        </div>

        <div className="backdrop-blur-sm p-6 text-white border-2 shadow-blue-700 rounded-2xl shadow-md">
          <img
            src="https://img.freepik.com/premium-vector/easy-use-circle-icon-snap-fingers-vector-illustration-ready-use-label-simple-emblem_1231005-540.jpg"
            alt="Biometric Uses"
            className="w-30 h-30 object-cover ml-25 rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold text-yellow-500 ml-20 mb-3">
            Key Uses
          </h3>
          <ul className="text-white list-disc list-inside space-y-1">
            <li>Fingerprint / face-based attendance</li>
            <li>Real-time attendance recording</li>
            <li>Automatic report generation</li>
            <li>Secure biometric data storage</li>
          </ul>
        </div>

        <div className="backdrop-blur text-white shadow-blue-600 border-2 p-6 rounded-2xl shadow-md">
          <FaUsers
            className="text-amber-300 text-6xl mx-auto mb-10 mt-10"
            size="60"
          />
          <h3 className="text-xl font-semibold text-pink-600 mb-3 ml-10">
            Who Can Use It?
          </h3>
          <p className="text-white">
            Designed for colleges, universities, faculty, administrators, and
            students to maintain tamper-proof and transparent biometric
            attendance records.
          </p>
        </div>

      </section>

      {/* Benefits Section */}
      <section className="mt-16 max-w-5xl mx-auto bg-gray-500 p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-amber-400 mb-4">
          Benefits of Biometric Attendance
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
          <li className="flex "><SiTicktick  size="20" className=" text-green-500 mr-4" /> Eliminates proxy attendance</li>
          <li className="flex "><SiTicktick   size="20" className=" text-green-500 mr-4" /> High accuracy and security</li>
          <li className="flex "><SiTicktick   size="20" className=" text-green-500 mr-4" /> Faster attendance marking</li>
          <li className="flex "><SiTicktick  size="20" className=" text-green-500 mr-4" /> Real-time access to records</li>
          <li className="flex "><SiTicktick   size="20" className="text-green-500 mr-4" /> Reduces paperwork</li>
          <li className="flex "><SiTicktick   size="20" className="text-green-500 mr-4" /> Scalable for institutions</li>
        </ul>
      </section>

 <section className="mt-12 text-center max-w-3xl mx-auto">
        <p className="text-gray-200 text-md font-bold">
          Biometric data is handled securely and used strictly for attendance
          purposes, ensuring privacy, compliance, and data protection.
        </p>
      </section>
      
      <footer className="mt-16 text-center w-full text-white bg-blue-800 py-4">
        &copy; {new Date().getFullYear()} Biometric Attendance Management
        System. All rights reserved.
      </footer>
</div>
    </>
  );
}

//https://www.integrated.com/_next/image?url=https%3A%2F%2Fwww.integrated.com%2Fassets%2FservicesPage%2Fservices%2Fattendance-systems%2FSolutions-Attendance%20Systems-banner.png&w=1536&q=75