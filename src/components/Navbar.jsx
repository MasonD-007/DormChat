import React, {useContext, useState} from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { ThemeContext } from '../context/ThemeContext'

export const Navbar = () => {
  const {currentUser} = useContext(AuthContext);
  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <div className='navbar'>
        <span className='logo'>Dorm Chat</span>
        <div className='user'>
            <img src={currentUser.photoURL} alt='' />
            <span>{currentUser.displayName}</span>
            <button onClick={()=> signOut(auth)}>Logout</button>
            <div className='themeButton'>
              <button onClick={toggleTheme}>
                <img src={theme === "light" ? "https://img.icons8.com/ios-filled/50/000000/moon-symbol.png" : "https://img.icons8.com/ios-filled/50/ffffff/sun.png"} alt='' />
              </button>
            </div>
        </div>
    </div>
  )
}
