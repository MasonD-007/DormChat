import React from 'react'

export const Navbar = () => {
  return (
    <div className='navbar'>
        <span className='logo'>Dorm Chat</span>
        <div className='user'>
            <img src='' alt='' />
            <span>John</span>
            <button>Logout</button>
        </div>
    </div>
  )
}
