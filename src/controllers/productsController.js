const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const products = await productsService.getAllProducts();
  return res.status(200).json(products.message);
};

const getById = async (req, res) => { 
  const { id } = req.params;

  const product = await productsService.getProductById(id);
  if (product.type) return res.status(product.type).json({ message: product.message });
  return res.status(200).json(product.message);
};

module.exports = { getAll, getById };
