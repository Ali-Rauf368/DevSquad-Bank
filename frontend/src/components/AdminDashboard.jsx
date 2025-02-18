import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "./UserTable";
import AdminRewardsPanel from "./AdminRewardsPanel";
import AdminLoanPanel from "./AdminLoanPanel";
import AdminContentPanel from "./AdminContentPanel";
import AdminFeedback from "./AdminFeedback";
import "./AdminStyle.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/adminLogin");
      return;
    }
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("Error fetching users");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/adminLogin");
  };

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <button className="logout-button" onClick={handleLogout}>Logout</button>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        {["users", "content", "feedback", "rewards", "loans"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? "active-tab" : "inactive-tab"}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Success/Failure Message */}
      {message && <div className="message-box">{message}</div>}

      {/* Tab Content */}
      <div className="tab-content">
        <div className={activeTab === "users" ? "active-section" : "inactive-section"}>
          {activeTab === "users" && <UserTable users={users} />}
        </div>
        <div className={activeTab === "content" ? "active-section" : "inactive-section"}>
          {activeTab === "content" && <AdminContentPanel />}
        </div>
        <div className={activeTab === "feedback" ? "active-section" : "inactive-section"}>
          {activeTab === "feedback" && <AdminFeedback />}
        </div>
        <div className={activeTab === "rewards" ? "active-section" : "inactive-section"}>
          {activeTab === "rewards" && <AdminRewardsPanel />}
        </div>
        <div className={activeTab === "loans" ? "active-section" : "inactive-section"}>
          {activeTab === "loans" && <AdminLoanPanel />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
