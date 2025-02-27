import React from "react";
import { FaStore, FaIdCard } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Other() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-all"
                onClick={() => navigate("/vendor-login")}
            >
                <FaStore size={20} /> Shop Login
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition-all"
                onClick={() => navigate("/vendor-request")}
            >
                <FaIdCard size={20} /> Shop ID Request
            </motion.button>
        </div>
    );
}

export default Other;