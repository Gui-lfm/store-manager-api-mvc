module.exports = (req, res, next) => {
  const sales = req.body;
  const hasQuantity = sales.every((sale) => 'quantity' in sale);

  if (!hasQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};
