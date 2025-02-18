import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminRewardsPanel.css';

const AdminRewardsPanel = () => {
  const [rewards, setRewards] = useState([]);
  const [newReward, setNewReward] = useState({
    userId: '',
    rewardAmount: '',
    transactionType: '',
    message: '',
  });

  const token = localStorage.getItem('adminToken');

  // Fetch all rewards
  const refreshRewards = async () => {
    try {
      const allRewardsRes = await axios.get('http://localhost:5000/api/rewards/all-rewards', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRewards(allRewardsRes.data);
    } catch (error) {
      console.error('Error fetching rewards:', error);
    }
  };

  useEffect(() => {
    refreshRewards();
  }, []);

  // Handle new reward submission
  const handleRewardSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/rewards/give-reward', newReward, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRewards((prevRewards) => [...prevRewards, res.data.reward]);
      alert('Reward given successfully!');
      setNewReward({ userId: '', rewardAmount: '', transactionType: '', message: '' });
    } catch (error) {
      console.error('Error giving reward:', error);
      alert('Failed to give reward.');
    }
  };

  return (
    <div className="admin-panel">
      {/* Reward Section */}
      <div className="card">
        <div className="card-content">
          <h2 className="section-title">Rewards</h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="User ID"
              value={newReward.userId}
              onChange={(e) =>
                setNewReward({ ...newReward, userId: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Reward Amount"
              value={newReward.rewardAmount}
              onChange={(e) =>
                setNewReward({ ...newReward, rewardAmount: e.target.value })
              }
            />
            <select
              value={newReward.transactionType}
              onChange={(e) =>
                setNewReward({ ...newReward, transactionType: e.target.value })
              }
            >
              <option value="">Select Transaction Type</option>
              <option value="simple">Simple</option>
              <option value="eco-friendly">Eco-Friendly</option>
            </select>
            <input
              type="text"
              placeholder="Message (Optional)"
              value={newReward.message}
              onChange={(e) =>
                setNewReward({ ...newReward, message: e.target.value })
              }
            />
            <button onClick={handleRewardSubmit} className="mt-2">
              Give Reward
            </button>
          </div>
        </div>
      </div>

      {/* All Rewards */}
      <div className="card">
        <div className="card-content">
          <h2 className="section-title">All Rewards Recievers</h2>
          <table className="users-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Reward Amount</th>
                <th>Transaction Type</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
  {rewards.map((reward) => (
    <tr key={reward._id}>
      <td>{reward.user?._id || "No ID provided"}</td> {/* Render user ID */}
      <td>{reward.rewardAmount}</td>
      <td>{reward.transactionType}</td>
      <td>{reward.message}</td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRewardsPanel;
