import React from 'react';

function Notifications() {
    // Sample notifications array
    const notifications = [
        "New message received",
        "System update available",
        "Reminder: Meeting at 3 PM",
        "Security alert: Password changed",
        "Account settings updated",
        "New comment on your post",
        "New follower",
        "Your subscription is about to expire",
        "New friend request",
        "You have 3 unread messages",
        // Add more notifications if needed
    ];

    return (
        <div className="w-full h-full bg-[#b6cbcf] rounded-lg drop-shadow-2xl shadow-black">
            {/* Header */}
            <div className="bg-gray-800 w-full h-12 rounded-t-lg py-2">
                <h2 className="text-xl font-bold text-center text-white">Notifications</h2>
            </div>

            {/* Scrollable Content */}
            <div className="h-[445px] overflow-y-auto p-4">
                {/* Map through notifications */}
                <ul className="space-y-2">
                    {notifications.map((notification, index) => (
                        <li key={index} className="text-sm text-gray-700 bg-white p-2 rounded-md">
                            {index + 1}. {notification}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Notifications;
