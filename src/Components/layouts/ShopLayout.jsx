// src/layouts/ShopLayout.jsx
import { Outlet } from "react-router-dom";
import ShopNavbar from "../Nav";

const ShopLayout = () => {
  return (
    <div>
      <ShopNavbar />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default ShopLayout;
