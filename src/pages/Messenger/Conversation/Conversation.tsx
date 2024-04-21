import React from 'react'
import'./Conversation.css';
import EspritCareer from '../../../images/logo/siteLogo.png'

export default function Conversation() {
  return (
    <div className='conversation'>
        <img className='conversationImg' src={EspritCareer} />
        <span className='conversationName'>hello</span>
    </div>
  )
}
