const connection = require('./connection');

const registerSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );

  return insertId;
};

const registerProductSale = async (sales) => {
  const currentSaleId = await registerSales();

  sales.map(async (sale) =>
    connection.execute(
      `INSERT INTO StoreManager.sales_products 
            (sale_id, product_id, quantity) VALUES (?, ?, ?);`,
      [currentSaleId, sale.productId, sale.quantity],
    ));

  return { id: currentSaleId, itemsSold: sales };
};

module.exports = { registerSales, registerProductSale };
