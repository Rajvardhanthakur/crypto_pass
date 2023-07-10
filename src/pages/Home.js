import React, { useContext, useState } from 'react'
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import SeatChart from '../components/SeatChart';
import { Web3Context } from '../context/Web3Context'

function Home() {
  const web3Context = useContext(Web3Context);
  const [seatChartToggle, setSeatChartToggle] = useState(false)
  return (
    <div>
      <header>
        <Navbar />
        <h2 className='header_title'><strong>Event</strong> Tickets</h2>
      </header>
      <div className='cards'>
        <Card
          seatChartToggle={seatChartToggle}
          setSeatChartToggle={setSeatChartToggle}
        />
        <Card
          seatChartToggle={seatChartToggle}
          setSeatChartToggle={setSeatChartToggle}
        />
        <Card
          seatChartToggle={seatChartToggle}
          setSeatChartToggle={setSeatChartToggle}
        />
        <Card
          seatChartToggle={seatChartToggle}
          setSeatChartToggle={setSeatChartToggle}
        />
        <Card
          seatChartToggle={seatChartToggle}
          setSeatChartToggle={setSeatChartToggle}
        />
      </div>
      {
        seatChartToggle && (
          <SeatChart
            setSeatChartToggle={setSeatChartToggle}
          />
        )
      }
    </div>
  )
}

export default Home