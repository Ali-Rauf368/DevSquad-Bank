import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import TransactionHistory from './TransactionHistory';
import OnlineTransfer from './OnlineTransfer';
import Chat from './Chat';
import './Transaction.css';

const Transaction = () => {
  const navigate = useNavigate();

  // Function to handle logout and redirect to login page
  const handleLogoutRedirect = () => {
    localStorage.removeItem("isAuthenticated");
    sessionStorage.clear();
    window.location.replace('/login'); // Hard redirect to login page
  };

  // Function to return to dashboard
  const handleReturnToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="transaction-container">
      <header>
        <h2>Transaction Management</h2>
      </header>

      <nav className="transaction-nav">
        <ul>
          <li>
            <Link to="deposit">Deposit</Link>
          </li>
          <li>
            <Link to="withdraw">Withdraw</Link>
          </li>
          <li>
            <Link to="online-pay">Online Transfer</Link>
          </li>
          <li>
            <Link to="history">Transaction History</Link>
          </li>
          <li>
            <Link to="chat">Chat</Link>
          </li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="deposit" element={<Deposit />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="history" element={<TransactionHistory />} />
          <Route path="online-pay" element={<OnlineTransfer />} />
          <Route path="chat" element={<Chat />} />
        </Routes>
      </main>

      <footer>
        <button className="transaction-button" onClick={handleLogoutRedirect}>
          Logout
        </button>
        <button className="transaction-button" onClick={handleReturnToDashboard}>
          Return to Dashboard
        </button>
      </footer>
    </div>
  );
};

export default Transaction;
