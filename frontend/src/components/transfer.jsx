import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Transfer = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/transactions/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ amount, recipient }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Transfer failed');
      }

      const data = await response.json();
      alert(data.message || 'Transfer successful!');
      navigate('/dashboard'); // Redirect to dashboard after successful transfer
    } catch (error) {
      setErrorMessage(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transaction-container">
      <h2>Transfer</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleTransfer}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label>Recipient (User ID):</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Transfer'}
        </button>
      </form>
    </div>
  );
};

export default Transfer;
