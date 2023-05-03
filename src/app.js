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

app.put('/products/:id', verifyName, productsController.updateProduct);

app.post('/products', verifyName, productsController.postProduct);

app.get('/sales', salesController.getSales);

app.get('/sales/:id', salesController.getById);

app.post('/sales', verifyId, verifyQuantity, salesController.postSale);

module.exports = app;
