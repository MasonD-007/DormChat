import React, { useState,useEffect } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import { Messages } from "./Messages";
import { Input } from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { ThemeContext,lightTheme,darkTheme } from "../context/ThemeContext";
import { Menu } from "./Menu";

export const Chat = () => {
  const { data } = useContext(ChatContext);
  const [user, setUser] = useState(false);
  const {theme} = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const background = document.querySelector('.chat .chatInfo');
    const text = document.querySelector('.chat .chatInfo span');
    const img = document.querySelectorAll('.chat .chatInfo .chatIcons img');
    if (theme === 'light') {
      background.style.backgroundColor = lightTheme.SecondaryColor.valueOf();
      text.style.color = lightTheme.TextColor.valueOf();
      img.forEach(element => {
        element.style.filter = 'invert(100%)';
      });
    } else {
      background.style.backgroundColor = darkTheme.SecondaryColor.valueOf();
      text.style.color = darkTheme.TextColor.valueOf();
      img.forEach(element => {
        element.style.filter = 'invert(0%)';
      });
    }
  }, [theme]);

  const handleUser = () => {
    if (data.user.displayName !== undefined) {
      setUser(true);
    }
  }

  const handleMore = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="chat" onLoad={handleUser}>
      <div className="chatInfo">
        { user ? 
        <>
          <img src={data.user?.photoURL} alt="" />
          <span>{data.user?.displayName}</span>
          <div className="chatIcons">
            <img id="InversePhoto" src={Cam} alt="" />
            <img id="InversePhoto" src={Add} alt="" />
            <button onClick={handleMore}>
              <img id="InversePhoto" src={More} alt="" />
            </button>
            {isOpen ? <Menu /> : null}
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
