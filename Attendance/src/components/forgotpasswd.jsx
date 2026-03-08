import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Navbar from "./Navbar";

export default function Forgotpasswd() {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ user: "", password: "", confirmPassword: "" });

    function resetpasswd() {
        // Implement password reset logic here
        alert("Password reset successful!");
        navigate("/login");
        fetch("http://localhost:8000/api/reset-password", {
            method: "put",
            headers: {

                
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ form })
            // Include necessary data for password reset
          } ).then(res => res.json())
          .then(data => {
            if (data.success) {
              alert("Password reset successful!");
              console.log(form);
              navigate("/login");
            } else {
              alert("Password reset failed: " + data.message);
            }
        })
    }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="bg-white shadow-xl rounded-2xl p-8 w-96">

          {/* Back Button */}
          <button
            onClick={() => navigate("/login")}
            className="flex items-center text-blue-600 mb-4"
          >
            <IoArrowBack className="mr-2" />
            Back to Login
          </button>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
            Forgot Password
          </h2>

          {/* Step 1 */}
          {step === 1 && (
            <>
              <label className="block mb-2 font-medium">
                Username 
              </label>

              <input
                type="text"
                placeholder="Enter username"
                className="w-full border rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                onClick={() => setStep(2)}
                className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
              >
                Continue
              </button>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
              <label className="block mb-2 font-medium">
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                className="w-full border rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
              />

              <label className="block mb-2 font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm password"
                className="w-full border rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
              />

              <button
                className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
                onClick={()=>resetpasswd()}
              >
                Reset Password
              </button>
            </>
          )}

        </div>

      </div>
    </>
  );
}