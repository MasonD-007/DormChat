import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

export const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  console.log(message.img)
  return (
    <div className={message.senderId === currentUser.uid 
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
            <span>right now</span>
        </div>
        <div className='messageContent'>
            <p>{message.text}</p>
            <img src={message.img} alt="" />
        </div>
    </div>
  )
}
