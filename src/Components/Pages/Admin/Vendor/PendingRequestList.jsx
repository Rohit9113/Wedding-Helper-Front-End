import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function VendorDashboard() {
    const [vendors, setVendors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const vendorsPerPage = 8;
    const indexOfLastVendor = currentPage * vendorsPerPage;
    const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
    const currentVendors = vendors.slice(indexOfFirstVendor, indexOfLastVendor);
    const totalPages = Math.ceil(vendors.length / vendorsPerPage);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const role = localStorage.getItem('role');

        const fetchVendors = async () => {
            const response = await fetch('http://localhost:3000/admin/requests', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'role': role,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            const pendingVendors = data.filter(vendor => vendor.status === 'pending');
            setVendors(pendingVendors);
        };

        fetchVendors();
    }, []);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleStatusChange = async (id, status) => {
        const token = localStorage.getItem('adminToken');
        const role = localStorage.getItem('role');

        const response = await fetch(`http://localhost:3000/admin/requests/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'role': role,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: status }), // Dynamically change the status
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message); // Show success message
            setVendors(vendors.filter(vendor => vendor._id !== id)); // Remove the vendor after status change
        } else {
            alert('Error changing vendor status');
        }
    };

    // Use this for approve
    const handleApprove = (id) => handleStatusChange(id, 'approved');

    // Use this for reject
    const handleReject = (id) => handleStatusChange(id, 'rejected');


    return (
        <>
            <div className='text-center text-xl p-5'>
                <motion.button
                    className="font-bold transition-colors duration-300 ease-in-out"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    NEW REQUEST
                </motion.button>
            </div>
            <motion.div
                className="overflow-x-auto px-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="py-3 px-6 text-left">Vendor ID</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Contact Number</th>
                            <th className="py-3 px-6 text-left">Business Name</th>
                            <th className="py-3 px-6 text-left">Shop Name</th>
                            <th className="py-3 px-6 text-left">Shop Address</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentVendors.map((vendor) => (
                            <tr key={vendor._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6">{vendor._id}</td>
                                <td className="py-3 px-6">{vendor.name}</td>
                                <td className="py-3 px-6">{vendor.email}</td>
                                <td className="py-3 px-6">{vendor.phone}</td>
                                <td className="py-3 px-6">{vendor.businessName}</td>
                                <td className="py-3 px-6">{vendor.shopName}</td>
                                <td className="py-3 px-6">{vendor.shopAddress}</td>
                                <td className="py-3 px-6">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                        onClick={() => handleApprove(vendor._id)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                                        onClick={() => handleReject(vendor._id)}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </>
    );
}

export default VendorDashboard;
