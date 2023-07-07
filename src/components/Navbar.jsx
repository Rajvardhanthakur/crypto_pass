import React from 'react'

const Navbar = () => {
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
        onClick={() => console.log("Click connect...")}
      >
        0xf698...e43s
      </button>
    </nav>
  )
}

export default Navbar