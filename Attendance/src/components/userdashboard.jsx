import React from 'react'
import {FaTools} from "react-icons/fa"
export default function Userdashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-900 to-purple-700 px-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-10 text-center max-w-md w-full">
        
        <FaTools className="text-6xl text-yellow-400 mx-auto mb-6 animate-bounce" />

        <h1 className="text-3xl font-bold text-white mb-3">
          Page Under Construction
        </h1>

        <p className="text-gray-200 mb-6">
          We’re working hard to bring you this feature.  
          Please check back soon!
        </p>

        <div className="w-full bg-gray-300 rounded-full h-2 mb-6">
          <div className="bg-green-500 h-2 rounded-full w-2/3 animate-pulse"></div>
        </div>

        <p className="text-sm text-gray-300">
          🚧 Biometric Attendance System
        </p>
      </div>
    </div>
  )
};
