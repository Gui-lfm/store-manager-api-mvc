const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.getAll();
  console.log('teste', products);
  return { type: null, message: products };
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  // console.log(product);
  if (!product) return { type: 404, message: 'Product not found' };
  return { type: null, message: product };
};

module.exports = {
  getAllProducts,
  getProductById,
};
