import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Transaction.css';

const TransactionHistory = () => {
  const [userId, setUserId] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/transactions/${userId}/transactions`);
      setTransactions(response.data.transactions);
      setMessage('');
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setMessage('Failed to load transaction history. Please check the User ID.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTransactions();
  };

  return (
    <div>
      <h1>Transaction History</h1>
      <form
        onSubmit={handleSubmit}
        className="transaction-history-form"
      >
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Fetch History</button>
      </form>

      {message && <p className="error-message">{message}</p>}

      <div className="transaction-history">
        <h3>Transactions</h3>
        <ul>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <li key={transaction._id}>
                <strong>{transaction.type.toUpperCase()}</strong> - ${transaction.amount}
                <p>Category: {transaction.category}</p>
                <p>Description: {transaction.description}</p>
                <p>Date: {new Date(transaction.timestamp).toLocaleString()}</p>
              </li>
            ))
          ) : (
            <p>No transactions available for this user.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TransactionHistory;
