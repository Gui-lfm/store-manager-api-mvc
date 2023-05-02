module.exports = (req, res, next) => {
  const sales = req.body;
 
  const hasProductId = sales.every((sale) => 'productId' in sale);

  if (!hasProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};
