import React, { useState } from 'react';
import axios from 'axios';
import './Transaction.css';

const OnlineTransfer = () => {
  const [senderId, setSenderId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('General');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleTransfer = async () => {
    if (Number(amount) >= 1000) {
      setMessage('You can only transfer an amount less than 1000.');
      return; // Don't proceed with the transfer
    }

    try {
      const response = await axios.post('http://localhost:5000/api/transactions/transfer', {
        senderId,
        receiverId,
        amount: Number(amount),
        category,
        description,
      });

      setMessage(`Transfer successful! New Balance: ${response.data.balance}`);
      console.log('Transfer response:', response.data);

      // Clear the form after a successful transfer
      setSenderId('');
      setReceiverId('');
      setAmount('');
      setCategory('General');
      setDescription('');
    } catch (error) {
      console.error('Error making transfer:', error);
      setMessage('Error making transfer. Please try again.');
    }
  };

  return (
    <div>
      <h1>Online Transfer</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleTransfer();
        }}
      >
        <div>
          <label>Sender ID:</label>
          <input
            type="text"
            value={senderId}
            onChange={(e) => setSenderId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Receiver Account Number:</label>
          <input
            type="text"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
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
        <button type="submit">Transfer</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default OnlineTransfer;
