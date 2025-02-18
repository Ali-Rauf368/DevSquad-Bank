export const flagPotentialFraud = async (req, res) => {
    try {
        const { amount, userId } = req.body;

        if (!amount || !userId) {
            return res.status(400).json({ message: 'Amount and userId are required.' });
        }

        if (amount > 10000) {
            console.log(`Fraud alert! User ID: ${userId}, Amount: ${amount}`);
            return res.status(403).json({ message: 'Potential fraud detected. Transaction flagged.' });
        }

        res.status(200).json({ message: 'Transaction is safe. No fraud detected.' });
    } catch (error) {
        console.error('Error in fraud detection:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
