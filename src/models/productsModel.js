const connection = require('./connection');

const getAll = async () => {
  try {
    const [products] = await connection.execute(
      'SELECT * FROM StoreManager.products;',
    );
    return products;
  } catch (error) {
    return error;
  }
};

const getProductById = async (id) => {
  try {
    const [[product]] = await connection.execute(
      'SELECT * FROM StoreManager.products WHERE id = ?;',
      [id],
    );
    return product;
  } catch (error) {
    return error;
  }
};

const registerProduct = async (name) => {
  try {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.products (name) VALUES (?);',
      [name],
    );
    return { id: insertId, name };
  } catch (error) {
    return error;
  }
};

module.exports = { getAll, getProductById, registerProduct };
