import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate=useNavigate()

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("OTP sent to your email ✅");
        navigate("/verify-otp")
        
        // Redirect to OTP verification page if needed
      } else {
        setMessage(data.message || "Failed to send OTP");
      }
    } catch (error) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Reset Password</h2>

        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Enter your email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
           
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Send OTP
          </button>
        </form>

        {message && (
          <p className="text-sm text-center mt-4 text-blue-600">{message}</p>
        )}
      </div>
    </div>
  );
}
