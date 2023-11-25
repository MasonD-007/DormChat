import React, { useEffect, useState } from 'react';

export const ThemeContext = React.createContext();

export const lightTheme = {"BackgroundColor": "#F5F5F5", "SecondaryColor": "#B2D8D8", "TextColor": "#333"}
export const darkTheme = {"BackgroundColor": "#333", "SecondaryColor": "#1A1A2E", "TextColor": "#F5F5F5"}

export function ThemeProvider(props) {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const background = document.querySelector('.home');
        if (theme === 'light') {
            background.style.backgroundColor = lightTheme.BackgroundColor.valueOf();
        } else {
            background.style.backgroundColor = darkTheme.BackgroundColor.valueOf();
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