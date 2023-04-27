const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.getAll();
  return { type: null, message: products };
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  if (!product) return { type: 404, message: 'Product not found' };
  return { type: null, message: product };
};

const postProduct = async (name) => {
  const newProduct = await productsModel.registerProduct(name);

  return { type: null, message: newProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
};
