import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { ThemeContext,lightTheme,darkTheme } from '../context/ThemeContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import LogOut from '../img/Logout.png';

export const Menu = () => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const {theme, toggleTheme} = useContext(ThemeContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    handleLoadTheme();
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  })

  const calcHeight = (el) => {
      const height = el.offsetHeight;
      setMenuHeight(height);
  }

  const DropdownItem = (props) => {
    return (
      <a className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  const handleLoadTheme = () => {
    const background = document.querySelector('.dropdown');
    const text = document.querySelectorAll('.dropdown .menu .menu-item');
    const icon = document.querySelectorAll('.dropdown .menu .menu-item .icon-button');
    const button = document.querySelectorAll('.dropdown .menu .menu-item button');
    const moonicon = document.querySelectorAll('.dropdown .menu .menu-item .icon-button #moon');
    const iconButton = document.querySelectorAll('.dropdown .menu .menu-item .icon-button #InverseImage');
    if (theme === 'light') {
      background.style.backgroundColor = lightTheme.BackgroundColor.valueOf();
      text.forEach(element => {
        element.style.color = lightTheme.TextColor.valueOf();
      });
      icon.forEach(element => {
        element.style.filter = 'invert(100%)';
      });
      moonicon.forEach(element => {
        element.style.filter = 'invert(0%)';
      });
      button.forEach(element => {
        element.style.color = lightTheme.TextColor.valueOf();
      });
      iconButton.forEach(element => {
        element.style.filter = 'invert(100%)';
      });
    } else {
      background.style.backgroundColor = darkTheme.BackgroundColor.valueOf();
      text.forEach(element => {
        element.style.color = darkTheme.TextColor.valueOf();
      });
      button.forEach(element => {
        element.style.color = darkTheme.TextColor.valueOf();
      });
      iconButton.forEach(element => {
        element.style.filter = 'invert(100%)';
      });
    }
  }

  const handleMyProfile = () => {
    navigate('/profile');
  }

  return (
    <div className="dropdown" style={{ height: menuHeight, borderRadius: "10px 10px 10px 10px"}} ref={dropdownRef} onLoad={handleLoadTheme} >

      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
        style={{transform: "translateX(-20px)"}}
        >
        <div className="menu">
          <DropdownItem>
            <button onClick={handleMyProfile}>
              MY PROFILE
            </button>
          </DropdownItem>
          <DropdownItem
            leftIcon={theme !== "dark" 
              ? <img id='moon' src="https://img.icons8.com/ios-filled/50/ffffff/moon-symbol.png"/> 
              : <img src="https://img.icons8.com/ios-filled/50/ffffff/sun.png"/>}
          >
            <button onClick={toggleTheme}>
              {theme === "light" ? "DARK MODE" : "LIGHT MODE"}
            </button>
          </DropdownItem>
          <DropdownItem
            leftIcon={theme !== "dark"
            ? <img src={LogOut} id='InverseImage'/>
            : <img src={LogOut} id='InverseImage'/>
            }>
            <button onClick={()=> signOut(auth)}>
              LOGOUT
            </button>
          </DropdownItem>

        </div>
      </CSSTransition>
    </div>
  );
}