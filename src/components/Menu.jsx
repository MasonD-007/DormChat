import React, { useState, useRef, useEffect, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ThemeContext,lightTheme,darkTheme } from '../context/ThemeContext';

export const Menu = () => {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const {theme} = useContext(ThemeContext);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])

    useEffect(() => {
        const background = document.querySelector('.dropdown');
        const text = document.querySelectorAll('.dropdown .menu .menu-item');
        if (theme === 'light') {
          background.style.backgroundColor = lightTheme.BackgroundColor.valueOf();
          text.forEach(element => {
            element.style.color = lightTheme.TextColor.valueOf();
          });
        } else {
          background.style.backgroundColor = darkTheme.BackgroundColor.valueOf();
          text.forEach(element => {
            element.style.color = darkTheme.TextColor.valueOf();
          });
        }
    }, [theme]);

    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

  function DropdownItem(props) {
    return (
      <a className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight}} ref={dropdownRef} >

      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
        style={{borderRadius: "10px 10px 10px 10px", transform: "translateX(-20px)"}}
        >
        <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={theme !== "dark" 
            ? 
            <img src="https://img.icons8.com/ios-filled/50/000000/moon-symbol.png"/> 
            : 
            <img src="https://img.icons8.com/ios-filled/50/ffffff/sun.png"/>}
          >

            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </DropdownItem>
          <DropdownItem
            leftIcon="🦧">
            LOGOUT
          </DropdownItem>

        </div>
      </CSSTransition>
    </div>
  );
}