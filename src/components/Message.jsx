import React from 'react'
import Face from '../img/faceshot.png'

export const Message = () => {
  return (
    <div className='message owner'>
        <div className='messageInfo'>
            <img src={Face} alt="" />
            <span>right now</span>
        </div>
        <div className='messageContent'>
            <p>hello.</p>
            <img src={Face} alt="" />
        </div>
    </div>
  )
}
