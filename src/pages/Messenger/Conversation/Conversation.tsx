import React, { useEffect, useState } from 'react'
import'./Conversation.css';
import Unknown from '../../../images/user/Unknown.png'

import axios from 'axios';


interface ConversationProps {
  conversation: any; // Remplacez `any` par le type réel de conversation si possible
  nowuser: any; // Remplacez `any` par le type réel de nowuser si possible
}
export default function Conversation({ conversation, nowuser }: ConversationProps) {
  const[user,setUser] = useState(null)



  useEffect(()=> {
    const friendId = conversation.members.find((m: any)=>m !== nowuser._id)

    const getUser = async ()=>{
      try{
        const res = await axios.get("http://localhost:3001/user/getUserById?userId="+friendId)
        setUser(res.data)
        console.log(res)
      }catch(err){
        console.log(err);
      }
    };
    getUser()
  }, [conversation,nowuser]);

  return (
    <div className='conversation'>
        <img className='conversationImg' src={user?.image || Unknown} alt="User" />
        <span className='conversationName'>{user?.username ?? 'Unknown'}</span>
    </div>
  )
}

