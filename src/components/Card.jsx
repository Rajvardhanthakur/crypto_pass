import React from 'react'
import { ethers } from "ethers"

const Card = ({ occasion, seatChartToggle, setSeatChartToggle, setOccasion }) => {
  const handleClick = (e) => {
    if (occasion.tickets.toString() === "0") {
      return;
    }
    setOccasion(occasion)
    setSeatChartToggle(!seatChartToggle)
  }
  return (
    <div className='card'>
      <div className='card_info'>
        <p className='card_date'>
          <strong>{occasion.date}</strong><br />{occasion.time}
        </p>

        <h3 className='card_name'>
          {occasion.name}
        </h3>
        <p className='card_location'>
          <small>{occasion.location}</small>
        </p>

        <p className='card_cost'>
          <strong>
            {ethers.utils.formatUnits(occasion.cost.toString(), 'ether')}
          </strong>
          ETH
        </p>

        <button
          type='button'
          className={occasion.tickets.toString() === "0" ? "card_button_out" : 'card_button'}
          onClick={(e) => handleClick(e)}
        >
          {occasion.tickets.toString() === "0" ? "Sold Out" : "View Seats"}
        </button>
      </div>
    </div>
  )
}

export default Card