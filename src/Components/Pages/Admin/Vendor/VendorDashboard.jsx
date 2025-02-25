import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaComment, FaTrash, FaEye } from "react-icons/fa";

function VendorDashboard() {
    const navigate = useNavigate();
    const [vendors, setVendors] = useState([]);
    const [totalApproved, setTotalApproved] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [messageModal, setMessageModal] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [messageData, setMessageData] = useState({
        type: '',
        content: ''
    });
    const vendorsPerPage = 8;

    // Retrieve authentication data
    const token = localStorage.getItem('adminToken');
    const role = localStorage.getItem('role');

    useEffect(() => {
        if (!token || !role || role !== 'admin') {
            alert("Unauthorized Access! Redirecting to login.");
            navigate('/Admin_Login'); // Redirect to login page if unauthorized
            return;
        }

        fetchApprovedVendorCount();
        fetchVendors();
    }, []);

    const fetchApprovedVendorCount = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/approved/count`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTotalApproved(response.data.approvedVendors);
        } catch (error) {
            console.error('Error fetching approved vendor count:', error.response?.data || error);
        }
    };

    const fetchVendors = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/approved/vendors`, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            setVendors(response.data);
        } catch (error) {
            console.error('Error fetching vendors:', error.response?.data || error);
        }
    };

    const indexOfLastVendor = currentPage * vendorsPerPage;
    const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
    const currentVendors = vendors.slice(indexOfFirstVendor, indexOfLastVendor);
    const totalPages = Math.ceil(vendors.length / vendorsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleMessageClick = (vendor) => {
        setSelectedVendor(vendor);
        setMessageModal(true);
    };

    const handleDeleteClick = async (vendorId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/admin/vendors/${vendorId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setVendors(vendors.filter(vendor => vendor._id !== vendorId));
            alert("Vendor deleted successfully");
        } catch (error) {
            console.error('Error deleting vendor:', error.response?.data || error);
        }
    };



    const handleSendMessage = async () => {
        const { type, content } = messageData;

        if (!type || !content) {
            alert("Please fill in all fields");
            return;
        }

        try {
            // Ensure you have the selectedVendor's ID available for the POST request
            const vendorId = selectedVendor._id;

            // Make the API POST request
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/admin/${vendorId}/message`,
                {
                    select: type, // Message type (e.g., Congratulation, Warning)
                    text: content // Message content
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        role: role // Adding role in the request headers
                    }
                }
            );

            // console.log(response);
            // If message is successfully sent, close the modal and show success
            setMessageModal(false);
            alert(response.data.message); // Show success message

            // Optionally, display or log the sent message data
            console.log('Message sent successfully:', response.data.messageData);

        } catch (error) {
            console.error('Error sending message:', error.response?.data || error);
            alert("Error sending message. Please try again.");
        }
    };



    return (
        <>
            <div className='text-center text-xl p-5'>
                <motion.button className="font-bold transition-colors duration-300 ease-in-out" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    SHOPS (Approved: {totalApproved})
                </motion.button>
            </div>

            <motion.div className="overflow-x-auto px-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="py-3 px-6 text-left">Shop Name</th>
                            <th className="py-3 px-6 text-left">Vendor Email</th>
                            <th className="py-3 px-6 text-left">Contact Number</th>
                            <th className="py-3 px-6 text-left">Shop Address</th>
                            <th className="py-3 px-6 text-left">Rating</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentVendors.map((vendor) => (
                            <tr key={vendor._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6">{vendor.shopName}</td>
                                <td className="py-3 px-6">{vendor.email}</td>
                                <td className="py-3 px-6">{vendor.phone}</td>
                                <td className="py-3 px-6">{vendor.shopAddress}</td>
                                <td className="py-3 px-6">{vendor.rating}</td>
                                <td className="py-3 px-6 flex items-center gap-3">
                                    {/* Message Button */}
                                    <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                                        onClick={() => handleMessageClick(vendor)}>
                                        <FaComment size={18} />
                                    </button>

                                    {/* Delete Button */}
                                    <button className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600" onClick={() => handleDeleteClick(vendor._id)}>
                                        <FaTrash size={18} />
                                    </button>

                                    {/* View More Button */}
                                    <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600" onClick={() => navigate(`/admin/shop-profile/${vendor._id}`)}>
                                        <FaEye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            {/* Pagination */}
            <div className="flex justify-center mt-5">
                {[...Array(totalPages)].map((_, i) => (
                    <button key={i} className={`px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* Message Modal */}
            {messageModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Send Message</h2>
                        <div className="mb-3">
                            <label className="block text-sm">Message Type</label>
                            <select
                                className="w-full px-3 py-2 border rounded"
                                value={messageData.type}
                                onChange={(e) => setMessageData({ ...messageData, type: e.target.value })}
                            >
                                <option value="">Select Type</option>
                                <option value="Congratulation">Congratulation</option>
                                <option value="Warning">Warning</option>
                                <option value="General">General</option>
                                <option value="Offer">Offer</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="block text-sm">Message</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Enter your message here"
                                value={messageData.content}
                                onChange={(e) => setMessageData({ ...messageData, content: e.target.value })}
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <button className="bg-gray-500 text-white px-3 py-1 rounded" onClick={() => setMessageModal(false)}>
                                Cancel
                            </button>
                            <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={handleSendMessage}>
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default VendorDashboard;
