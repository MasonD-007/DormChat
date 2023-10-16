import React from 'react'


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
                <input type='file' id='file'/>
                <label htmlFor='file'>
                    Upload Profile Picture
                </label>
                <button>Register</button>
            </form>
            <p>Already have an account? <a href='/login'>Login</a></p>
        </div>
    </div>
  )
}
