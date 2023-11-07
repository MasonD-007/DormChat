import React, { useState } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import { Messages } from "./Messages";
import { Input } from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

export const Chat = () => {
  const { data } = useContext(ChatContext);
  const [user, setUser] = useState(false);

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
        <span>Click on a chat to start talking</span>
        }
      </div>
      <Messages />
      <Input/>
    </div>
  );
};
