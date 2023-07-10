import React, { useContext, useState } from 'react'
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import SeatChart from '../components/SeatChart';
import { Web3Context } from '../context/Web3Context'

function Home() {
  const { occasions, occasion, setOccasion } = useContext(Web3Context);
  const [seatChartToggle, setSeatChartToggle] = useState(false)
  return (
    <div>
      <header>
        <Navbar />
        <h2 className='header_title'><strong>Event</strong> Tickets</h2>
      </header>
      <div className='cards'>
        {
          occasions.map((occasion, index) => {
            return (
              <Card
                occasion={occasion}
                setOccasion={setOccasion}
                seatChartToggle={seatChartToggle}
                setSeatChartToggle={setSeatChartToggle}
                key={occasion.id}
              />
            )
          })
        }
      </div>
      {
        seatChartToggle && (
          <SeatChart
            occasion={occasion}
            setSeatChartToggle={setSeatChartToggle}
          />
        )
      }
    </div>
  )
}

export default Home