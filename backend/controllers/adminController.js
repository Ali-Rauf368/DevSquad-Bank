import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwtConfig.js';
import dotenv from 'dotenv';

dotenv.config(); // To load environment variables

/**
 * Admin Login Controller
 * Authenticates the admin and generates a JWT token.
 */
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Use environment variables for admin credentials
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@bankapp.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'a@a123';

    // Check if email and password match
    if (email !== adminEmail) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    // Ideally, you should hash and compare the admin password
    const isPasswordCorrect = password === adminPassword; // No hashing for simplicity
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ email, role: 'admin' }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

    return res.status(200).json({ token, message: 'Admin logged in successfully' });
  } catch (error) {
    console.error('Admin Login Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Update User Controller
 * Updates user details by ID.
 */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, address, dob, gender, phone, balance } = req.body;

    // Validate input data if necessary
    if (!firstName || !lastName || !email ) {
      return res.status(400).json({ error: 'First name, last name, email,  are required' });
    }

    // Update user in the database
    const user = await User.findByIdAndUpdate(id, { firstName, lastName, email, address, dob, gender, phone, balance }, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user, message: 'User updated successfully' });
  } catch (error) {
    console.error('Update User Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Delete User Controller
 * Deletes a user by ID.
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete user in the database
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete User Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Get All Users Controller
 * Fetches all users from the database.
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users, message: 'Users retrieved successfully' });
  } catch (error) {
    console.error('Get All Users Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Get User by ID Controller
 * Fetches a single user by ID.
 */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user by ID in the database
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user, message: 'User retrieved successfully' });
  } catch (error) {
    console.error('Get User Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
