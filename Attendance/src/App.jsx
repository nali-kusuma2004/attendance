import Navbar from "./components/Navbar";
import Dashboard from "./components/dashboard";
import Staff from "./components/staff";
import Signin from "./components/signin";
import Login from "./components/login";
import Home from "./components/home";
import ProtectedRoute from "./components/protectedroute";
import UserDashboard from "./components/userdashboard.jsx";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import {useState,useEffect} from "react";
import Forgotpasswd from "./components/forgotpasswd.jsx";
import Asideblock from "./components/asideblock.jsx";
import Addstudent from "./components/addstudent.jsx" ;
export default function App(){
        //  const open=localStorage.getItem("opennavi");

        
  return (
    <>
       <BrowserRouter>
        
        {/* <Navbar togglesidebar={togglesidebar} isopen={open} /> */}
         
       <Routes>
        <Route path="/" element={ <Home />} /> 
        <Route path="/dashboard" element={ 
          <ProtectedRoute allowedRoles={['admin']}>
            <Dashboard />

          </ProtectedRoute> 
        } />
        <Route path="/userdashboard" element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserDashboard />
          </ProtectedRoute>
        } />
       
         <Route path="/staff" element={ <Staff />} />
         <Route path="/signin" element={<Signin />} />
         <Route path="/login" element={<Login />} />
         <Route path="/forgotpasswd" element={ <Forgotpasswd />}/>
         <Route path="/addstudent" element={<Addstudent />} />
       </Routes>
       </BrowserRouter>
    </>
  )
}



//aside block need to toggle by using navbar instructions 

// Flow of Authentication and Protected Routes:
// User Login (React)
//    ↓
// POST /login (Express)
//    ↓
// Verify username + password (MongoDB + bcrypt)
//    ↓
// JWT token created (jsonwebtoken)
//    ↓
// Token sent to frontend
//    ↓
// Token stored in localStorage
//    ↓
// ProtectedRoute checks token
//    ↓
// User allowed to access Dashboard





// work flow of biometric device integration
// ┌─────────────────────────┐
// │  Physical Biometric     │
// │  Device (Fingerprint/IR)│
// └─────────────┬───────────┘
//               │ Scans user → returns User ID
//               ▼
// ┌─────────────────────────┐
// │  Device SDK / API       │
// │  (or Network interface) │
// └─────────────┬───────────┘
//               │ Sends scanned User ID
//               ▼
// ┌─────────────────────────┐
// │  Backend / Server       │
// │  (Node.js + Express)    │
// │  - Receives User ID     │
// │  - Matches with DB      │
// │  - Saves attendance     │
// │  - Generates JWT (if login) │
// └─────────────┬───────────┘
//               │
//               ▼
// ┌─────────────────────────┐
// │  MongoDB Database       │
// │  Collections:           │
// │  - Students             │
// │      { userId, name, ...} │
// │  - Attendance           │
// │      { userId, date, status } │
// └─────────────┬───────────┘
//               │ Fetch data / save attendance
//               ▼
// ┌─────────────────────────┐
// │  Web Frontend           │
// │  - Admin Dashboard      │
// │      • Add/Edit Students│
// │      • View Attendance  │
// │      • Reports          │
// │  - User Dashboard       │
// │      • Shows attendance │
// └─────────────────────────┘
