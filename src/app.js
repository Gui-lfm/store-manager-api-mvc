const express = require('express');
const { productsController, salesController } = require('./controllers');
const { verifyName, verifyId, verifyQuantity } = require('./middlewares');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getById);

app.post('/products', verifyName, productsController.postProduct);

app.post('/sales', verifyId, verifyQuantity, salesController.postSale);

module.exports = app;
