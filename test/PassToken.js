const { expect } = require("chai");

describe("PassToken", () => {
  describe('Deployment', () => {

    let PassToken;
    let passToken;

    beforeEach(async () => {
      PassToken = await ethers.getContractFactory("PassToken")
      passToken = await PassToken.deploy("PassToken", "PT");
    })

    it("Sets the name", async () => {
      let name = await passToken.name()
      expect(name).to.equal("PassToken")
    })

    it("Sets the symbol", async () => {
      let symbol = await passToken.symbol();
      expect(symbol).to.equal("PT")
    })
  })
})