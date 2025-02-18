import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import './UserProfile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogoutRedirect = () => {
    localStorage.removeItem('user');
    sessionStorage.clear();
    window.location.replace('/login'); // Hard redirect to login page
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({
      ...editedUserData,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      // Ensure the userId is passed correctly
      if (!userId) {
        setError("User ID is missing");
        return;
      }
      
      // Send the PUT request with the correct API URL
      const response = await axios.put(`http://localhost:5000/api/user/profile/${userId}`, editedUserData);
      
      // Handle successful response
      setUserData(response.data.user);
      setIsEditing(false);
      setError(null); // Clear previous errors
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Error saving changes');
    }
  };

  const handleUserIdSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Get user data based on user ID
      const response = await axios.get(`http://localhost:5000/api/user/profile/${userId}`);
      
      if (response.data) {
        setUserData(response.data); 
        setEditedUserData(response.data);
      } else {
        setError('User not found');
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('User not found or error fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="user-profile-container">
        <h3>User Profile</h3>

        {error && <p className="error-message">{error}</p>}
        {loading && <p>Loading...</p>}

        {userData ? (
          <div className="user-profile-details">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="firstName"
                  value={editedUserData.firstName || ''}
                  onChange={handleInputChange}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="lastName"
                  value={editedUserData.lastName || ''}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                />
                <input
                  type="text"
                  name="phone"
                  value={editedUserData.phone || ''}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                />
                <input
                  type="text"
                  name="address"
                  value={editedUserData.address || ''}
                  onChange={handleInputChange}
                  placeholder="Address"
                />
                <br />
                <button onClick={handleSaveChanges}>Save Changes</button>
                <button onClick={handleEditToggle}>Cancel</button>
              </>
            ) : (
              <>
                <p><strong>First Name:</strong> {userData.firstName}</p>
                <p><strong>Last Name:</strong> {userData.lastName}</p>
                <p><strong>Phone Number:</strong> {userData.phone}</p>
                <p><strong>Address:</strong> {userData.address}</p>
                <br />
                <button onClick={handleEditToggle}>Edit Profile</button>
                <button onClick={handleLogoutRedirect}>Logout</button>
              </>
            )}
          </div>
        ) : (
          <div>
            <h4>Please enter your user ID to view your profile:</h4>
            <form onSubmit={handleUserIdSubmit}>
              <input
                type="text"
                name="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
                required
              />
              <button type="submit">View Profile</button>
            </form>
          </div>
        )}

        {/* Return Button to Dashboard */}
        <button onClick={() => navigate('/dashboard')} className="return-button">
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
