import React, { useState } from "react";

export default function Userform() {
  const [step, setStep] = useState(1);
  const [userdata, setUserdata] = useState({
    username: "",
    password: "",
    userrole: "user",
  });
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    aadhaar: "",
    phone: "",
    email: "",
    address: "",
    parentPhone: "",
    rollNo: "",
    course: "",
    branch: "",
    year: "",
    section: "",
    admissionDate: "",
    category: "",
    entrance: "",
    fatherName: "",
    motherName: "",
    occupation: "",
    biometricId: "",
    photo: null,
    role: "user",
  });

  const handlechangeuser = (e) => {
     const { name, value } = e.target;
  setUserdata({
    ...userdata,
    [name]: value,
  });
};


  const handleuser = (e) => {
  fetch("http://localhost:8000/sign", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userdata),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      if (data.message === "User created successfully") {
        alert("user Successful ✅");

        // store token (if backend sends)
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // redirect (optional)
        window.location.href = "/userdashboard";
      } else if(data.message === "User already exists"){
        alert("User already exists ❌");
      } 
      else {
        alert("Invalid username or password ❌");
      }
    })
    .catch((err) => {
      console.error("sign up  error:", err);
    });   
    
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
const formData = new FormData();

  // append all fields
  Object.keys(form).forEach((key) => {
    if (key === "photo" && form.photo) {
      formData.append("image", form.photo); // ✅ important
    } else {
      formData.append(key, form[key]);
    }
  });
    const res = fetch("http://localhost:8000/api/student",{
      method: "POST",
      
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Student added successfully") {
      alert("Form submitted successfully!");
      setForm({
        fullName: "",
        dob: "",
        gender: "",
        bloodGroup: "",
        aadhaar: "",
        phone: "",
        email: "",
        address: "",
        parentPhone: "",
        rollNo: "",
        course: "",
        branch: "",
        year: "",
        section: "",
        admissionDate: "",
        category: "",
        entrance: "",
        fatherName: "",
        motherName: "",
        occupation: "",
        biometricId: "",
        photo: null,
        role: "user",
      });
    }
      })
      .catch((err) => {
        console.error("Error submitting form:", err);
      });
    
    
  };

  return (
    <>
      <section
        className="w-full h-200  pt-20"
        style={{
          backgroundImage:
            "url('https://www.shutterstock.com/image-photo/students-life-happy-girl-holding-600nw-2486619879.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-3xl mx-auto p-6 backdrop-blur-md border-2 text-white shadow-white shadow-lg rounded-xl">
          <h2 className="text-2xl font-bold text-blue-900 pl-60 pb-10 ">
            Student Registration
          </h2>

          <p className="text-red-600 mb-4 font-bold">
            ⚠️ Make sure all details are correct before submitting.
          </p>

          <form onSubmit={handleSubmit}>
            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <h3 className="font-semibold mb-2 pb-5">Personal Info</h3>
                <input
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  className="input bg-white text-black"
                />
                <input
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                  onChange={handleChange}
                  className="input bg-white text-black"
                />
                <input
                  name="gender"
                  placeholder="Gender"
                  onChange={handleChange}
                  className="input bg-white text-black"
                />
                <input
                  name="bloodGroup"
                  placeholder="Blood Group"
                  onChange={handleChange}
                  className="input bg-white text-black"
                />
                <input
                  name="aadhaar"
                  placeholder="Aadhaar"
                  onChange={handleChange}
                  className="input bg-white text-black"
                />
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div>
                <h3 className="font-semibold mb-2">Contact Info</h3>
                <input
                  name="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                  className="input bg-white text-black"
                />
                <input
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="input bg-white text-black "
                />
                <input
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                  className="input bg-white text-black"
                />
                <input
                  name="parentPhone"
                  placeholder="Parent Phone"
                  onChange={handleChange}
                  className="input bg-white text-black"
                />
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div>
                <h3 className="font-semibold mb-2">Academic Info</h3>
                <input
                  name="rollNo"
                  placeholder="Roll No"
                  onChange={handleChange}
                  className="input bg-white text-black"
                />
                <input
                  name="course"
                  placeholder="Course B.tech/M.tech/MCA"
                  onChange={handleChange}
                  className="input bg-white text-black"
                />
                <input
                  name="branch"
                  placeholder="Branch CSE/CHEMICAL/ECE/EEE/MECH/CIVIL"
                  onChange={handleChange}
                  className="input bg-white text-black"
                />
                <input
                  name="year"
                  placeholder="Year I/II/III/IV"
                  onChange={handleChange}
                  className="input bg-white text-black"
                />
                <input
                  name="section"
                  placeholder="Section REgular/AI & ML/SS"
                  onChange={handleChange}
                  className="input bg-white text-black"
                />
                <input
                  type="file"
                  name="image"
                  placeholder="Upload Photo"
                  accept="image/*"
                  onChange={(e) => setForm({
    ...form,
    photo: e.target.files[0]   // ✅ file object
  })}
                  id="img"
                  className="input bg-white text-black"
                />
                <br></br>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div>
                <h3 className="font-semibold mb-2">Admission Info</h3>
               <input
               type="date"
                  name="admission date"
                  placeholder="Admission Date"
                  onChange={handleChange}
                  className="input bg-white text-black"
                />
                <input
                  name="category"
                  placeholder="Category GEN/OBC/SC/ST"
                  onChange={handleChange}
                  className="input bg-white text-black"
                />
                <input
                  name="entrance"
                  placeholder="Entrance Rank EAMCET/ICET/GATE/OTHER"
                  onChange={handleChange}
                  className="input bg-white text-black"
                />
              </div>
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <div>
                <h3 className="font-semibold mb-2">Parent Details</h3>
                <input
                  name="fatherName"
                  placeholder="Father Name"
                  onChange={handleChange}
                  className="input bg-white text-black"
                />
                <input
                  name="motherName"
                  placeholder="Mother Name"
                  onChange={handleChange}
                  className="input bg-white text-black"
                />
                <input
                  name="occupation"
                  placeholder="Occupation"
                  onChange={handleChange}
                  className="input bg-white text-black"
                />
              </div>
            )}

            {/* STEP 6 */}
            {step === 6 && (
              <div>
                <h3 className="font-semibold mb-2">Account</h3>
                <input
                  name="username"
                  placeholder="Username "
                  onChange={handlechangeuser}
                  className="input bg-white text-black"
                /> 
                <p className="mb-2 text-red-600 font-bold text-sm "> 🔴 Username should match your full name in the application  </p>
                
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handlechangeuser}
                  className="input bg-white text-black"
                />
              </div>
            )}

            {/* NAVIGATION */}
            <div className="flex justify-between mt-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prev}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Back
                </button>
              )}

              {step < 6  ? (
                <button
                  type="button"
                  onClick={next}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              )}

              {step === 6 &&(
              
                <button
                  type="button"
                  onClick={handleuser}
                  className="bg-purple-500 text-white px-4 py-2 rounded"
                >
                  Sign Up 
                </button>
              )}
            </div>
          </form>

          <style>
            {`.input{display:block;width:100%;margin-bottom:10px;padding:8px;border:1px solid #ccc;border-radius:6px;}`}
          </style>
        </div>
      </section>
    </>
  );
}
