import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

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
  //console.log("The Date: " + message.date.toDate());
  console.log("The Date2: " + message.date.toDate().toLocaleTimeString());
  var localTime = message.date.toDate().toLocaleTimeString();
  console.log("type: " + typeof(localTime));
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
            <span>{message.date.toDate().toLocaleTimeString()}</span>
        </div>
        <div className='messageContent'>
            <p>{message.text}</p>
            <img src={message.img}/>  
        </div>
    </div>
  )
}
