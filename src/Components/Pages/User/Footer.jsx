import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400">Shop Showcase</h2>
          <p className="mt-3 text-gray-400">
            Discover the best shops for decoration, tents, DJ sounds, and more!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-blue-300">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><a href="/" className="text-gray-400 hover:text-blue-400 transition">🏠 Home</a></li>
            <li><a href="/about" className="text-gray-400 hover:text-blue-400 transition">ℹ️ About Us</a></li>
            <li><a href="/contact" className="text-gray-400 hover:text-blue-400 transition">📞 Contact</a></li>
            {/* <li><a href="/privacy" className="text-gray-400 hover:text-blue-400 transition">🔏 Privacy Policy</a></li> */}
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-xl font-semibold text-blue-300">Support</h3>
          <ul className="mt-3 space-y-2">
            <li><a href="/faq" className="text-gray-400 hover:text-blue-400 transition">❓ FAQ</a></li>
            <li><a href="/help" className="text-gray-400 hover:text-blue-400 transition">💬 Help Center</a></li>
            <li><a href="/terms" className="text-gray-400 hover:text-blue-400 transition">📜 Terms & Conditions</a></li>
          </ul>
        </div>
      </div>

      {/* Social Media */}
      <div className="flex justify-center mt-8 space-x-6">
        <a href="https://facebook.com" className="text-gray-400 hover:text-blue-500 text-xl transition"><FaFacebookF /></a>
        <a href="https://instagram.com" className="text-gray-400 hover:text-pink-500 text-xl transition"><FaInstagram /></a>
        <a href="https://twitter.com" className="text-gray-400 hover:text-blue-400 text-xl transition"><FaTwitter /></a>
        <a href="https://youtube.com" className="text-gray-400 hover:text-red-500 text-xl transition"><FaYoutube /></a>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-gray-500">
        © {new Date().getFullYear()} Shop Showcase. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
