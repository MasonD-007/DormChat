import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { AES, enc } from 'crypto-ts';
import { ThemeContext,lightTheme,darkTheme } from '../context/ThemeContext';

export const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    const messages = document.querySelector('.messages');
    const messageInfo = document.querySelectorAll('.message .messageInfo');
    const messageContent = document.querySelectorAll('.message .messageContent');
    const messageContentP = document.querySelectorAll('.message .messageContent p');
    const messageContentImg = document.querySelectorAll('.message .messageContent img');
    if(theme === 'light'){
      messages.style.backgroundColor = lightTheme.SecondaryColor;
      
      messageInfo.forEach(element => {
        element.style.color = lightTheme.TextColor;
      });
      messageContent.forEach(element => {
        element.style.color = lightTheme.TextColor;
      });
      messageContentP.forEach(element => {
        element.style.backgroundColor = lightTheme.BackgroundColor;
      });
      messageContentImg.forEach(element => {
        element.style.backgroundColor = lightTheme.SecondaryColor;
      });
    } else {
      messages.style.backgroundColor = darkTheme.SecondaryColor;
      messageInfo.forEach(element => {
        element.style.color = darkTheme.TextColor;
      });
      messageContent.forEach(element => {
        element.style.color = darkTheme.TextColor;
      });
      messageContentP.forEach(element => {
        element.style.backgroundColor = darkTheme.BackgroundColor;
      });
      messageContentImg.forEach(element => {
        element.style.backgroundColor = darkTheme.SecondaryColor;
      });
    }
  }, [theme]);

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
            <p>{AES.decrypt(message.text.toString(),"IloveFrannie").toString(enc.Utf8).charAt(0).toUpperCase() + AES.decrypt(message.text.toString(),"IloveFrannie").toString(enc.Utf8).slice(1)}</p>
            <img src={message.img}/>  
        </div>
    </div>
  )
}
