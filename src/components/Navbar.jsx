import React from 'react'
import test from '../img/faceshot.png'

export const Navbar = () => {
  return (
    <div className='navbar'>
        <span className='logo'>Dorm Chat</span>
        <div className='user'>
            <img src={test} alt='' />
            <span>John</span>
            <button>Logout</button>
        </div>
    </div>
  )
}
