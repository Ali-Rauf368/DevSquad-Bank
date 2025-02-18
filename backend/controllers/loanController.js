// controllers/loanController.js
import Loan from '../models/Loan.js';

// 1. User makes a loan request
export const createLoanRequest = async (req, res) => {
  try {
    const { userId, amount, message } = req.body;

    if (!userId || !amount || !message) {
      return res.status(400).json({ message: 'User ID, amount, and message are required' });
    }

    const loan = new Loan({
      userId,
      amount,
      message,
      status: 'Pending',
      adminMessage: '',
    });

    await loan.save();
    res.status(201).json({ message: 'Loan request submitted successfully', loan });
  } catch (error) {
    console.error('Error creating loan request:', error); // Log the specific error
    res.status(500).json({ message: 'Error submitting loan request', error: error.message });
  }
};


// 2. Admin views all loan requests and can approve/reject

export const getAllLoanRequests = async (req, res) => {
  try {
    // Log the req.user object to ensure it's correctly populated
    console.log('Request user:', req.user);

    // Ensure the user is an admin
    if (req.user && req.user.email !== 'admin@bankapp.com') {
      console.log('User is not admin');
      return res.status(403).json({ message: 'Unauthorized. Only admins can view all loan requests' });
    }

    // Retrieve all loan requests
    const loans = await Loan.find();

    if (!loans.length) {
      console.log('No loans found in the database');
      return res.status(404).json({ message: 'No loan requests found' });
    }

    console.log('Loans found:', loans);
    res.status(200).json({ loans });
  } catch (error) {
    console.error('Error fetching loan requests:', error);
    res.status(500).json({ message: 'Error fetching loan requests', error: error.message });
  }
};


// 3. Admin approves/rejects a loan request and adds a reason message
export const updateLoanStatus = async (req, res) => {
  try {
    const { loanId } = req.params;
    const { approvedAmount, interest, returnDate, terms, adminMessage, status } = req.body;

    // Validate status
    if (!status || !['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Use "Approved" or "Rejected"' });
    }

    // Validate required fields for approved loans
    if (status === 'Approved') {
      if (approvedAmount <= 0 || !interest || !returnDate || !terms) {
        return res.status(400).json({ message: 'Approved amount, interest, return date, and terms are required for approval' });
      }
    }

    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({ message: 'Loan request not found' });
    }

    // Update loan status and details
    loan.status = status;
    loan.adminMessage = adminMessage || '';

    if (status === 'Approved') {
      loan.approvedAmount = approvedAmount;
      loan.interest = interest;
      loan.returnDate = new Date(returnDate);
      loan.terms = terms;
    }

    await loan.save();

    res.status(200).json({ message: `Loan request ${status.toLowerCase()} successfully`, loan });
  } catch (error) {
    console.error('Error updating loan status:', error);
    res.status(500).json({ message: 'Error updating loan status', error: error.message });
  }
};

// 4. User views their loan request status and admin's response

export const getUserLoanRequests = async (req, res) => {
  try {
    // Get userId from query parameters (for GET requests)
    const { userId } = req.query;  // This will look for ?userId=value in the query string

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required and not found' });
    }

    // Fetch loans using the userId from the query parameter
    const loans = await Loan.find({ userId: userId });

    if (loans.length === 0) {
      return res.status(404).json({ message: 'No loan requests found' });
    }

    // Return loan requests with status and admin's message
    const loanData = loans.map(loan => ({
      amount: loan.amount,
      message: loan.message,
      status: loan.status,
      adminMessage: loan.adminMessage,
      createdAt: loan.createdAt,
      updatedAt: loan.updatedAt,
    }));

    res.status(200).json({ loans: loanData });
  } catch (error) {
    console.error('Error fetching loan requests:', error);
    res.status(500).json({ message: 'Error fetching loan requests', error: error.message });
  }
};
