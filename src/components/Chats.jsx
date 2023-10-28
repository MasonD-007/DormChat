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
 //time around 1:38:11
  return (
    <div className='chats'>
      {Object.entries(chats).map(([key, value]) => {})}
        <div className='userChat'>
            <img src='https://via.placeholder.com/150' alt='user' className='userChatImg' />
            <div className='userChatInfo'>
                <span>Jan</span>
                <p>Hello</p>
            </div>
        </div>
    </div>
  )
}
