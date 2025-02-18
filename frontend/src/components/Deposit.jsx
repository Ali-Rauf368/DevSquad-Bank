import React, { useState } from 'react';
import axios from 'axios';
import './Transaction.css';

const Deposit = () => {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Income');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleDeposit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/transactions/deposit', {
        userId,
        amount: Number(amount),
        category,
        description,
      });

      setMessage(`Deposit successful! New Balance: ${response.data.balance}`);
      console.log('Deposit response:', response.data);

      // Clear the form after a successful deposit
      setUserId('');
      setAmount('');
      setCategory('Income');
      setDescription('');
    } catch (error) {
      console.error('Error making deposit:', error);
      setMessage('Error making deposit. Please try again.');
    }
  };

  return (
    <div>
      <h1>Make a Deposit</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleDeposit();
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
            <option value="Income">Income</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="General">General</option>
          </select>
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Deposit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Deposit;
