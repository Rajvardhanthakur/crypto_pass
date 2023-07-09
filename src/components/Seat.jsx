import React from 'react'

const Seat = ({ i, step, columnStart, maxColumns, rowStart, maxRows, seatsTaken, buyHandler }) => {
  return (
    <div
      onClick={() => buyHandler()}
      className="occasion_seats"
      style={{
        gridColumn: `${((i % maxColumns) + 1) + columnStart}`,
        gridRow: `${Math.ceil(((i + 1) / maxRows)) + rowStart}`
      }}
    >
      {i + step}
    </div>
  )
}

export default Seat