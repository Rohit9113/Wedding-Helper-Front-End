import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to validate email format
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSendOTP = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/vendor/send-reset-otp", { email });

      if (response.data.message === "OTP sent to email") {
        toast.success("OTP sent successfully!");
        navigate("/set-password", { state: { email } });
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
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
        <p className="text-gray-600 text-center mb-4">Enter your email to receive an OTP</p>

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

          <button
            onClick={handleSendOTP}
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg transition-all duration-300 
              ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 hover:scale-105"}`}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
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

export default ForgetPassword;
