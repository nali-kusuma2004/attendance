import React from 'react'

export default function Liveattendance() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

    {/* Live Attendance */}
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-semibold mb-4">Live Attendance</h2>
      <ul className="space-y-3  h-40 overflow-scroll">
        <li className="flex justify-between border-b pb-2">
          <span>Ravi Kumar</span>
          <span className="text-green-600">09:05 AM</span>
        </li>
        <li className="flex justify-between border-b pb-2">
          <span>Sita Devi</span>
          <span className="text-green-600">09:06 AM</span>
        </li>
        <li className="flex justify-between">
          <span>Arjun</span>
          <span className="text-green-600">09:07 AM</span>
        </li>
        <li className="flex justify-between border-b pb-2">
          <span>Sita Devi</span>
          <span className="text-green-600">09:06 AM</span>
        </li>
        <li className="flex justify-between">
          <span>Arjun</span>
          <span className="text-green-600">09:07 AM</span>
        </li>
      </ul>
    </div>

    {/* Attendance Chart Placeholder */}
    <div className="bg-white rounded-xl shadow p-5 flex items-center justify-center">
      <p className="text-gray-400">📊 Attendance Chart</p>
    </div>

  </div>

    </>
  )
}
