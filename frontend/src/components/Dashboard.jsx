import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    sessionStorage.clear();
    window.location.replace("/login");  // Hard redirect to login
  };

  return (
    <div>
      <NavBar />
      <div className="dashboard-container">
        <h2>Welcome to your Dashboard</h2>
        <div className="dashboard-options">
          <Link to="/user-profile" className="dashboard-option">User Profile</Link>
          <Link to="/transaction" className="dashboard-option">Transaction</Link>
          <Link to="/offers" className="dashboard-option">Offers</Link> 
          <Link to="/loan-request" className="dashboard-option">User Loan Request</Link>
        </div>
        <footer className="logout-footer">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
