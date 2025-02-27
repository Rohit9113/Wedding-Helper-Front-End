import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import Nav from '../../UserNav';
import Footer from './Footer';
import Banner from './Banner';
import axios from "axios";
import Other from "../PublicPages/Other";

function Home() {
    const [vendors, setVendors] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/vendors`)
            .then(response => {
                const sortedVendors = response.data.sort((a, b) => b.rating - a.rating);
                setVendors(sortedVendors);
            })
            .catch(error => console.error("Error fetching vendors:", error));
    }, []);

    const openVendorPage = (vendorId) => navigate(`/Shop/${vendorId}`);

    const filteredVendors = vendors.filter(vendor =>
        vendor.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.shopAddress.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Nav />
            <Banner />

            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-800 p-4 w-full text-center shadow-md">
                <h2 className="text-xl font-semibold flex justify-center items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M6.937 4.5a9.72 9.72 0 0 1 10.126 0M4.5 8.625a7.217 7.217 0 0 1 15 0M3 12.75a10.5 10.5 0 0 1 18 0M1.5 16.5a13.5 13.5 0 0 1 21 0" />
                    </svg>
                    Notice
                </h2>
                <p className="mt-2 text-lg font-medium">
                    This website is only for <span className="font-bold">review and comments</span>.
                    Please give an <span className="font-bold text-blue-700">honest review</span> and comment about the shops you have used.
                </p>
            </div>

            <div className="pt-20 p-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl font-extrabold mb-10 text-center text-blue-600"
                >
                    Explore, Rate & Review – Find the Best Shops Near You!
                </motion.h1>

                <div className="max-w-3xl mx-auto mb-10">
                    <input
                        type="text"
                        placeholder="Search by shop name or address..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {filteredVendors.map((vendor) => (
                        <motion.div
                            key={vendor._id}
                            className="bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="relative w-full h-56 overflow-hidden">
                                <motion.img
                                    src={vendor.images[0]}
                                    alt={vendor.shopName}
                                    className="w-full h-full object-cover rounded-t-xl"
                                    whileHover={{ scale: 1.1 }}
                                />
                                <div className="absolute bottom-0 bg-black bg-opacity-50 text-white text-lg font-bold p-2 w-full text-center">
                                    {vendor.shopName}
                                </div>
                            </div>

                            <div className="p-4">
                                <p className="text-gray-600"><strong>📍 Location:</strong> {vendor.shopAddress}</p>
                                <p className="text-gray-600"><strong>⭐ Rating:</strong> {vendor.rating}</p>
                                <motion.button
                                    onClick={() => openVendorPage(vendor._id)}
                                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
                                    whileTap={{ scale: 0.9 }}
                                >
                                    View More
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Other />
            <Footer />
        </>
    );
}

export default Home;
