import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from request parameters
    const user = await User.findById(userId); // Find the user by ID
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);  // Return user profile
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Update user details (partial updates)
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id; // Extract user ID from request parameters
    const updates = req.body;  // Get fields to update from the request body

    // List of allowed fields for the update (excluding sensitive ones like balance)
    const allowedFields = ['firstName', 'lastName', 'phone', 'gender', 'dateOfBirth', 'address'];

    // Filter the updates to only include allowed fields
    const filteredUpdates = Object.keys(updates).reduce((acc, key) => {
      if (allowedFields.includes(key)) {
        acc[key] = updates[key];
      }
      return acc;
    }, {});

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(userId, filteredUpdates, {
      new: true,  // Return updated document
      runValidators: true,  // Apply validation from schema
    });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: error.message || 'Server Error' });
  }
};
