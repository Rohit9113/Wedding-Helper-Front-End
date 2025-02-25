import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                localStorage.setItem("role", data.admin.role);
                localStorage.setItem("adminToken", data.token);
                // localStorage.setItem("adminData", JSON.stringify(data.admin));
                console.log('Name',data.admin.name)
    
                toast.success("Login successful!");
    
                if (data.admin.role === "admin") {
                    setTimeout(() => navigate("/admin/Admin-dashboard"), 2000);
                }
            } else {
                toast.error(data.message || "Invalid email or password");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };
    

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <ToastContainer position="top-center" autoClose={2000} />
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96 text-white"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-300 mb-2" htmlFor="password">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute top-10 right-3 text-gray-400 hover:text-white"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                    </div>
                    <div className="flex justify-between items-center text-sm mb-4">
                        <a href="#" className="text-blue-400 hover:underline">Forgot Password?</a>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
                        type="submit"
                    >
                        Login
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}

export default AdminLogin;
