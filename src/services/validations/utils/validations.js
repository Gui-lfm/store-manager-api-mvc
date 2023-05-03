const { quantitySchema } = require('../schemas');
const { productsModel, salesModel } = require('../../../models');

const isQuantityValid = (sales) => {
  const quantitys = sales.map(({ quantity }) => quantity);

  for (let i = 0; i < quantitys.length; i += 1) {
    const { error } = quantitySchema.validate(quantitys[i]);

    if (error) {
      return false;
    }
  }

  return true;
};

const productsExists = async (sales) => {
  const salesIds = sales.map(({ productId }) => productId);

  const products = await productsModel.getAll();
  
  for (let i = 0; i < salesIds.length; i += 1) {
    const result = products.find((product) => product.id === salesIds[i]);
    if (!result) {
      return false;
    }
  }
  return true;
};

const saleExists = async (id) => { 
  const validQuery = await salesModel.doesSaleExist(id);

  return validQuery;
};

const productExists = async (id) => { 
  const valid = await productsModel.doesProductExist(id);

  return valid;
}; 

module.exports = { isQuantityValid, productsExists, saleExists, productExists };