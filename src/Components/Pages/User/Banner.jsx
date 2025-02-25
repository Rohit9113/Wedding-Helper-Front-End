import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Banner() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        "https://img.freepik.com/premium-photo/vibrant-modern-music-festival-poster_1008415-69252.jpg?w=826",
        "https://img.freepik.com/premium-photo/photo-is-must-everyday-work-ai-generated-best-wonderful-photo_865967-1233391.jpg?w=826",
        "https://img.freepik.com/premium-photo/installing-audio-equipment-live-events-concerts_908985-111853.jpg",
        "https://img.freepik.com/premium-photo/city-gent-belgium-summer-time_1150964-47.jpg",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-full h-[400px] overflow-hidden">
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Banner ${index + 1}`}
                        className="w-full h-[400px] object-cover flex-shrink-0"
                    />
                ))}
            </div>

            {/* Navigation Buttons */}
            <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
                <FaArrowLeft size={24} />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
                <FaArrowRight size={24} />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white" : "bg-gray-500"}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Banner;
