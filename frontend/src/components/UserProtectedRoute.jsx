import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

const UserProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // Prevent back navigation after logout
  useEffect(() => {
    if (!isAuthenticated) {
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", () => {
        window.history.pushState(null, "", window.location.href);
      });
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default UserProtectedRoute;
