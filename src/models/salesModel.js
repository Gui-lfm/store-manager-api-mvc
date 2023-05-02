const connection = require('./connection');

const registerSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );

  return insertId;
};

const registerProductSale = async (sales) => {
  const currentSaleId = await registerSales();

  const promise = sales.map(async (sale) =>
    connection.execute(
      `INSERT INTO StoreManager.sales_products 
            (sale_id, product_id, quantity) VALUES (?, ?, ?);`,
      [currentSaleId, sale.productId, sale.quantity],
    ));

  await Promise.all(promise);

  return { id: currentSaleId, itemsSold: sales };
};

const getProductSales = async () => {
  const result = await connection.execute(
    'SELECT * FROM StoreManager.sales_products',
  );

  return result;
};

module.exports = { registerSales, registerProductSale, getProductSales };
