import React from 'react'
import './ChatOnline.css'
import EspritCareer from '../../../images/logo/siteLogo.png'

export default function ChatOnline() {
  return (
    <div className='chatOnline'>
        <div className='chatOnlineFriend'>
            <div className='chatOnlineImgContainer'>
                <img className='chatOnlineImg' src={EspritCareer} alt=""/>
                <div className='chatOnlineBadge'></div>
            </div>
            <span className="chatOnlineName">john doe</span>
        </div>

    </div>
  )
}
