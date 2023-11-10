import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const Profilepage = () => {
    const {currentUser} = useContext(AuthContext);
    const {displayName, email, photoURL} = currentUser;

  return (
    <ul>
        <li><img src={photoURL} alt='' /></li>
        <li>{displayName}</li>
        <li>{email}</li>
    </ul>
  )
}