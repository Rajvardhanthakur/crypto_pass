const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether")
}

async function main() {
  const [deployer] = await ethers.getSigners()
  const NAME = "PASSTOKEN"
  const SYMBOL = "PT"

  //Deploy contract
  const PassToken = await ethers.getContractFactory("PassToken")
  const passToken = await PassToken.deploy(NAME, SYMBOL);

  console.log(`Deployed PassToken Contract at : ${passToken.address}`)

  // List 6 events
  const occasions = [
    {
      name: "CSK VS MI",
      cost: tokens(3),
      tickets: 0,
      date: "May 31",
      time: "6:00PM IST",
      location: "Wankhede, Mumbai, MH"
    },
    {
      name: "RR VS KKR",
      cost: tokens(1),
      tickets: 125,
      date: "Jun 2",
      time: "3:00PM IST",
      location: "Wankhede, Mumbai, MH"
    },
    {
      name: "RCB VS LSG",
      cost: tokens(0.25),
      tickets: 200,
      date: "Jun 9",
      time: "6:00AM IST",
      location: "Wankhede, Mumbai, MH"
    },
    {
      name: "GT VS KXIP",
      cost: tokens(5),
      tickets: 0,
      date: "Jun 11",
      time: "3:00PM IST",
      location: "Wankhede, Mumbai, MH"
    },
    {
      name: "DC VS SRH",
      cost: tokens(1.5),
      tickets: 125,
      date: "Jun 23",
      time: "6:00AM IST",
      location: "Wankhede, Mumbai, MH"
    }
  ]

  for (let i = 0; i < 5; i++) {
    const transaction = await passToken.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location
    )

    await transaction.wait()

    console.log(`Listed Events ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1;
})