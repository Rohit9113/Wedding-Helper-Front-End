import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const userRole = localStorage.getItem("role"); // Get role from localStorage

  // If no role is found and it's not a public route, go to 404
  if (!userRole) {
    return <Navigate to="/404" replace />;
  }

  // If the user does not have the required role, go to 404
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/404" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
