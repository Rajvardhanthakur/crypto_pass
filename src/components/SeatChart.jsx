import React from 'react'
import Close from "../assets/close.svg"
import Seat from './Seat'

const SeatChart = ({ setSeatChartToggle }) => {
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
          Array(25).fill(1).map((e, i) =>
            <Seat
              i={i}
              step={1}
              columnStart={0}
              maxColumns={5}
              rowStart={2}
              maxRows={5}
              seatsTaken={false}
              buyHandler={() => console.log("Buy handler clicked")}
              key={i}
            />
          )
        }

        <div className='occasion_spacer-1'>
          <strong>WALKWAY</strong>
        </div>

        {
          Array(75).fill(1).map((e, i) =>
            <Seat
              i={i}
              step={26}
              columnStart={6}
              maxColumns={15}
              rowStart={2}
              maxRows={15}
              seatsTaken={false}
              buyHandler={() => console.log("Buy handler clicked")}
              key={i}
            />
          )
        }

        <div className='occasion_spacer-2'>
          <strong>WALKWAY</strong>
        </div>

        {
          Array(25).fill(1).map((e, i) =>
            <Seat
              i={i}
              step={101}
              columnStart={22}
              maxColumns={5}
              rowStart={2}
              maxRows={5}
              seatsTaken={false}
              buyHandler={() => console.log("Buy handler clicked")}
              key={i}
            />
          )
        }

      </div>
    </div>
  )
}

export default SeatChart