const { createContext } = require("react");

export const Web3Context = createContext();

const Web3ContextProvider = ({ children }) => {
  return (
    <Web3Context.Provider value={"hello"}>
      {children}
    </Web3Context.Provider>
  )
}

export default Web3ContextProvider;