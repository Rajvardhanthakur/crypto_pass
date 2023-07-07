import './App.css';
import Web3ContextProvider from './context/Web3Context';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Web3ContextProvider>
        <Home />
      </Web3ContextProvider>
    </>
  );
}

export default App;
