import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MarketingDashboard.css';

const MarketingDashboard = () => {
  const [activeTab, setActiveTab] = useState('personalized');
  const [transactionId, setTransactionId] = useState('');
  const [personalizedOffers, setPersonalizedOffers] = useState([]);
  const [category, setCategory] = useState('');
  const [collaborativePromotions, setCollaborativePromotions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchPersonalizedOffers = async () => {
    if (!transactionId) {
      setError('Transaction ID is required.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `http://localhost:5000/api/marketing/offers/personalized/${transactionId}`
      );
      setPersonalizedOffers(response.data.personalizedOffers || []);
    } catch (err) {
      console.error('Error fetching personalized offers:', err);
      setError(
        err.response?.data?.message || 'Failed to fetch personalized offers. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchCollaborativePromotions = async () => {
    if (!category) {
      setError('Category is required.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `http://localhost:5000/api/marketing/offers/collaborative`,
        { params: { category } }
      );
      setCollaborativePromotions(response.data.promotions || []);
    } catch (err) {
      console.error('Error fetching collaborative promotions:', err);
      setError(
        err.response?.data?.message || 'Failed to fetch collaborative promotions. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    sessionStorage.clear();
    window.location.replace("/login");  // Hard redirect to login page
  };

  const handleReturnToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="marketing-dashboard">
      <h1>Marketing Dashboard</h1>
      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}

      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === 'personalized' ? 'active' : ''}`}
          onClick={() => setActiveTab('personalized')}
        >
          Personalized Offers
        </button>
        <button
          className={`tab-button ${activeTab === 'collaborative' ? 'active' : ''}`}
          onClick={() => setActiveTab('collaborative')}
        >
          Collaborative Promotions
        </button>
      </div>

      {activeTab === 'personalized' && (
        <div className="section">
          <h2>Personalized Offers</h2>
          <div className="form-group">
            <label>Transaction ID:</label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter Transaction ID"
            />
            <button onClick={fetchPersonalizedOffers}>Get Offers</button>
          </div>
          <div className="offers">
            {personalizedOffers.length > 0 ? (
              personalizedOffers.map((offer) => (
                <div key={offer.offerId} className="offer">
                  <p>{offer.description}</p>
                </div>
              ))
            ) : (
              <p>No personalized offers found.</p>
            )}
          </div>
          <div className="button-container">
            <button className="transaction-button" onClick={handleLogout}>
              Logout
            </button>
            <button className="transaction-button" onClick={handleReturnToDashboard}>
              Return to Dashboard
            </button>
          </div>
        </div>
      )}

      {activeTab === 'collaborative' && (
        <div className="section">
          <h2>Collaborative Promotions</h2>
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter Category"
            />
            <button onClick={fetchCollaborativePromotions}>Get Promotions</button>
          </div>
          <div className="promotions">
            {collaborativePromotions.length > 0 ? (
              collaborativePromotions.map((promotion) => (
                <div key={promotion.promotionId} className="promotion">
                  <p>{promotion.description}</p>
                </div>
              ))
            ) : (
              <p>No collaborative promotions found.</p>
            )}
          </div>
          <div className="button-container">
            <button className="transaction-button" onClick={handleLogout}>
              Logout
            </button>
            <button className="transaction-button" onClick={handleReturnToDashboard}>
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingDashboard;
