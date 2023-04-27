const express = require('express');
const { productsController } = require('./controllers');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getById);

app.post('/products', productsController.postProduct);

module.exports = app;
