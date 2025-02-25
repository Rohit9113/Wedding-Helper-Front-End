import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Nav from '../../../Nav';

function Home() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ratings, setRatings] = useState({ averageRating: 0, comments: [] });
    const token = localStorage.getItem("token");
    const navigate = useNavigate();


    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/vendor/messages`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch notifications");
                }

                const data = await response.json();
                const formattedNotifications = data.messages.map((msg, index) => ({
                    id: msg._id || index,
                    sender: msg.from,
                    message: msg.text,
                    important: msg.from.includes("Admin") // Mark as important if from Admin
                }));

                setNotifications(formattedNotifications);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchRatings = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/vendor/ratings-comments`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch ratings");
                }

                const data = await response.json();
                setRatings(data);
            } catch (error) {
                console.error("Error fetching ratings:", error);
            }
        };

        fetchNotifications();
        fetchRatings();
    }, [token]);


    const stats = [
        { title: "Total Rating", value: ratings.averageRating.toFixed(1) },
    ];

    return (
        <>
            <Nav />
            <div className="p-6 mt-14">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
                    {/* Statistics Section */}
                    <div className="w-60 space-y-4">
                        {stats.map((item, index) => (
                            <div key={index} className="bg-gray-200 p-5 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
                                <h3 className="text-xl font-semibold text-gray-700">{item.title}</h3>
                                <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Upload Image Button */}
                    <button onClick={() => navigate("/vendor/Vendor gallery")} className="focus:outline-none">
                        <div className="bg-gray-200 p-9 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
                            <h3 className="text-xl font-semibold text-gray-700">View Your Gallery & Upload New</h3>
                        </div>
                    </button>
                </div>

                {/* Reviews & Notifications */}
                <div className="flex flex-col lg:flex-row gap-5 mt-5 animate-fadeIn">
                    {/* Reviews Section */}
                    <div className="bg-gray-200 w-full lg:w-1/2 h-[480px] p-5 rounded-lg shadow-lg overflow-auto">
                        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
                        <div className="space-y-3">
                            {ratings.comments.length === 0 ? (
                                <p>No reviews available.</p>
                            ) : (
                                ratings.comments.map(review => (
                                    <div key={review._id} className="p-4 bg-gray-100 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                                        <div className="flex justify-between">
                                            <p className="font-semibold">{review.name}</p>
                                            <p className="text-yellow-500 font-bold">⭐ {review.rating}</p>
                                        </div>
                                        <p className="text-gray-700">{review.text}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Notifications Section */}
                    <div className="bg-gray-200 w-full lg:w-1/2 h-[480px] p-5 rounded-lg shadow-lg overflow-auto">
                        <h2 className="text-xl font-bold mb-4">Notifications</h2>
                        {loading ? <p>Loading notifications...</p> : (
                            <div className="space-y-3">
                                {notifications.length === 0 ? (
                                    <p>No notifications available.</p>
                                ) : (
                                    notifications.map(notification => (
                                        <div key={notification.id} className={`p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md ${notification.important ? "bg-red-100 border-l-4 border-red-500" : "bg-gray-100"
                                            }`}>
                                            <p className="font-semibold">{notification.sender}</p>
                                            <p className="text-gray-700">{notification.message}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
