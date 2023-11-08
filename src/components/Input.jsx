import React, { useContext, useEffect, useState } from 'react'
import Attach from '../img/attach.png'
import Img from '../img/img.png'
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { Timestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuid } from 'uuid';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase';
import { AES, enc } from 'crypto-ts';
import { ThemeContext,lightTheme,darkTheme } from '../context/ThemeContext';

export const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    const button = document.querySelector('.input .send button');
    if(theme === 'light'){
      button.style.backgroundColor = lightTheme.SecondaryColor;
      button.style.color = lightTheme.TextColor;
    } else {
      button.style.backgroundColor = darkTheme.SecondaryColor;
      button.style.color = darkTheme.TextColor;
    }
  }, [theme])


  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const handleKeySend = (e) => {
    if(e.key === 'Enter'){
      handleSend();
    }
  }

  const handleSend = async () => {
    var ciphertext = AES.encrypt(text,"IloveFrannie").toString();
    if(img){
      const storageRef = ref(storage, 'messagePhotos/'+ uuid());
      uploadBytes(storageRef, img).then(() => {
        getDownloadURL(storageRef).then( async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
              id: uuid(),
              text: ciphertext,
              img: downloadURL,
              senderId: currentUser.uid,
              date:Timestamp.now(),
            }),
          });
        })
      })
    }else{
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: ciphertext,
          senderId: currentUser.uid,
          date:Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId+".date"]: Timestamp.now(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId+".date"]: Timestamp.now(),
    });

    setText('');
    setImg(null);
  };

  return (
    <div className='input'>
      <input type="text" placeholder='Write a message...' onChange={e=>setText(e.target.value)} value={text} onKeyDown={handleKeySend}/>
      <div className='send'>
        <img src={Attach} alt="" />
        <input type='file' style={{display:"none"}} id='file' onChange={e=>setImg(e.target.files[0])}/>
        <label htmlFor="file">
          <img src={Img} alt=''/>
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}
