// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Admin_Bar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 p-4 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
