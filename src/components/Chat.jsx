import React, { useState,useEffect } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import { Messages } from "./Messages";
import { Input } from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { ThemeContext,lightTheme,darkTheme } from "../context/ThemeContext";

export const Chat = () => {
  const { data } = useContext(ChatContext);
  const [user, setUser] = useState(false);
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    const background = document.querySelector('.chat .chatInfo');
    const text = document.querySelector('.chat .chatInfo span');
    if (theme === 'light') {
      background.style.backgroundColor = lightTheme.SecondaryColor.valueOf();
      text.style.color = lightTheme.TextColor.valueOf();
    } else {
      background.style.backgroundColor = darkTheme.SecondaryColor.valueOf();
      text.style.color = darkTheme.TextColor.valueOf();
    }
  }, [theme]);

  const handleUser = () => {
    if (data.user.displayName !== undefined) {
      setUser(true);
    }
  }

  const handleMore = () => {
    console.log("More");
  }

  return (
    <div className="chat" onLoad={handleUser}>
      <div className="chatInfo">
        { user ? 
        <>
          <img src={data.user?.photoURL} alt="" />
          <span>{data.user?.displayName}</span>
          <div className="chatIcons">
            <img src={Cam} alt="" />
            <img src={Add} alt="" />
            <button onClick={handleMore}>
              <img src={More} alt="" />
            </button>
          </div>
        </>
        : 
        <span>Click on a chat to start texting</span>
        }
      </div>
      <Messages />
      <Input/>
    </div>
  );
};
