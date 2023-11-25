import React, {useEffect, useContext} from 'react'
import { Sidebar } from '../components/Sidebar'
import { Chat } from '../components/Chat'
import { ThemeContext, lightTheme,darkTheme } from '../context/ThemeContext'

export const Homepage = () => {
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    const background = document.querySelector('.home');
    if (theme === 'light') {
      background.style.backgroundColor = lightTheme.BackgroundColor.valueOf();
    } else {
      background.style.backgroundColor = darkTheme.BackgroundColor.valueOf();
    }
  }, [theme]);

  return (
    <div className='home'>
        <div className='container'>
            <Sidebar />
            <Chat />
        </div>
    </div>
  )
}
