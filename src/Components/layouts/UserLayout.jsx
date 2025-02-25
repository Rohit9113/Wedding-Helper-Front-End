// src/layouts/UserLayout.jsx
import { Outlet } from "react-router-dom";
import UserNavbar from "../UserNav";

const UserLayout = () => {
  return (
    <div>
      <UserNavbar />
      <div className="p-0">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
