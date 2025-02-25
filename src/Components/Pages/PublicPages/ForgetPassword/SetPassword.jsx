import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function SetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSetPassword = async () => {
    if (!email || !otp || !newPassword || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/vendor/reset-password`, {
        email,
        otp,
        newPassword,
        confirmPassword,
      });

      if (response.data.message === "Password reset successful. You can now log in with your new password.") {
        toast.success("Password reset successful!");
        setTimeout(() => navigate("/vendor-login"), 2000); // Redirect to login after 2 sec
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 fade-in">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Set New Password</h2>

        <div className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">OTP</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">New Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            onClick={handleSetPassword}
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg transition-all duration-300 
              ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 hover:scale-105"}`}
          >
            {loading ? "Setting Password..." : "Set Password"}
          </button>
        </div>
      </div>

      <style>
        {`
          .fade-in {
            animation: fadeIn 0.8s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default SetPassword;
