import React, { useContext } from 'react'
import { Web3Context } from '../context/Web3Context'
import { shortenAddress } from '../utils/shortenAddress';

const Navbar = () => {
  const { connectedAccount, connectWallet } = useContext(Web3Context);
  const handleConnect = (e) => {
    if (!connectedAccount) {
      connectWallet()
    }
  }
  return (
    <nav>
      <div className='nav_brand'>
        <h1>cryptopass</h1>

        <input className='nav_search' type="text" placeholder="Find events here..." />

        <ul className='nav_links'>
          <li><a href='/'>Concerts</a></li>
          <li><a href='/'>Sports</a></li>
          <li><a href='/'>Arts & Theater</a></li>
          <li><a href='/'>About</a></li>
        </ul>
      </div>

      <button
        type='button'
        className='nav_connect'
        onClick={handleConnect}
      >
        {connectedAccount ? shortenAddress(connectedAccount) : "Connect"}
      </button>
    </nav>
  )
}

export default Navbar