import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profilePopupOpen, setProfilePopupOpen] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setUserData(storedUserData.data);
    }
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfilePopup = () => setProfilePopupOpen(!profilePopupOpen);

  const logout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/vendor-login');
  };

  return (
    <nav className="bg-blue-600 p-4 fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">RatingHelper</div>

        <div className="hidden md:flex space-x-6 items-center flex-1 justify-center">
          <a href="/vendor/home" className="text-white hover:text-gray-200">Home</a>
          <a href="/vendor/Vendor gallery" className="text-white hover:text-gray-200">Decorate Gallery</a>
          <a href="/vendor/contact Us" className="text-white hover:text-gray-200">Contact Admin</a>
        </div>

        <div className="hidden md:flex items-center space-x-5">
          <div className="text-white cursor-pointer" onClick={toggleProfilePopup}>
            <FaUserCircle size={20} />
          </div>
          <button onClick={logout} className="text-white hover:text-red-300">
            <FaSignOutAlt size={20} />
          </button>
        </div>

        <div className="md:hidden text-white cursor-pointer" onClick={toggleMenu}>
          <FaBars size={24} />
        </div>
      </div>

      {profilePopupOpen && userData && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex justify-end">
              <FaTimes size={20} className="cursor-pointer text-gray-600" onClick={toggleProfilePopup} />
            </div>
            <div className="text-center mb-4">
              <FaUserCircle size={50} className="text-blue-600 mx-auto" />
              <h2 className="text-2xl font-semibold mt-2">{userData.name}</h2>
              <p className="text-gray-500">{userData.email}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Shop Name:</h3>
              <p>{userData.shopName}</p>
              <h3 className="font-semibold">Shop Address:</h3>
              <p>{userData.shopAddress}</p>
              <h3 className="font-semibold">Phone Number:</h3>
              <p>{userData.phone}</p>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700" onClick={() => navigate('/vendor/edit-profile')}>
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;
