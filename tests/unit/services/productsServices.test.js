const { expect } = require("chai");
const sinon = require("sinon");

const { productsModel } = require("../../../src/models");
const { productsService } = require("../../../src/services");
const { allProducts, createdProduct } = require("./mocks/productsService.mock");

describe("Testes da camada Service de produtos", function () {
  afterEach(function () {
    sinon.restore();
  });
  it("Deve retornar um objeto com type null e os produtos", async function () {
    sinon.stub(productsModel, "getAll").resolves(allProducts);

    const result = await productsService.getAllProducts();

    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(allProducts);
  });

  it("Retorna um produto específico com type null", async function () {
    sinon.stub(productsModel, "getProductById").resolves(allProducts[0]);

    const result = await productsService.getProductById(1);

    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(allProducts[0]);
  });

  it("Retorna um erro caso o id seja inválido", async function () {
    sinon.stub(productsModel, "getProductById").resolves(undefined);

    const result = await productsService.getProductById(999);

    expect(result.type).to.be.equal(404);
    expect(result.message).to.equal("Product not found");
  });

  it("Retorna um objeto com o produto criado e type null", async function () {
    sinon.stub(productsModel, "registerProduct").resolves(createdProduct);

    const result = await productsService.postProduct(createdProduct.name);

    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(createdProduct);
  });

  it("Retorna uma mensagem de erro caso o campo name seja inválido", async function () {
    sinon.stub(productsModel, "registerProduct").resolves(undefined);

    const result = await productsService.postProduct("abc");

    expect(result.type).to.be.equal(422);
    expect(result.message).to.equal(
      '"name" length must be at least 5 characters long'
    );
  });
});
