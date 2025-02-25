import React from "react";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";

const About = () => {
  return (
    <div className="bg-blue-100 w-full">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="p-6 max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg mb-6 text-gray-700">
          Welcome to our review and rating platform! Our website allows users to
          explore and rate various service providers without any charges. Find
          better services through genuine ratings and comments.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-2xl p-6 mb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800">Tent House Service</h2>
          <p className="text-gray-600 mt-2">
            Discover beautifully decorated tent houses for various occasions.
            Explore their designs, themes, and customer experiences. Share your
            feedback and help others find the perfect decoration for their event.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-2xl p-6 mb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800">Band Party</h2>
          <p className="text-gray-600 mt-2">
            Looking to book a band for your event? Explore different band parties,
            their performances, and crowd engagement. If you love their music and
            energy, leave a rating and comment to help others make a great choice.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-2xl p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800">DJ Sound Systems</h2>
          <p className="text-gray-600 mt-2">
            Experience high-quality DJ sound systems through user reviews. Whether
            you love the beats or have feedback, rate and comment to guide others
            in finding the perfect sound setup for their events.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
