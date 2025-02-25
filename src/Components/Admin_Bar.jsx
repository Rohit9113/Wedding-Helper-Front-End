import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("role");
    navigate("/admin-login");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white h-full flex flex-col rounded-3xl m-1">
        <div className="text-2xl font-bold bg-gray-400 h-12 rounded-t-3xl mt-1">
          <p className="text-center">ADMIN</p>
        </div>

        <div className="p-5 text-center flex-grow">
          <ul className="space-y-3">
            <li>
              <Link
                to="/admin/Admin-dashboard"
                className={`${isActive("/admin/Admin-dashboard") ? "bg-gray-700" : ""} hover:bg-gray-700 p-2 rounded-full block`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/total-vendors"
                className={`${isActive("/admin/total-vendors") ? "bg-gray-700" : ""} hover:bg-gray-700 p-2 rounded-full block`}
              >
                Vendors
              </Link>
            </li>
            <li>
              <Link
                to="/admin/new-vendor-requests"
                className={`${isActive("/admin/new-vendor-requests") ? "bg-gray-700" : ""} hover:bg-gray-700 p-2 rounded-full block`}
              >
                Pending
              </Link>
            </li>
            <li>
              <Link
                to="/admin/Reviews"
                className={`${isActive("/admin/Reviews") ? "bg-gray-700" : ""} hover:bg-gray-700 p-2 rounded-full block`}
              >
                Reviews
              </Link>
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <div className="p-5">
          <button
            onClick={handleLogout}
            className="hover:bg-gray-700 p-2 rounded-full block w-full text-left"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
