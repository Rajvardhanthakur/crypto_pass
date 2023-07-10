import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers"
import config from "../utils/config.json"
import PassToken from "../abis/PassToken.json"

export const Web3Context = createContext();

const Web3ContextProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState("")
  const [provider, setProvider] = useState(null)
  const [passToken, setPassToken] = useState(null)
  const [occasions, setOccasions] = useState([])
  const [occasion, setOccasion] = useState({})

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return alert("Please install MetaMask and do appropriate setup!")
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setConnectedAccount(accounts[0]);
      } else {
        console.log("No account Found")
      }
    } catch (error) {
      console.log("Check Wallet connection error :- ", error)
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) return alert("Please install MetaMask")
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setConnectedAccount(accounts[0])
    } catch (error) {
      console.log("Error while connecting wallet :- ", error)
    }
  }

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider)

    const network = await provider.getNetwork();
    const passToken = new ethers.Contract(config[network.chainId].PassToken.address, PassToken, provider)
    setPassToken(passToken);


    const totalOccasions = await passToken.totalOccasions();
    const occasions = []

    for (let i = 1; i <= totalOccasions; i++) {
      const occasion = await passToken.getOccasion(i);
      occasions.push(occasion)
    }

    setOccasions(occasions)

    window.ethereum.on('accountChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const account = ethers.utils.getAddress(accounts[0])
      setConnectedAccount(account)
    })
  }

  const getSeatsTaken = async () => {
    const seatsTaken = await passToken.getSeatsTaken(occasion.id);
    return seatsTaken
  }

  const handleBuy = async (seat) => {
    const signer = await provider.getSigner()
    const transaction = await passToken.connect(signer).mint(occasion.id, seat, { value: occasion.cost })
    await transaction.wait()
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    loadBlockchainData()
  }, [])

  return (
    <Web3Context.Provider value={{ connectedAccount, occasions, occasion, setOccasion, connectWallet, getSeatsTaken, handleBuy }}>
      {children}
    </Web3Context.Provider>
  )
}

export default Web3ContextProvider;