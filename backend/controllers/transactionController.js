import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

export const deposit = async (req, res) => {
  const { userId, amount, description, category } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check for missing required fields
    const requiredFields = ['firstName', 'lastName', 'dateOfBirth', 'address'];
    for (const field of requiredFields) {
      if (!user[field]) {
        return res.status(400).json({ message: `User is missing required field: ${field}` });
      }
    }

    user.balance += amount;
    await user.save();

    const transaction = new Transaction({
      type: 'deposit',
      amount,
      sender: userId,
      description: description || 'Deposit funds',
      category: category || 'General',
    });
    await transaction.save();

    user.transactions.push(transaction);
    await user.save();

    res.status(200).json({ message: 'Deposit successful', balance: user.balance, transaction });
  } catch (err) {
    res.status(500).json({ message: 'Error in deposit', error: err.message });
  }
};

export const withdraw = async (req, res) => {
  const { userId, amount, description, category } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.balance < amount) return res.status(400).json({ message: 'Insufficient funds' });

    user.balance -= amount;
    await user.save();

    const transaction = new Transaction({
      type: 'withdrawal',
      amount,
      sender: userId,
      description: description || 'Withdrawal',
      category: category || 'General',
    });
    await transaction.save();

    user.transactions.push(transaction._id);
    await user.save();

    res.status(200).json({ message: 'Withdrawal successful', balance: user.balance, transaction });
  } catch (err) {
    res.status(500).json({ message: 'Error in withdrawal', error: err.message });
  }
};

export const transfer = async (req, res) => {
  const { senderId, receiverId, amount, description, category } = req.body;
  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) return res.status(404).json({ message: 'User(s) not found' });
    if (sender.balance < amount) return res.status(400).json({ message: 'Insufficient funds' });

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    const transaction = new Transaction({
      type: 'transfer',
      amount,
      sender: senderId,
      receiver: receiverId,
      description: description || 'Transfer funds',
      category: category || 'General',
    });
    await transaction.save();

    sender.transactions.push(transaction._id);
    receiver.transactions.push(transaction._id);

    await sender.save();
    await receiver.save();

    res.status(200).json({ message: 'Transfer successful', balance: sender.balance, transaction });
  } catch (err) {
    res.status(500).json({ message: 'Error in transfer', error: err.message });
  }
};

export const getTransactionHistory = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate('transactions');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ transactions: user.transactions });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transaction history', error: err.message });
  }
};
