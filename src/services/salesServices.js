const { salesModel } = require('../models');
const {
  isQuantityValid,
  ProductExists,
} = require('./validations/utils/validations');

const postSale = async (sales) => {
  if (!isQuantityValid(sales)) {
    return {
      type: 422,
      message: '"quantity" must be greater than or equal to 1',
    };
  }
  const idExists = await ProductExists(sales);

  if (!idExists) {
    return {
      type: 404,
      message: 'Product not found',
    };
  }

  const newSale = await salesModel.registerProductSale(sales);

  return { type: null, message: newSale };
};

module.exports = { postSale };
