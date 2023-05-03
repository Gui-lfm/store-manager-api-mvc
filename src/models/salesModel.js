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

const getAll = async () => { 
  const [result] = await connection.execute(`
    SELECT 
      a.id AS saleId,
      a.date,
      b.product_id AS productId,
      b.quantity
    FROM 
      StoreManager.sales a
          INNER JOIN 
      StoreManager.sales_products b ON a.id = b.sale_id
    ORDER BY saleId , productId;`);
  
  return result;
};

const getById = async (id) => { 
  const [result] = await connection.execute(`
  SELECT
    a.date,
    b.product_id AS productId,
    b.quantity
  FROM
    StoreManager.sales a
        INNER JOIN
    StoreManager.sales_products b ON a.id = b.sale_id
  WHERE
    a.id = ?
  ORDER BY productId;`, [id]);

  return result;
};

const doesSaleExist = async (id) => {
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.sales
     WHERE id=?`, [id],
  );

  return result.length > 0;
};

const deleteSale = async (id) => { 
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?', [id],
  );
};

module.exports = {
  registerSales,
  registerProductSale,
  getAll,
  getById,
  doesSaleExist,
  deleteSale,
};
