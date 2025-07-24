import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
  e.preventDefault();

  if (!email || !otp || !newPassword) {
    setMessage("All fields are required.");
    return;
  }

  try {
    // Step 1: Verify OTP
    const verifyRes = await fetch("http://localhost:3000/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    
    const verifyData = await verifyRes.json();
    console.log(verifyData)

    if (!verifyRes.ok) {
      setMessage(verifyData.message || "OTP verification failed.");
      return;
    }

    // Step 2: Reset Password
    const resetRes = await fetch("http://localhost:3000/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword }),
    });

    const resetData = await resetRes.json();
    
    if (resetRes.ok) {
      alert("✅ Password reset successful!");
      navigate("/");
    } else {
      setMessage(resetData.message || "Password reset failed.");
    }
  } catch (error) {
    setMessage("Something went wrong.");
    console.error(error);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Verify OTP & Reset Password
        </h2>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Verify & Reset
          </button>
        </form>

        {message && (
          <p className="text-sm text-center mt-4 text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
}
