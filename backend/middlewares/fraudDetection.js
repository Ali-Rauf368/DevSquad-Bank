export const fraudDetection = (req, res, next) => {
  if (req.body.amount > 100000) {
      console.log('Potential fraud detected');
      return res.status(403).json({ message: 'Potential fraud detected. Transaction blocked.' });
  }
  next();
};
