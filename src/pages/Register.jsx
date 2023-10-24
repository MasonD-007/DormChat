import React from 'react'
import upload from '../img/upload.png' 
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export const Register = () => {

  const handleSubmin = (e) => {
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

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);
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
