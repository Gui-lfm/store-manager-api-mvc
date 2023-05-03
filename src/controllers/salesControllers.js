const { salesService } = require('../services');

const postSale = async (req, res) => {
  const sales = req.body;
  const newSale = await salesService.postSale(sales);

  if (newSale.type) return res.status(newSale.type).json({ message: newSale.message });
  return res.status(201).json(newSale.message);
};

const getSales = async (_req, res) => { 
  const sales = await salesService.getSales();
  return res.status(200).json(sales.message);
};

const getById = async (req, res) => { 
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);

  if (sale.type) return res.status(sale.type).json({ message: sale.message });
  return res.status(200).json(sale.message);
};

const deleteSale = async (req, res) => { 
  const { id } = req.params;
  const response = await salesService.deleteSale(id);

  if (response.type) return res.status(response.type).json({ message: response.message });
  return res.status(204).json();
};

module.exports = { postSale, getSales, getById, deleteSale };
