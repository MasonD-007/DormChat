import React, {useContext, useEffect} from 'react'
import { AuthContext } from '../context/AuthContext'
import { ThemeContext, lightTheme, darkTheme } from '../context/ThemeContext'

export const Navbar = () => {
  const {currentUser} = useContext(AuthContext);
  const {theme, toggleTheme} = useContext(ThemeContext);

  useEffect(() => {
    const background = document.querySelector('.navbar');
    const text = document.querySelectorAll('.navbar .logo, .navbar .user');
    const img = document.querySelectorAll('.navbar .user img');
    if (theme === 'light') {
      background.style.backgroundColor = lightTheme.SecondaryColor.valueOf();
      text.forEach(element => {
        element.style.color = lightTheme.TextColor.valueOf();
      });
      img.forEach(element => {
        element.style.backgroundColor = lightTheme.SecondaryColor.valueOf();
      });
    } else {
      background.style.backgroundColor = darkTheme.SecondaryColor.valueOf();
      text.forEach(element => {
        element.style.color = darkTheme.TextColor.valueOf();
      });
      img.forEach(element => {
        element.style.backgroundColor = darkTheme.SecondaryColor.valueOf();
      });    }
  }, [theme]);


  return (
    <div className='navbar'>
        <span className='logo'>Dorm Chat</span>
        <div className='user'>
            <img src={currentUser.photoURL} alt='' />
            <span>{currentUser.displayName}</span>
        </div>
    </div>
  )
}

/*
<button onClick={()=> signOut(auth)}>Logout</button>
<div className='themeButton'>
  <button onClick={toggleTheme}>
    <img src={theme === "light" ? "https://img.icons8.com/ios-filled/50/000000/moon-symbol.png" : "https://img.icons8.com/ios-filled/50/ffffff/sun.png"} alt='' />
  </button>
</div>
*/
