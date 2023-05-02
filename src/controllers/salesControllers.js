const { salesService } = require('../services');

const postSale = async (req, res) => {
  const sales = req.body;
  const newSale = await salesService.postSale(sales);

  if (newSale.type) return res.status(newSale.type).json({ message: newSale.message });
  return res.status(201).json(newSale.message);
};

module.exports = { postSale };
