const sales = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
  {
    saleId: 2,
    date: "2023-05-03T22:09:25.000Z",
    productId: 3,
    quantity: 15,
  },
];

const salesById = [
  {
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];

const newSale = {
  id: 3,
  itemsSold: [
    {
      productId: 2,
      quantity: 3,
    },
    {
      productId: 1,
      quantity: 3,
    },
  ],
};

const saleRequest = [
  {
    productId: 2,
    quantity: 3,
  },
  {
    productId: 1,
    quantity: 3,
  },
];

module.exports = { sales, salesById, newSale, saleRequest };
