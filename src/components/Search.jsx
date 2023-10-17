import React from 'react'

export const Search = () => {
  return (
    <div className='search'>
        <div className='searchForm'>
            <input type='text' className='searchInput' placeholder='Find a User' />
        </div>
        <div className='userChat'>
            <img src='https://via.placeholder.com/150' alt='user' className='userChatImg' />
            <div className='userChatInfo'>
                <span>Jan</span>
            </div>
        </div>
    </div>
  )
}
