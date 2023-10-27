import React from 'react'
import test from '../img/faceshot.png'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

export const Navbar = () => {
  return (
    <div className='navbar'>
        <span className='logo'>Dorm Chat</span>
        <div className='user'>
            <img src={test} alt='' />
            <span>John</span>
            <button onClick={()=>signOut(auth)}>Logout</button>
        </div>
    </div>
  )
}
