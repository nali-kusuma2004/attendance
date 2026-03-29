
import React, { useEffect, useState } from "react";

export default function Staff() {

  const [staff, setStaff] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    department: "",
    shift: "",
    experience: "",
    salary: "",
    address: ""
  });

  // fetch staff on load
  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/staff");
      const data = await res.json();
      setStaff(data);
    } catch (err) {
      console.error(err);
    }
  };

  // handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // add staff
  const handleSubmit = async (e) => {

    e.preventDefault();

    await fetch("http://localhost:8000/api/staff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    // reset form
    setForm({
      name: "",
      role: "",
      phone: "",
      email: "",
      department: "",
      shift: "",
      experience: "",
      salary: "",
      address: ""
    });

    // hide form
    setShowForm(false);

    // refresh list
    fetchStaff();
  };

  // delete staff
  const handleDelete = async (id) => {

    await fetch(`http://localhost:8000/api/staff/${id}`, {
      method: "DELETE"
    });

    fetchStaff();
  };

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-2xl font-bold">
          Hostel Staff
        </h2>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Staff
        </button>

      </div>

      {/* Staff List */}

      {!showForm && (

        <div className="bg-white shadow rounded">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>
                <th className="p-2">Name</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Department</th>
                <th>Shift</th>
                <th>Experience</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {staff.length === 0 ? (

                <tr>
                  <td colSpan="9" className="text-center p-4">
                    No staff found
                  </td>
                </tr>

              ) : (

                staff.map((member) => (

                  <tr key={member._id} className="border text-center">

                    <td className="p-2">{member.name}</td>
                    <td>{member.role}</td>
                    <td>{member.phone}</td>
                    <td>{member.email}</td>
                    <td>{member.department}</td>
                    <td>{member.shift}</td>
                    <td>{member.experience}</td>
                    <td>₹{member.salary}</td>

                    <td>

                      <button
                        onClick={() => handleDelete(member._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      )}

      {/* Add Staff Form */}

      {showForm && (

        <div className="bg-white shadow rounded p-4">

          <h3 className="text-xl font-bold mb-4">
            Add New Staff
          </h3>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

            <input name="name" placeholder="Name" required onChange={handleChange} className="border p-2"/>

            <select name="role" required onChange={handleChange} className="border p-2">
              <option value="">Select Role</option>
              <option>Hostel Manager</option>
              <option>Assistant Manager</option>
              <option>Warden</option>
              <option>Security</option>
              <option>Cook</option>
              <option>Cleaner</option>
              <option>Worker</option>
            </select>

            <input name="phone" placeholder="Phone" required onChange={handleChange} className="border p-2"/>

            <input name="email" placeholder="Email" onChange={handleChange} className="border p-2"/>

            <input name="department" placeholder="Department" onChange={handleChange} className="border p-2"/>

            <input name="shift" placeholder="Shift" onChange={handleChange} className="border p-2"/>

            <input name="experience" placeholder="Experience" onChange={handleChange} className="border p-2"/>

            <input name="salary" placeholder="Salary" onChange={handleChange} className="border p-2"/>

            <input name="address" placeholder="Address" onChange={handleChange} className="border p-2"/>

            <div className="col-span-2 flex gap-4">

              <button className="bg-green-600 text-white px-4 py-2 rounded">
                Save
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      )}

    </div>

  );
}