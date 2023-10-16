import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { Chat } from '../components/Chat'

export const Homepage = () => {
  return (
    <div className='home'>
        <div className='container'>
            <Sidebar />
            <Chat />
        </div>
    </div>
  )
}
