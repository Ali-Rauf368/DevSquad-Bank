import React, { useState } from 'react';
import axios from 'axios';
import './Transaction.css';

const Withdraw = () => {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('General');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleWithdraw = async () => {
    // Check if the withdrawal amount exceeds 1000
    if (Number(amount) > 1000) {
      setMessage('Withdrawal amount exceeds the limit of 1000. Please try a smaller amount.');
      return;  // Do not proceed with the withdrawal
    }

    try {
      const response = await axios.post('http://localhost:5000/api/transactions/withdraw', {
        userId,
        amount: Number(amount),
        category,
        description,
      });

      setMessage(`Withdrawal successful! New Balance: ${response.data.balance}`);
      console.log('Withdrawal response:', response.data);

      // Clear the form after a successful withdrawal
      setUserId('');
      setAmount('');
      setCategory('General');
      setDescription('');
    } catch (error) {
      console.error('Error making withdrawal:', error);
      setMessage('Error making withdrawal. Please try again.');
    }
  };

  return (
    <div>
      <h1>Make a Withdrawal</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleWithdraw();
        }}
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
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="General">General</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Withdraw</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Withdraw;
