import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItems = [
        { name: "Home", path: "/" },
        // { name: "Shops Type", path: "/shops" },
        { name: "About", path: "/About Us" },
        { name: "Contact", path: "/Contact Us" },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 ${isScrolled ? "bg-blue-600 shadow-lg" : "bg-transparent"}`}>

            {/* Desktop Navbar */}
            <div className="container mx-auto flex justify-between items-center p-4">
                <h1 className="text-2xl font-bold tracking-wide cursor-pointer text-white">
                    RatingHelper
                </h1>

                <div className="hidden md:flex space-x-8">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className="text-lg font-medium text-white hover:text-yellow-300 transition duration-300"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-2xl text-white"
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-blue-700 py-4 flex flex-col items-center space-y-4 shadow-md">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className="text-lg font-medium text-white hover:text-yellow-300 transition duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}

export default Nav;
