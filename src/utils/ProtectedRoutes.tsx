import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = true; // Replace with actual authentication logic
  const isAuthenticated = Boolean(user);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
