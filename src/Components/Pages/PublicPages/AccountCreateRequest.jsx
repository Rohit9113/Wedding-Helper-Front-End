import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function AccountCreateRequest() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false); // To track the loading state

  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true when the request is being sent
    try {
      // Make sure to send a Content-Type header if necessary (usually for JSON)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/vendor/request`, {
        name: data.name, // Mapping vendorName to 'name'
        email: data.email, // Mapping vendorEmail to 'email'
        phone: data.phone, // Mapping phoneNumber to 'phone'
        businessName: data.businessName, // Mapping businessType to 'businessName'
        shopName: data.shopName, 
        shopAddress: data.shopAddress, 
      }, {
        headers: {
          "Content-Type": "application/json", // Add header to ensure proper request format
        }
      });

      // console.log("Response:", response.data);

      // After successful request, show the popup and reset the form
      if (response.data.message === "Vendor request sent successfully") {
        setShowPopup(true);
        setLoading(false); // Set loading to false after successful submission
        reset(); // Reset form fields
      }
    } catch (error) {
      console.error("Error submitting vendor request:", error);
      if (error.response) {
        // Inspect the backend response
        console.error("Error Response:", error.response.data);
      }
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg fade-in">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Vendor Account Request</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Vendor Name & Shop Name */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="font-medium text-gray-700">Name</label>
              <input {...register("name", { required: true })} placeholder="Enter vendor name" className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
              {errors.name && <p className="text-red-500 text-sm">Required</p>}
            </div>
            <div className="w-1/2">
              <label className="font-medium text-gray-700">Shop Name</label>
              <input {...register("shopName", { required: true })} placeholder="Enter Shop Name" className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
              {errors.shopName && <p className="text-red-500 text-sm">Required</p>}
            </div>
          </div>

          {/* Email & Phone - Flex */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="font-medium text-gray-700">Vendor Email</label>
              <input type="email" {...register("email", { required: true })} placeholder="Enter vendor email" className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
              {errors.email && <p className="text-red-500 text-sm">Required</p>}
            </div>
            <div className="w-1/2">
              <label className="font-medium text-gray-700">Phone Number</label>
              <input type="tel" {...register("phone", { required: true })} placeholder="Enter phone number" className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
              {errors.phone && <p className="text-red-500 text-sm">Required</p>}
            </div>
          </div>

          {/* Shop Address & Business Category - Flex */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="font-medium text-gray-700">Shop Address</label>
              <input {...register("shopAddress", { required: true })} placeholder="Enter shop address" className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
              {errors.shopAddress && <p className="text-red-500 text-sm">Required</p>}
            </div>
            <div className="w-1/2">
              <label className="font-medium text-gray-700">Business Category</label>
              <input {...register("businessName", { required: true })} placeholder="Enter business category" className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
              {errors.businessName && <p className="text-red-500 text-sm">Required</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-300 hover:scale-105"
              disabled={loading} // Disable button while submitting
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>

        {/* Popup Message */}
        {showPopup && (
          <div className="popup fade-in-out fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md shadow-md">
            Wait 24 hours, we will send your ID and password!
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>
        {`
          .fade-in {
            animation: fadeIn 0.8s ease-in-out;
          }
          .fade-in-out {
            animation: fadeInOut 5s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-10px); }
            20% { opacity: 1; transform: translateY(0); }
            80% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
}

export default AccountCreateRequest;
