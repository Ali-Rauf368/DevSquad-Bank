import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Transaction.css';

const ChatApp = () => {
  const [view, setView] = useState('message'); // Tracks active tab: 'message' or 'history'
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [senderId, setSenderId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch chat history when switching to 'history' view
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (view === 'history' && senderId && receiverId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/chat/conversation`, {
            params: { userId: senderId },
          });

          // Transform chat history to display only the required fields
          const filteredHistory = response.data.map((msg) => ({
            _id: msg._id,
            senderId: msg.senderId,
            receiverId: msg.receiverId,
            message: msg.message,
            timestamp: msg.timestamp,
          }));

          setChatHistory(filteredHistory);
          setError('');
        } catch (err) {
          console.error('Error fetching chat history:', err);
          setError('Failed to load chat history. Please try again.');
        }
      }
    };

    fetchChatHistory();
  }, [view, senderId, receiverId]);

  // Handle message sending
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!senderId || !receiverId || !message) {
      setError('Sender ID, Receiver ID, and message are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/chat/send', {
        senderId,
        receiverId,
        message,
      });

      setMessages((prevMessages) => [...prevMessages, response.data]);
      setSuccessMessage('Message sent successfully!');
      setMessage('');
      setSenderId('');
      setReceiverId('');
      setError('');

      // Clear the success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send the message. Please try again.');
    }
  };

  return (
    <div className="chat-container">
      <h1>Chat Application</h1>
      <div className="tabs">
        <button
          className={view === 'message' ? 'active' : ''}
          onClick={() => setView('message')}
        >
          Messaging
        </button>
        <button
          className={view === 'history' ? 'active' : ''}
          onClick={() => setView('history')}
        >
          History
        </button>
      </div>
      <div className="form-group">
        <label>Sender ID:</label>
        <input
          type="text"
          value={senderId}
          onChange={(e) => setSenderId(e.target.value)}
          placeholder="Enter your sender ID"
          required
        />
      </div>
      <div className="form-group">
        <label>Your Banking Assistance Email:</label>
        <input
          type="text"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          placeholder="Your Banking Assistance Email"
          required
        />
      </div>
      {view === 'message' && (
        <div className="messaging">
          <div className="chat-window">
            <h2>Messages</h2>
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div key={index} className="chat-message">
                  <span className={msg.senderId === senderId ? 'self' : 'other'}>
                    {msg.senderId === senderId ? 'You' : 'Them'}:
                  </span>{' '}
                  {msg.message}
                </div>
              ))
            ) : (
              <p>No messages yet. Start the conversation!</p>
            )}
          </div>
          <form className="chat-form" onSubmit={handleSendMessage}>
            <div className="form-group">
              <label>Message:</label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
                required
              />
            </div>
            <button type="submit">Send</button>
          </form>
        </div>
      )}
      {view === 'history' && (
        <div className="history">
          <h2>Chat History</h2>
          {chatHistory.length > 0 ? (
            chatHistory.map((msg) => (
              <div key={msg._id} className="chat-message">
                <p>
                  <strong>Message ID:</strong> {msg._id}
                </p>
                <p>
                  <strong>Sender ID:</strong> {msg.senderId}
                </p>
                <p>
                  <strong>Receiver ID:</strong> {msg.receiverId}
                </p>
                <p>
                  <strong>Message:</strong> {msg.message}
                </p>
                <p>
                  <strong>Timestamp:</strong> {new Date(msg.timestamp).toLocaleString()}
                </p>
                <hr />
              </div>
            ))
          ) : (
            <p>No history available. Start a conversation!</p>
          )}
        </div>
      )}
      {successMessage && <p className="success">{successMessage}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ChatApp;
