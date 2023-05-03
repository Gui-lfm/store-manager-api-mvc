const { salesModel } = require('../models');
const {
  isQuantityValid,
  productsExists,
  saleExists,
} = require('./validations/utils/validations');

const postSale = async (sales) => {
  if (!isQuantityValid(sales)) {
    return {
      type: 422,
      message: '"quantity" must be greater than or equal to 1',
    };
  }
  const idExists = await productsExists(sales);

  if (!idExists) {
    return {
      type: 404,
      message: 'Product not found',
    };
  }

  const newSale = await salesModel.registerProductSale(sales);

  return { type: null, message: newSale };
};

const getSales = async () => {
  const sales = await salesModel.getAll();
  return { type: null, message: sales };
};

const getSaleById = async (id) => {
  const result = await saleExists(id);

  if (!result) return { type: 404, message: 'Sale not found' };

  const sale = await salesModel.getById(id);
  return { type: null, message: sale };
};
module.exports = { postSale, getSales, getSaleById };
