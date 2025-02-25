import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Shop() {
    const { vendorId } = useParams();
    const [vendor, setVendor] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(0);
    const [userName, setUserName] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchVendor();
    }, [vendorId]);

    const fetchVendor = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/vendor/${vendorId}`);
            setVendor(response.data);
            // console.log(response.data);
        } catch (error) {
            console.error("Error fetching vendor details:", error);
        }
    };

    const handleSubmit = async () => {
        if (!newComment && newRating === 0) return;

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/user/vendor/${vendorId}/rating`,
                {
                    rating: newRating,
                    name: userName.trim() || "Anonymous",
                    text: newComment,
                }
            );

            setVendor(response.data.vendor);
            setNewComment("");
            setNewRating(0);
            setUserName("");

            toast.success("You can Edit Comments in 1 hour", { autoClose: 3000 });
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    if (!vendor) {
        return <div className="text-center text-2xl p-10">Vendor not found</div>;
    }

    return (
        <div className="p-10 md:p-20 bg-blue-100">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-600">{vendor.shopName}</h1>
            {/* <p className="text-center text-lg text-gray-700">{vendor.businessName}</p> */}

            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-4 p-2 max-h-96 overflow-y-auto">
                {vendor.images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt="Shop"
                        className="w-full h-44 object-cover rounded-lg shadow-lg cursor-pointer transform transition duration-300 hover:scale-105"
                        onClick={() => setSelectedImage(img)}
                    />
                ))}
            </div>

            <div className="bg-gray-100 mt-5 p-4 md:p-6 rounded-lg shadow-lg">
                <p className="text-lg md:text-xl font-bold mb-4">Service Type</p>
                <p>{vendor.businessName}</p>
            </div>
            <div className="bg-gray-100 mt-5 p-4 md:p-6 rounded-lg shadow-lg">
                <p className="text-lg md:text-xl font-bold mb-4">Shop Address</p>
                {/* <p>{vendor.shopAddress}</p> */}
                <p>Lorem ipsum dolor sit amet consectetur</p>
            </div>

            {/* Fullscreen Image View */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50" onClick={() => setSelectedImage(null)}>
                    <img src={selectedImage} alt="Full View" className="max-w-full max-h-full rounded-lg" />
                </div>
            )}

            {/* Add Comment & Rating */}
            <div className="mt-8 p-4 md:p-6 bg-gray-100 rounded-lg shadow-lg">
                <h2 className="text-lg md:text-xl font-bold mb-4">Leave a Rating & Comment</h2>

                {/* Star Rating */}
                <div className="mb-4 flex items-center">
                    <span className="mr-3 text-lg font-semibold">Your Rating:</span>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <FaStar
                            key={num}
                            className={`cursor-pointer text-2xl transition duration-300 ${newRating >= num ? "text-yellow-500" : "text-gray-300"}`}
                            onClick={() => setNewRating(num)}
                            style={{ marginRight: "5px" }}
                        />
                    ))}
                </div>

                {/* Name Input */}
                <input
                    type="text"
                    placeholder="Enter your name (Optional)"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />

                {/* Comment Input */}
                <textarea
                    placeholder="Write your comment..."
                    className="w-full p-2 border border-gray-300 rounded mb-4 h-20"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 transform hover:scale-105"
                >
                    Submit Rating & Comment
                </button>
            </div>

            {/* Comments Section */}
            <div className="mt-6 p-4 md:p-6 bg-gray-50 rounded-lg shadow-lg">
                <h2 className="text-lg md:text-xl font-bold mb-4">Comments & Ratings</h2>
                <ul>
                    {vendor.comments
                        .slice()
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((comment, index) => (
                            <li key={index} className="mb-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
                                <p className="font-semibold">{comment.name}</p>
                                <p className="text-gray-700">{comment.text}</p>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}

export default Shop;
