import React, { useState } from "react";
import { motion } from "framer-motion";

function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [vendorData, setVendorData] = useState({
        vendorName: "John Doe",
        shopName: "Doe's Mart",
        vendorAddress: "123 Street, City",
        shopAddress: "456 Avenue, City",
        vendorAadhaar: "1234-5678-9012",
        gstNumber: "GST123456789",
        panNumber: "ABCDE1234F",
        contactNumber: "9876543210",
        email: "vendor@example.com",
        businessType: "Retail",
        registrationDate: "01-01-2022",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVendorData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-7"
        >
            <h2 className="text-2xl font-semibold text-center mb-4">Vendor Profile</h2>
            <div className="flex flex-col py-20 md:flex-row gap-7">
                {/* Editable Information */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full md:w-1/2 h-96 space-y-4 p-4 border shadow-2xl rounded-lg"
                >
                    {[
                        { label: "Vendor Name", key: "vendorName" },
                        { label: "Shop Name", key: "shopName" },
                        { label: "Vendor Address", key: "vendorAddress" },
                        { label: "Shop Address", key: "shopAddress" },
                        { label: "Contact Number", key: "contactNumber" },
                    ].map(({ label, key }) => (
                        <div key={key} className="flex justify-between items-center">
                            <span className="font-medium">{label}:</span>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name={key}
                                    value={vendorData[key]}
                                    onChange={handleChange}
                                    className="border p-1 rounded w-1/2"
                                />
                            ) : (
                                <span>{vendorData[key]}</span>
                            )}
                        </div>
                    ))}
                </motion.div>

                {/* Crucial Information */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full md:w-1/2 space-y-4 h-96 p-4 shadow-2xl border rounded-lg"
                >
                    {["vendorAadhaar", "gstNumber", "panNumber", "email", "businessType", "registrationDate"].map((key) => (
                        <div key={key} className="flex justify-between items-center">
                            <span className="font-medium">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                            <span>{vendorData[key]}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
            <motion.div
                className="mt-0 text-center"
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
            >
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 mt-0 text-white rounded-lg shadow-md"
                    style={{ backgroundColor: isEditing ? "#22c55e" : "#3b82f6" }}
                >
                    {isEditing ? "Save" : "Edit"}
                </button>
            </motion.div>
        </motion.div>
    );
}

export default Profile;
