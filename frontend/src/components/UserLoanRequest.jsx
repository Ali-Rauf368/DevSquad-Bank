import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './UserLoanRequest.css';

const UserLoanRequest = () => {
  const [formData, setFormData] = useState({
    userId: "",
    amount: "",
    message: "",
  });
  const [viewUserId, setViewUserId] = useState(""); // Separate state for viewing loans
  const [userLoans, setUserLoans] = useState([]);
  const [hasCheckedLoans, setHasCheckedLoans] = useState(false);

  const navigate = useNavigate(); // To navigate to other routes

  const baseURL = "http://localhost:5000/api/loans";

  // User submits a loan request
  const submitLoanRequest = async () => {
    try {
      const response = await axios.post(`${baseURL}/request`, formData);
      alert(response.data.message);
      // Clear form fields after successful submission
      setFormData({
        userId: "",
        amount: "",
        message: "",
      });
    } catch (error) {
      console.error(error.response?.data?.message || "Error submitting loan request");
      alert(error.response?.data?.message || "Failed to submit loan request");
    }
  };

  // User fetches their loan requests
  const fetchUserLoans = async () => {
    if (!viewUserId.trim()) {
      alert("User ID is required to view loan requests.");
      return;
    }
  
    try {
      console.log("Fetching loans for user ID:", viewUserId.trim()); // Log user ID
      const response = await axios.get(`${baseURL}/status`, {
        params: { userId: viewUserId.trim() }, // Pass the userId as query parameter
      });
  
      if (response.data.loans && response.data.loans.length > 0) {
        setUserLoans(response.data.loans);
        setHasCheckedLoans(true);
      } else {
        alert("No loan requests found for this user.");
        setUserLoans([]);
      }
    } catch (error) {
      console.error("Error fetching loans:", error);
      alert("Failed to fetch loan requests. Check console for details.");
    }
  };

  // Logout redirect
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    sessionStorage.clear();
    window.location.replace("/login");  // Hard redirect to login
  };

  // Return to dashboard
  const handleReturnToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Loan Management System</h1>

      <div>
        <h2 className="text-lg font-semibold">Submit Loan Request</h2>
        <input
          type="text"
          placeholder="User ID"
          value={formData.userId}
          onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
          className="block mb-2 p-2 border"
        />
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="block mb-2 p-2 border"
        />
        <textarea
          placeholder="Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="block mb-2 p-2 border"
        ></textarea>
        <button onClick={submitLoanRequest} className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>

        <h2 className="text-lg font-semibold mt-4">My Loan Requests</h2>
        <div className="mb-2">
          <label>User ID (Required to view loans):</label>
          <input
            type="text"
            placeholder="Enter User ID to view your requests"
            value={viewUserId}
            onChange={(e) => setViewUserId(e.target.value)}
            className="block mb-2 p-2 border"
          />
        </div>
        <button onClick={fetchUserLoans} className="bg-green-500 text-white p-2 rounded mb-2">
          View My Requests
        </button>

        {/* Table to display loan requests */}
        {userLoans.length > 0 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Admin Message</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {userLoans.map((loan) => (
                  <tr key={loan.createdAt}>
                    <td>{loan.amount}</td>
                    <td>{loan.status}</td>
                    <td>{loan.adminMessage}</td>
                    <td>{new Date(loan.createdAt).toLocaleString()}</td>
                    <td>{new Date(loan.updatedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Buttons for Logout and Return to Dashboard */}
      <footer className="mt-4 flex justify-center gap-4">
        <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
          Logout
        </button>
        <button onClick={handleReturnToDashboard} className="bg-blue-500 text-white p-2 rounded">
          Return to Dashboard
        </button>
      </footer>
    </div>
  );
};

export default UserLoanRequest;
