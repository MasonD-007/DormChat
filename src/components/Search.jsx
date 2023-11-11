import React, {useState, useContext, useEffect} from 'react'
import {collection, query, where, getDocs, serverTimestamp, doc, getDoc, setDoc, updateDoc, and, or} from 'firebase/firestore'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { ThemeContext, lightTheme,darkTheme } from '../context/ThemeContext'

export const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const {currentUser} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    const background = document.querySelector('.search');
    const text = document.querySelector('.search .searchForm input');
    if (theme === 'light') {
      background.style.backgroundColor = lightTheme.SecondaryColor.valueOf();
      text.style.color = lightTheme.TextColor.valueOf();
      document.querySelector('input[type=text]').style.setProperty("--c", lightTheme.TextColor.valueOf());
    } else {
      background.style.backgroundColor = darkTheme.SecondaryColor.valueOf();
      text.style.color = darkTheme.TextColor.valueOf();
      document.querySelector('input[type=text]').style.setProperty("--c", darkTheme.TextColor.valueOf());
    }
  }, [theme]);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username), where("uid", "!=", currentUser.uid));

    try{
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
    } catch (error) {
      console.log(error);
      return alert("User not found");
    }
  }

  const handleKey = (e) => {
    e.key === 'Enter' && handleSearch()
  }

  const handleSelect = async () => {
    const combindId = [user.uid, currentUser.uid].sort().join(':')
    
    try{
      const res = await getDoc(doc(db,"chats", combindId))

      if (!res.exists()){
        await setDoc(doc(db, "chats", combindId), {
          users: [user.displayName, currentUser.displayName],
          messages: []
        });
        console.log("Chat created");


        await updateDoc(doc(db, "userChats", currentUser.uid),{
          [combindId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combindId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid),{
          [combindId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combindId + ".date"]: serverTimestamp(),
        });
      }
  } catch (error) {
      console.log(error);
      return alert("Chat not found");
    }

    setUser(null);
    setUsername('');
  }

  return (
    <div className='search'>
        <div className='searchForm'>
            <input type='text' 
            className='searchInput' 
            placeholder='Find a User' 
            onKeyDown={handleKey} 
            onChange={e=>setUsername(e.target.value)}
            value={username}
            size={100}/>
        </div>
        {user && <div className='userChat' onClick={handleSelect}>
            <img src={user.photoURL} alt='user' className='userChatImg' />
            <div className='userChatInfo'>
                <span>{user.displayName}</span>
            </div>
        </div>}
    </div>
  )
}
