import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate=useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Basic validation
    if (form.password !== form.confirmPassword) {
      return setMessage("Passwords do not match!");
    }

    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Registration successful!");
        navigate('/login')

        setForm({ email: "", password: "", confirmPassword: "" });
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Register</h2>

        {message && (
          <p className={`text-center text-sm mb-4 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-sm text-blue-500 hover:underline"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
