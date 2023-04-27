const express = require('express');
const { productsController } = require('./controllers');
const verifyName = require('./middlewares/verifyName');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getById);

app.post('/products', verifyName, productsController.postProduct);

module.exports = app;
