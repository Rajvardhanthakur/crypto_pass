import React from 'react'

const Card = () => {
  return (
    <div className='card'>
      <div className='card_info'>
        <p className='card_date'>
          <strong>July 7</strong><br />6:00PM IST
        </p>

        <h3 className='card_name'>
          CSK vs MI
        </h3>
        <p className='card_location'>
          <small>Holker Stadium, Indore</small>
        </p>

        <p className='card_cost'>
          <strong>
            3.0
          </strong>
          ETH
        </p>

        <button
          type='button'
          className='card_button'
          onClick={() => console.log("clicked")}
        >
          View Seats
        </button>
      </div>
    </div>
  )
}

export default Card