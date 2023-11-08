import React, {useContext, useEffect, useState} from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { ThemeContext, lightTheme, darkTheme } from '../context/ThemeContext'

export const Navbar = () => {
  const {currentUser} = useContext(AuthContext);
  const {theme, toggleTheme} = useContext(ThemeContext);

  useEffect(() => {
    const background = document.querySelector('.navbar');
    if (theme === 'light') {
      background.style.backgroundColor = lightTheme.SecondaryColor.valueOf();
    } else {
      background.style.backgroundColor = darkTheme.SecondaryColor.valueOf();
    }
    const text = document.querySelectorAll('.navbar .logo, .navbar .user');
    if (theme === 'light') {
      text.forEach(element => {
        element.style.color = lightTheme.TextColor.valueOf();
      });
    } else {
      text.forEach(element => {
        element.style.color = darkTheme.TextColor.valueOf();
      });
    }
    const button = document.querySelector('.navbar .user button');
    if (theme === 'light') {
      button.style.backgroundColor = lightTheme.SecondaryColor.valueOf();
      button.style.color = lightTheme.TextColor.valueOf();
      button.style.border = '1px solid ' + lightTheme.TextColor.valueOf();
    } else {
      button.style.backgroundColor = darkTheme.SecondaryColor.valueOf();
      button.style.color = darkTheme.TextColor.valueOf();
      button.style.border = '1px solid ' + darkTheme.TextColor.valueOf();
    }
  }, [theme]);


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
