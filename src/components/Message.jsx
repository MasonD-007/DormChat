import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import test from '../img/faceshot.png';

export const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
    });
  }
  , [message]);
  //<img src={message.img} alt="" />}
  return (
    <div ref={ref} className={message.senderId === currentUser.uid 
                  ? "message owner" 
                  : "message"}>
        <div className='messageInfo'>
            <img 
              src=
                {message.senderId === currentUser.uid 
                  ? currentUser.photoURL 
                  : data.user.photoURL} 
              alt="" 
            />
            <span>{}</span>
        </div>
        <div className='messageContent'>
            <p>{message.text}</p>
            {message.img && <p>{message.img}</p>}  
        </div>
    </div>
  )
}
