import React, { useState } from 'react';

function ContactFromAdmin() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // Popup will disappear after 3 seconds
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-10">
      <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 animate__animated animate__fadeIn">Contact Us</h2>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Vendor Message */}
          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              Vendor Message
            </label>
            <textarea
              id="message"
              rows="4"
              placeholder="Your message here..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            ></textarea>
          </div>

          {/* Company Contact Number */}
          <div className="flex items-center">
            <label htmlFor="callNumber" className="block text-gray-700 font-medium mb-2 w-1/4">
              Contact Number
            </label>
            <span className="w-3/4 p-4 border border-gray-300 rounded-lg">{'+1 (911) 655-5465'}</span>
          </div>

          {/* Company Email */}
          <div className="flex items-center">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2 w-1/4">
              Email
            </label>
            <span className="w-3/4 p-4 border border-gray-300 rounded-lg">{'edfdfs@gmail.com'}</span>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Message
            </button>
          </div>
        </form>

        {/* Popup Message */}
        {showPopup && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-lg font-semibold text-gray-800">Thank you for contacting us!</h3>
              <p className="text-sm text-gray-600 mt-2">Wait, we will reply to you soon.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactFromAdmin;
