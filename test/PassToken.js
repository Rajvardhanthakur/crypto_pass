const { expect } = require("chai");

const NAME = "PassToken";
const SYMBOL = 'PT'

const OCCASION_NAME = "ETH Indore";
const OCCASION_COST = ethers.utils.parseUnits('1', 'ether');
const OCCASION_MAX_TICKETS = 100;
const OCCASION_DATE = "July 15";
const OCCASION_TIME = "05:00PM IST";
const OCCASION_LOCATION = "Indore, MP";

describe("PassToken", () => {
  let PassToken, passToken, owner, buyer;

  beforeEach(async () => {
    [owner, buyer] = await ethers.getSigners();
    PassToken = await ethers.getContractFactory("PassToken")
    passToken = await PassToken.deploy(NAME, SYMBOL);

    const transaction = await passToken.connect(owner).list(
      OCCASION_NAME,
      OCCASION_COST,
      OCCASION_MAX_TICKETS,
      OCCASION_DATE,
      OCCASION_TIME,
      OCCASION_LOCATION
    )

    await transaction.wait();
  })

  describe('Deployment', () => {
    it("Sets the name", async () => {
      let name = await passToken.name()
      expect(name).to.equal(NAME)
    })

    it("Sets the symbol", async () => {
      let symbol = await passToken.symbol();
      expect(symbol).to.equal(SYMBOL)
    })

    it("Set the owner", async () => {
      expect(await passToken.owner()).to.equal(owner.address);
    })
  })

  describe('Occasions', () => {
    it("Returns occasions attributes", async () => {
      const occasion = await passToken.getOccasion(1)
      expect(occasion.id).to.be.equal(1)
      expect(occasion.name).to.be.equal(OCCASION_NAME)
      expect(occasion.cost).to.be.equal(OCCASION_COST)
      expect(occasion.tickets).to.be.equal(OCCASION_MAX_TICKETS)
      expect(occasion.date).to.be.equal(OCCASION_DATE)
      expect(occasion.time).to.be.equal(OCCASION_TIME)
      expect(occasion.location).to.be.equal(OCCASION_LOCATION)
    })

    it('Updates occasions count', async () => {
      const totalOccasions = await passToken.totalOccasions()
      expect(totalOccasions).to.be.equal(1)
    })
  })

  describe("Minting", () => {
    const ID = 1
    const SEAT = 50
    const AMOUNT = ethers.utils.parseUnits("1", "ether")

    beforeEach(async () => {
      const transaction = await passToken.connect(buyer).mint(ID, SEAT, { value: AMOUNT })
      await transaction.wait()
    })

    it("Updates ticket count", async () => {
      const occasion = await passToken.getOccasion(1)
      expect(occasion.tickets).to.be.equal(OCCASION_MAX_TICKETS - 1);
    })

    it("Updates buying status", async () => {
      const status = await passToken.hasBought(ID, buyer.address)
      expect(status).to.be.equal(true)
    })

    it("Updates seat status", async () => {
      const owner = await passToken.seatTaken(ID, SEAT)
      expect(owner).to.equal(buyer.address)
    })

    it("Updates overall seating status", async () => {
      const seats = await passToken.getSeatsTaken(ID)
      expect(seats.length).to.equal(1)
      expect(seats[0]).to.equal(SEAT)
    })

    it("Updates the contract balance", async () => {
      const balance = await ethers.provider.getBalance(passToken.address)
      expect(balance).to.be.equal(AMOUNT)
    })
  })

  describe('Withdrawing', () => {
    const ID = 1
    const SEAT = 50
    const AMOUNT = ethers.utils.parseUnits("1", "ether")
    let balanceBefore

    beforeEach(async () => {
      balanceBefore = await ethers.provider.getBalance(owner.address)

      let transaction = await passToken.connect(buyer).mint(ID, SEAT, { value: AMOUNT });
      await transaction.wait()

      transaction = await passToken.connect(owner).withdraw()
      await transaction.wait()
    })

    it("Updates the owner balance", async () => {
      const balanceAfter = await ethers.provider.getBalance(owner.address)
      expect(balanceAfter).to.be.greaterThan(balanceBefore)
    })

    it("Updates the contract balance", async () => {
      const balance = await ethers.provider.getBalance(passToken.address)
      expect(balance).to.equal(0)
    })
  })

})