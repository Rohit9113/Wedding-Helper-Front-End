import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VendorProfile = () => {
    const { vendorId } = useParams();
    const [vendor, setVendor] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVendorDetails = async () => {
            try {
                // Retrieve the token from localStorage
                const token = localStorage.getItem("adminToken");

                if (!token) {
                    setError("Authorization token is missing. Please log in.");
                    setLoading(false);
                    return;
                }

                // Make the API request with the token in headers
                const response = await axios.get(`http://localhost:3000/admin/requests/${vendorId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in headers
                    },
                });

                setVendor(response.data);
                setError(""); // Clear any previous errors
            } catch (err) {
                console.error("Error fetching vendor details:", err);
                setError("Vendor not found or an error occurred.");
            } finally {
                setLoading(false);
            }
        };

        if (vendorId) {
            fetchVendorDetails(); // Calls the API if vendorId is available
        }
    }, [vendorId]);

    if (loading) {
        return <h2 style={{ textAlign: "center" }}>Fetching vendor details...</h2>;
    }

    if (error) {
        return <h2 style={{ color: "red", textAlign: "center" }}>{error}</h2>;
    }

    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", textAlign: "center", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
            <h1>{vendor.name}</h1>
            <p><strong>Business Name:</strong> {vendor.businessName}</p>
            <p><strong>Shop Name:</strong> {vendor.shopName}</p>
            <p><strong>Address:</strong> {vendor.shopAddress}</p>
            <p><strong>Email:</strong> {vendor.email}</p>
            <p><strong>Phone:</strong> {vendor.phone}</p>
            <p><strong>Role:</strong> {vendor.role}</p>
            <p><strong>Status:</strong> {vendor.status}</p>
            <p><strong>Rating:</strong> {vendor.rating} ⭐</p>
            <p><strong>Joined:</strong> {new Date(vendor.createdAt).toLocaleDateString()}</p>
            
            <div style={{ marginTop: "20px" }}>
                <img 
                    src={vendor.images.length > 0 ? vendor.images[0] : "https://via.placeholder.com/300"} 
                    alt={vendor.shopName} 
                    width="300"
                    style={{ borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)" }} 
                />
            </div>
        </div>
    );
};

export default VendorProfile;
