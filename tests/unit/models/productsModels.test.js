const { expect } = require("chai");
const sinon = require("sinon");

const { productsModel } = require("../../../src/models");
const { products, newProduct } = require("./mocks/productsModel.mock");
const connection = require("../../../src/models/connection");

describe("Testes da camada model de produtos", function () {
  afterEach(function () { sinon.restore() });

  it("Deve recuperar a lista completa de produtos", async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves([products]);
    // Act
    const result = await productsModel.getAll();
    // Assert
    expect(result).to.be.an('array');
    expect(result).to.have.length(3);
    expect(result).to.be.deep.equal(products);
  });

  it('deve recuperar um produto específico', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);

    const result = await productsModel.getProductById(1);

    expect(result).to.be.an('object');
    expect(result).to.contain.keys(['id', 'name']);
    expect(result).to.be.deep.equal(products[0]);
  })

  it('É possível cadastrar um produto no banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);

    const result = await productsModel.registerProduct(newProduct);

    expect(result).to.be.deep.equal({ id: 5, name: newProduct });
  });
});
