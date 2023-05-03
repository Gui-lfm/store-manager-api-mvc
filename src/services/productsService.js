const { productsModel } = require('../models');
const { nameSchema } = require('./validations/schemas');
const { productExists } = require('./validations/utils/validations');

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
  const { error } = nameSchema.validate(name);

  if (error) {
    return {
      type: 422,
      message: '"name" length must be at least 5 characters long',
    };
  }

  const newProduct = await productsModel.registerProduct(name);

  return { type: null, message: newProduct };
};

const updateProduct = async (data, id) => {
  const { error } = nameSchema.validate(data);

  const exists = await productExists(id);

  if (!exists) {
    return {
      type: 404,
      message: 'Product not found',
    };
  }

  if (error) {
    return {
      type: 422,
      message: '"name" length must be at least 5 characters long',
    };
  }

  const updatedProduct = await productsModel.updateById(data, id);
  return { type: null, message: updatedProduct };
};

const deleteProduct = async (id) => { 
  const exists = await productExists(id);

  if (!exists) {
    return {
      type: 404,
      message: 'Product not found',
    };
  }

  await productsModel.deleteProduct(id);
  return { type: null, message: 'deleted' };
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
};
