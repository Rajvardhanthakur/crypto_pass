import React, { useContext } from 'react'
import Navbar from '../components/Navbar';
import { Web3Context } from '../context/Web3Context'

function Home() {
  const web3Context = useContext(Web3Context);
  console.log("Web3 context :- ", web3Context)
  return (
    <div>
      <header>
        <Navbar />
        <h2 className='header_title'><strong>Event</strong> Tickets</h2>
      </header>
    </div>
  )
}

export default Home