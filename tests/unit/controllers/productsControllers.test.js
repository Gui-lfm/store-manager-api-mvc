const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require("../../../src/services");
const { productsController } = require("../../../src/controllers");
const { productsMock } = require("./mocks/productsController.mock");

describe("Testes da camada controller de produtos", function () {
  afterEach(function () {
    sinon.restore();
  });
  it("Deve retornar o status 200 e a lista", async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, "getAllProducts")
      .resolves({ type: null, message: productsMock });

    await productsController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsMock);
  });

  it("Retorna o status 200 e o produto específico", async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, "getProductById")
      .resolves({ type: null, message: productsMock[0] });

    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsMock[0]);
  });

  it("Retorna o status 404 e uma mensagem de erro caso o id não exista", async function () {
    const res = {};
    const req = {
      params: { id: 999 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, "getProductById")
      .resolves({ type: 404, message: "Product not found" });

    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: "Product not found" });
  });
});
