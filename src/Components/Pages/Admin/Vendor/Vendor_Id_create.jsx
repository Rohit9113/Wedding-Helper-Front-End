import { useState } from "react";
import { motion } from "framer-motion";

export default function VendorCreation() {
    const [vendorName, setVendorName] = useState("");
    const [email, setEmail] = useState("");
    const [shopName, setShopName] = useState("");
    const [vendorId, setVendorId] = useState(null);
    const [password, setPassword] = useState("");

    const handleCreateVendor = () => {
        const generatedId = `VND-${Math.floor(1000 + Math.random() * 9000)}`;
        const currentYear = new Date().getFullYear();
        const generatedPassword = vendorName ? `${vendorName}${currentYear}` : "";

        setVendorId(generatedId);
        setPassword(generatedPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-96 p-6 bg-white shadow-lg rounded-2xl"
            >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Vendor ID</h2>
                <input
                    type="text"
                    placeholder="Vendor Name"
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    className="w-full mb-3 p-2 border rounded-lg"
                />
                <input
                    type="email"
                    placeholder="Vendor Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-3 p-2 border rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Shop Name"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="w-full mb-3 p-2 border rounded-lg"
                />
                <button
                    onClick={handleCreateVendor}
                    className="w-full mt-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                    Create Vendor
                </button>
                {vendorId && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center"
                    >
                        <p>Vendor ID: <strong>{vendorId}</strong></p>
                        <p>Shop Name: <strong>{shopName}</strong></p>
                        <p>Email: <strong>{email}</strong></p>
                        <p>Password: <strong>{password}</strong></p>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
