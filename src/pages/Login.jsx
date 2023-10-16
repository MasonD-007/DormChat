import React from 'react'

export const Login = () => {
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>DormChat</span>
            <span className='title'>Login</span>
            <form>
                <input type='email' placeholder='Email' />
                <input type='password' placeholder='Password' />
                <button>Login</button>
            </form>
            <p>Don't have an account? <a href='/register'>Register</a></p>
        </div>
    </div>
  )
}
