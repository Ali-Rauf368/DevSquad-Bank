import React, { useState } from 'react';
import EditUserModal from './EditUserModal';
import './AdminStyle.css';

const UserTable = ({ users, refreshUsers }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`http://localhost:5000/api/admin/user/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      alert('User deleted successfully');
      refreshUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true); // Show modal when Edit button is clicked
  };

  return (
    <div>
      {/* Conditionally render the table based on showModal */}
      {!showModal && (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
                <td>{user.dateOfBirth}</td>
                <td>{user.address}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Show the modal when showModal is true */}
      {showModal && (
        <EditUserModal
          user={selectedUser}
          closeModal={() => setShowModal(false)} // Close modal and return to table
          refreshUsers={refreshUsers}
        />
      )}
    </div>
  );
};

export default UserTable;
