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

  var messageDay = message.date.toDate().getDate();

  var messageMonth = message.date.toDate().getMonth();
  
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var monthName = months[messageMonth];

  const messageDate = monthName + " " + messageDay;

  const nowSeconds = new Date().getSeconds().valueOf();
  const nowDay = new Date().getDate().valueOf() *24 * 60 * 60;

  const now = nowDay + nowSeconds;

  console.log("Now: " + now)
  console.log("Message Time: " + ((message.date.toDate().getDate().valueOf() * 24 * 60 * 60) + message.date.toDate().getSeconds().valueOf()))
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
            <span>{now - 5 <= (message.date.toDate().getDate().valueOf() * 24 * 60 * 60) + message.date.toDate().getSeconds().valueOf() 
                  ? "Right Now"
                  : messageDate
            }</span>
        </div>
        <div className='messageContent'>
            <p>{message.text}</p>
            <img src={message.img}/>  
        </div>
    </div>
  )
}
