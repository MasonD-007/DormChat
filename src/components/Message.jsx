import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { AES, enc } from 'crypto-ts';

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
  
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

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
            <span>{months[message.date.toDate().getMonth()]}: {message.date.toDate().getDate()}</span>
        </div>
        <div className='messageContent'>
            <p>{AES.decrypt(message.text.toString(),"IloveFrannie").toString(enc.Utf8)}</p>
            <img src={message.img}/>  
        </div>
    </div>
  )
}
