// src/components/OnlineBanking.jsx
import React, { useState } from 'react';

const OnlineBanking = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      setLoggedIn(true);
    }
  };

  return (
    <section id="online-banking">
      {loggedIn ? (
        <div>
          <h2>Welcome, {username}!</h2>
          <p>Access your accounts and manage your finances securely.</p>
        </div>
      ) : (
        <div>
          <h2>Login to Online Banking</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></label>
            <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      )}
    </section>
  );
};

export default OnlineBanking;
