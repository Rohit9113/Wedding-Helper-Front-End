import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import ProtectedRoute & 404 Page
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "./Components/Pages/PublicPages/PageNotFound";

// Admin Imports
import AdminLayout from "./Components/layouts/AdminLayout";
import Login from "./Components/Pages/PublicPages/AdminLogin";
import AdminDashboard from "./Components/Pages/Admin/AdminHome/Dashboard";
import VendorIdcreate from "./Components/Pages/Admin/Vendor/Vendor_Id_create";
import Reviews from "./Components/Pages/Admin/Reviews";
import ShopProfile from "./Components/Pages/Admin/Vendor_Profile";
import VendorDashboard from "./Components/Pages/Admin/Vendor/VendorDashboard";
import PendingRequestList from "./Components/Pages/Admin/Vendor/PendingRequestList";
import Rating from "./Components/Pages/Admin/Rating";

// Vendor Imports
import VendorLayout from "./Components/layouts/ShopLayout";
import AccountCreateRequest from "./Components/Pages/PublicPages/AccountCreateRequest";
import VendorLogin from "./Components/Pages/PublicPages/Login";
import VendorHome from "./Components/Pages/Vendor/VendorHome/Home";
import VendorContact from "./Components/Pages/Vendor/Contact/ContactFromAdmin";
import VendorGallery from "./Components/Pages/Vendor/Gallery/VendorDecoreGallery";
import EditProfile from "./Components/Pages/Vendor/Profile";
import SendOTP from "./Components/Pages/PublicPages/ForgetPassword/SendOTP";
import Setpassword from "./Components/Pages/PublicPages/ForgetPassword/SetPassword";

// User Imports (Public Routes)
import UserLayout from "./Components/layouts/UserLayout";
import Home from "./Components/Pages/User/Home";
import Shop from "./Components/Pages/User/Shop";

import "./App.css";
import About from "./Components/Pages/User/About";
import Contact from "./Components/Pages/User/Contact";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Routes>
        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="Admin-dashboard" element={<AdminDashboard />} />
            <Route path="vendor-id-create" element={<VendorIdcreate />} />
            <Route path="total-vendors" element={<VendorDashboard />} />
            <Route path="shop-profile/:vendorId" element={<ShopProfile />} />
            <Route path="new-vendor-requests" element={<PendingRequestList />} />
            <Route path="Reviews" element={<Reviews />} />
            <Route path="all-reviews/:vendorId" element={<Rating />} />
          </Route>
        </Route>
        <Route path="/admin-login" element={<Login />} />

        {/* Vendor Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["vendor"]} />}>
          <Route path="/vendor" element={<VendorLayout />}>
            <Route path="home" element={<VendorHome />} />
            <Route path="contact Us" element={<VendorContact />} />
            <Route path="Vendor gallery" element={<VendorGallery />} />
            <Route path="edit-profile" element={<EditProfile />} />
          </Route>
        </Route>
        <Route path="/vendor-request" element={<AccountCreateRequest />} />
        <Route path="/vendor-login" element={<VendorLogin />} />

        {/* Public User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="Shop/:vendorId" element={<Shop />} />
          <Route path="About Us" element={<About />} />
          <Route path="Contact Us" element={<Contact />} />
        </Route>

        {/* Public Routes */}
        <Route path="/send-otp" element={<SendOTP />} />
        <Route path="/set-password" element={<Setpassword />} />

        {/* 404 Page Route */}
        <Route path="/404" element={<PageNotFound />} />

        {/* Catch-All Redirect to 404 */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
