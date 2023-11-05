import { doc, onSnapshot, updateDoc, deleteField, deleteDoc } from 'firebase/firestore';
import React, {useEffect, useState, useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';
import { ChatContext } from '../context/ChatContext';

export const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

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

  const handleSelect = (u) => {
    dispatch({type: "CHANGE_USER", payload: u});
  };

  const handleDelete = (cu) => {
    const combindId = [cu.uid, currentUser.uid].sort().join(':');

    //Deletes the messages
    deleteDoc(doc(db, "chats", combindId));
    
    //Deletes the chat link from both users
    updateDoc(doc(db, "userChats", currentUser.uid),{
      [combindId]: deleteField(),
    });

    updateDoc(doc(db, "userChats", cu.uid),{
      [combindId]: deleteField(),
    });
    console.log("Chat deleted");
    
  }
  
  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div className='userChat' key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
            <img src={chat[1].userInfo.photoURL} alt='user' className='userChatImg' />
            <div className='userChatInfo'>
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
            </div>
            <div className='userChatDel'>
              <button onClick={()=>handleDelete(chat[1].userInfo)}>Delete Chat</button>
            </div>
        </div>
        
        ))}
    </div>
  )
}
