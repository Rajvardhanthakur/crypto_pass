const { createContext, useState, useEffect } = require("react");

export const Web3Context = createContext();

const Web3ContextProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState("")

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return alert("Please install MetaMask and do appropriate setup!")
      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("accounts - ", accounts)
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
      console.log("Accounts :- ", accounts)
      setConnectedAccount(accounts[0])
    } catch (error) {
      console.log("Error while connecting wallet :- ", error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <Web3Context.Provider value={{ connectedAccount, connectWallet }}>
      {children}
    </Web3Context.Provider>
  )
}

export default Web3ContextProvider;