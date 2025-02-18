import React, { useState } from "react";
import axios from "axios";
import './AdminLoanPanel.css';

const AdminLoanPanel = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [adminData, setAdminData] = useState({
    loanId: "",
    status: "",
    approvedAmount: "",
    interest: "",
    returnDate: "",
    terms: "",
    adminMessage: "",
  });
  const token = localStorage.getItem("adminToken");
  const [message, setMessage] = useState("");
  const baseURL = "http://localhost:5000/api/loans";

  const fetchAllLoanRequests = async () => {
    try {
      const response = await axios.get(`${baseURL}/admin/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoanRequests(response.data.loans);
    } catch (error) {
      console.error(
        error.response?.data?.message || "Error fetching loan requests"
      );
    }
  };

  const updateLoanStatus = async () => {
    try {
      const response = await axios.put(
        `${baseURL}/update/${adminData.loanId}`,
        adminData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);

      // Clear fields after successful update
      setAdminData({
        loanId: "",
        status: "",
        approvedAmount: "",
        interest: "",
        returnDate: "",
        terms: "",
        adminMessage: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error updating loan status");
    }
  };

  return (
    <div className="admin-loan-panel">
      <h1 className="header">Admin Loan Management</h1>

      <div>
        <h2 className="subheader">All Loan Requests</h2>
        <button onClick={fetchAllLoanRequests} className="btn btn-view">
          View All Requests
        </button>
        <table className="loan-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loanRequests.map((loan) => (
              <tr key={loan._id}>
                <td>{loan.userId}</td>
                <td>{loan.amount}</td>
                <td>{loan.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="update-section">
        <h2 className="subheader">Update Loan Status</h2>
        <input
          type="text"
          placeholder="Loan ID"
          value={adminData.loanId}
          onChange={(e) =>
            setAdminData({ ...adminData, loanId: e.target.value })
          }
          className="input"
        />
        <select
          value={adminData.status}
          onChange={(e) =>
            setAdminData({ ...adminData, status: e.target.value })
          }
          className="input"
        >
          <option value="">Select Status</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        {adminData.status === "Approved" && (
          <>
            <input
              type="number"
              placeholder="Approved Amount"
              value={adminData.approvedAmount}
              onChange={(e) =>
                setAdminData({ ...adminData, approvedAmount: e.target.value })
              }
              className="input"
            />
            <input
              type="text"
              placeholder="Interest"
              value={adminData.interest}
              onChange={(e) =>
                setAdminData({ ...adminData, interest: e.target.value })
              }
              className="input"
            />
            <input
              type="date"
              value={adminData.returnDate}
              onChange={(e) =>
                setAdminData({ ...adminData, returnDate: e.target.value })
              }
              className="input"
            />
            <textarea
              placeholder="Terms"
              value={adminData.terms}
              onChange={(e) =>
                setAdminData({ ...adminData, terms: e.target.value })
              }
              className="textarea"
            ></textarea>
          </>
        )}
        <textarea
          placeholder="Admin Message"
          value={adminData.adminMessage}
          onChange={(e) =>
            setAdminData({ ...adminData, adminMessage: e.target.value })
          }
          className="textarea"
        ></textarea>
        <button onClick={updateLoanStatus} className="btn btn-update">
          Update Status
        </button>
      </div>

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default AdminLoanPanel;
