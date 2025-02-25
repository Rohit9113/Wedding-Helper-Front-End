import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TotalCount() {
    const [newRequests, setNewRequests] = useState(0);
    const [approvedVendors, setApprovedVendors] = useState(0);

    useEffect(() => {
        const fetchNewRequests = async () => {
            const token = localStorage.getItem("adminToken");
            const role = localStorage.getItem("role");

            if (token && role === "admin") {
                try {
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/requests/count`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                    const data = await response.json();

                    if (response.ok) {
                        setNewRequests(data.pendingRequests); // Set the pending requests count
                    } else {
                        console.error("Failed to fetch new requests:", data.message);
                    }
                } catch (error) {
                    console.error("Something went wrong while fetching new requests:", error);
                }
            }
        };

        const fetchApprovedVendors = async () => {
            const token = localStorage.getItem("adminToken");
            const role = localStorage.getItem("role");

            if (token && role === "admin") {
                try {
                    const response = await fetch("http://localhost:3000/admin/approved/count", {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                    const data = await response.json();

                    if (response.ok) {
                        setApprovedVendors(data.approvedVendors); // Set the approved vendors count
                    } else {
                        console.error("Failed to fetch approved vendors:", data.message);
                    }
                } catch (error) {
                    console.error("Something went wrong while fetching approved vendors:", error);
                }
            }
        };

        fetchNewRequests();
        fetchApprovedVendors();
    }, []);

    return (
        <div>
            {/* Main Content */}
            <div className="flex-1 px-80">
                <div className="flex gap-5">
                    {/* <div className="bg-gray-800 h-20 w-52 rounded-2xl flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-white text-lg font-bold">Total Users</p>
                            <p className="text-white text-lg font-bold">NA</p>
                        </div>
                    </div> */}
                    <Link to="/admin/total-vendors">
                        <div className="bg-gray-800 h-20 w-52 rounded-2xl flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-white text-lg font-bold">Total Vendors</p>
                                <p className="text-white text-lg font-bold">{approvedVendors}</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="/admin/new-vendor-requests">
                        <div className="bg-gray-800 h-20 w-52 rounded-2xl flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-white text-lg font-bold">New Requests</p>
                                <p className="text-white text-lg font-bold">{newRequests}</p>
                            </div>
                        </div>
                    </Link>

                    {/* <div className="bg-gray-800 h-20 w-52 rounded-2xl flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-white text-lg font-bold">Remaining Booking</p>
                            <p className="text-white text-lg font-bold">NA</p>
                        </div>
                    </div>

                    <div className="bg-gray-800 h-20 w-52 rounded-2xl flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-white text-lg font-bold">Completed Booking</p>
                            <p className="text-white text-lg font-bold">NA</p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default TotalCount;
