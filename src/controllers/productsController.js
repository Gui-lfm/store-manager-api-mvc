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

const postProduct = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productsService.postProduct(name);

  if (newProduct.type) return res.status(newProduct.type).json({ message: newProduct.message });
  return res.status(201).json(newProduct.message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const response = await productsService.updateProduct(name, id);

  if (response.type) return res.status(response.type).json({ message: response.message });
  return res.status(200).json(response.message);
};

const deleteProduct = async (req, res) => { 
  const { id } = req.params;

  const response = await productsService.deleteProduct(id);
  if (response.type) return res.status(response.type).json({ message: response.message });
  return res.status(204).json();
};

module.exports = { getAll, getById, postProduct, updateProduct, deleteProduct };
