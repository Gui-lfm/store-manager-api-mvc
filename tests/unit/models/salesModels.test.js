const { expect } = require("chai");
const sinon = require("sinon");

const { salesModel } = require("../../../src/models");
const {
  newSale,
  sales,
  salesById,
  saleRequest,
} = require("./mocks/salesModels.mock");
const connection = require("../../../src/models/connection");

describe("Testes da camada model de vendas", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("Deve recuperar a lista de vendas", async function () {
    sinon.stub(connection, "execute").resolves([sales]);
    const result = await salesModel.getAll();
    expect(result).to.be.deep.equal(sales);
  });

  it("Deve recuperar um produto específico pelo seu id", async function () {
    sinon.stub(connection, "execute").resolves([salesById]);
    const result = await salesModel.getById(1);
    expect(result).to.be.deep.equal(salesById);
  });

  it("Deve cadastrar uma nova venda", async function () {
    sinon.stub(connection, "execute").resolves([{ insertId: 3 }]);
    const result = await salesModel.registerProductSale(saleRequest);
    expect(result).to.be.deep.equal(newSale);
  });

  it("Deve ser possível deletar uma venda", async function () {});
});
