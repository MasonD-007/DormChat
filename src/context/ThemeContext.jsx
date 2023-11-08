import React, { useEffect, useState } from 'react';

export const ThemeContext = React.createContext();

export function ThemeProvider(props) {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const body = document.querySelector('.home');
        if (theme === 'light') {
            body.style.backgroundColor = '#333';
            body.style.color = '#f5f5f5';
        } else {
            body.style.backgroundColor = '#f5f5f5';
            body.style.color = '#333';
        }
    }
    , [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        console.log("Set theme to " + theme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}