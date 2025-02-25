import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-6">
      <motion.h1 
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact Us
      </motion.h1>
      
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full">
        <motion.form 
          className="flex flex-col space-y-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Your Message"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>
          <motion.button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>

      <div className="mt-6 flex flex-col items-center space-y-4">
        <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.1 }}>
          <FaPhone className="text-blue-500 text-2xl" />
          <span className="text-lg">+123 456 7890</span>
        </motion.div>
        <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.1 }}>
          <FaEnvelope className="text-red-500 text-2xl" />
          <span className="text-lg">contact@example.com</span>
        </motion.div>
        <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.1 }}>
          <FaMapMarkerAlt className="text-green-500 text-2xl" />
          <span className="text-lg">123 Main Street, City, Country</span>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;
