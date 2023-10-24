import React from 'react'
import upload from '../img/upload.png' 
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db, storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'

export const Register = () => {

  const handleSubmin = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;
    const file = e.target[4].files[0];

    if (password !== confirmPassword) {
      console.log('Passwords do not match');
        return alert('Passwords do not match');
    }
    else if (password.length < 8) {
      console.log('Password must be at least 8 characters');
      return alert('Password must be at least 8 characters');
    }

    let point1 = false;
    let point2 = false;

    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      //Pfp upload
      const storageRef = ref(storage, 'user/' + displayName + '/profile.jpg')
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        //"state_changed",
        (error) => {
          console.log(error);
        },
        () => {
          console.log("Upload successful");
          getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
             point1 = true
            await updateProfile(user, {
              displayName: displayName,
              photoURL: downloadURL
            })
            point2 = true
            //Firestore-User Info
            setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: displayName,
              photoURL: downloadURL,
              email: user.email,
            });
          });

          console.log("Ran Point 1: " + point1);
          console.log("Ran Point 2: " + point2);
          console.log("Ran Point 3: True");
        }
      )


      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);
      return alert("Something went wrong");
    });

  }

  return (
    <div className='formContainer'>

        <div className='formWrapper'>
            <span className='logo'>DormChat</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmin}>
                <input type='text' placeholder='Display Name' />
                <input type='email' placeholder='Email' />
                <input type='password' placeholder='Password' />
                <input type='password' placeholder='Confirm Password' />
                <input style={{display:"none"}} type='file' id='file'/>
                <label htmlFor='file'>
                    <img src={upload} alt='upload' />
                    <span>Upload a Profile Picture</span>
                </label>
                <button>Register</button>
            </form>
            <p>Already have an account? <a href='/login'>Login</a></p>
        </div>
    </div>
  )
}
