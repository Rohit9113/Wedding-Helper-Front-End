import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get vendorId from URL
import axios from "axios";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";

function Rating() {
    const { vendorId } = useParams(); // Get vendorId from URL parameters
    const [reviews, setReviews] = useState([]);
    const [shopName, setShopName] = useState("");
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchReviews = async () => {
            const token = localStorage.getItem("adminToken");
            const role = localStorage.getItem("role");

            if (!token || role !== "admin") {
                console.error("Unauthorized access");
                return;
            }

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/admin/ratings-comments/${vendorId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setReviews(response.data.comments);
                setShopName(response.data.shopName);
                setAverageRating(response.data.averageRating);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        if (vendorId) fetchReviews();
    }, [vendorId]);

    const handleDelete = async (commentId) => {
        const token = localStorage.getItem("adminToken");

        if (!token) {
            console.error("No token found. Please login again.");
            return;
        }

        // console.log("Deleting comment with ID:", commentId);
        // console.log("Vendor ID:", vendorId);
        // console.log("Token:", token);

        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/admin/vendors/${vendorId}/comments/${commentId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // console.log("Delete Response:", response.data);

            // Remove the deleted comment from UI
            setReviews((prevReviews) =>
                prevReviews.filter((review) => review.commentId !== commentId)
            );

            console.log("Comment deleted successfully.");
        } catch (error) {
            console.error("Error deleting comment:", error.response?.data || error.message);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-gray-100 min-h-screen"
        >
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                Vendor Ratings & Reviews
            </h2>
            <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
                <h3 className="text-2xl font-semibold text-gray-700">{shopName}</h3>
                <p className="text-lg text-gray-600">Average Rating: ⭐ {averageRating}</p>
                <ul className="mt-4">
                    {reviews.map((review) => (
                        <motion.li
                            key={review.commentId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-4 border-b flex justify-between items-center"
                        >
                            <div>
                                <p className="font-semibold">User: {review.userName}</p>
                                <p className="text-yellow-500">Rating: ⭐ {review.rating}</p>
                                <p className="text-gray-700">Comment: {review.text}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(review.commentId)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <FaTrash />
                            </button>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

export default Rating;
