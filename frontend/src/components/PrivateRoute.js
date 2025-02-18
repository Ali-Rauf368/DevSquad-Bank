// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken'); // Check if the adminToken exists in localStorage

  if (!token) {
    return <Navigate to="/adminLogin" />; // Redirect to login if no token is found
  }

  return children; // Allow access to children (AdminDashboard)
};

export default PrivateRoute;
