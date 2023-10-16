import React from 'react'
import upload from '../img/upload.png' 

export const Register = () => {
  return (
    <div className='formContainer'>

        <div className='formWrapper'>
            <span className='logo'>DormChat</span>
            <span className='title'>Register</span>
            <form>
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
