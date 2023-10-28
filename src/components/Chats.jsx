import { doc, onSnapshot } from 'firebase/firestore';
import React, {useEffect, useState, useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';

export const Chats = () => {
  const [chats, setChats] = useState([]);
  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(Object.values(doc.data()));
      });

      return () => {
        unsub();
      }
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  console.log(Object.entries(chats));
 
  return (
    <div className='chats'>
      {Object.entries(chats)?.map((chat) => (
        <div className='userChat' key={chat[0][0]}>
            <img src={chat[0][1].userInfo.photoURL} alt='user' className='userChatImg' />
            <div className='userChatInfo'>
                <span>{chat[0][1].userInfo.displayName}</span>
                <p>{chat[0][1].userInfo.lastMessage?.text}</p>
            </div>
        </div>
        ))}
    </div>
  )
}
