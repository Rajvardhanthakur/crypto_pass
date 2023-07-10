import React, { useContext, useEffect, useState } from 'react'
import Close from "../assets/close.svg"
import { Web3Context } from '../context/Web3Context'
import Seat from './Seat'

const SeatChart = ({ occasion, setSeatChartToggle }) => {
  const [seatsTaken, setSeatsTaken] = useState(false)
  const [hasSold, setHasSold] = useState(false)
  const { getSeatsTaken, handleBuy } = useContext(Web3Context)

  const handleSeatsTaken = async () => {
    const seatsTaken = await getSeatsTaken();
    setSeatsTaken(seatsTaken)
  }

  const buyHandler = async (seat) => {
    setHasSold(false)
    await handleBuy(seat)
    setHasSold(true)
  }

  useEffect(() => {
    handleSeatsTaken()
  }, [hasSold])
  return (
    <div className='occasion'>
      <div className='occasion_seating'>
        <h1>CSK vs MI Seating Map</h1>

        <button
          className='occasion_close'
          onClick={() => setSeatChartToggle(false)}
        >
          <img src={Close} alt="close" />
        </button>

        <div className='occasion_stage'>
          <strong>STAGE</strong>
        </div>

        {
          seatsTaken && Array(25).fill(1).map((e, i) =>
            <Seat
              i={i}
              step={1}
              columnStart={0}
              maxColumns={5}
              rowStart={2}
              maxRows={5}
              seatsTaken={seatsTaken}
              buyHandler={buyHandler}
              key={i}
            />
          )
        }

        <div className='occasion_spacer-1'>
          <strong>WALKWAY</strong>
        </div>

        {
          seatsTaken && Array(Number(occasion.maxTickets) - 50).fill(1).map((e, i) =>
            <Seat
              i={i}
              step={26}
              columnStart={6}
              maxColumns={15}
              rowStart={2}
              maxRows={15}
              seatsTaken={seatsTaken}
              buyHandler={buyHandler}
              key={i}
            />
          )
        }

        <div className='occasion_spacer-2'>
          <strong>WALKWAY</strong>
        </div>

        {
          seatsTaken && Array(25).fill(1).map((e, i) =>
            <Seat
              i={i}
              step={(Number(occasion.maxTickets) - 24)}
              columnStart={22}
              maxColumns={5}
              rowStart={2}
              maxRows={5}
              seatsTaken={seatsTaken}
              buyHandler={buyHandler}
              key={i}
            />
          )
        }

      </div>
    </div>
  )
}

export default SeatChart