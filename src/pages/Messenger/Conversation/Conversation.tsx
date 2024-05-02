import React, { useEffect, useState } from 'react';
import './Conversation.css';
import Unknown from '../../../images/user/Unknown.png';
import axios from 'axios';
import { format } from 'timeago.js'; // Importez la fonction format de date-fns

interface ConversationProps {
  conversation: any;
  nowuser: any;
}

export default function Conversation({ conversation, nowuser }: ConversationProps) {
  const [userData, setUserData] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer l'ID de l'ami dans la conversation
        const friendId = conversation.members.find((m: any) => m !== nowuser._id);
        // Récupérer les données de l'utilisateur avec qui l'utilisateur parle
        const userRes = await axios.get(`http://192.168.33.10:3001/user/getUserById?userId=${friendId}`);
        setUserData(userRes.data);
        // Récupérer le dernier message de la conversation
        const messageRes = await axios.get(`http://192.168.33.10:3001/message/lastMessage/${conversation._id}`);
        if (messageRes.data) {
          setLastMessage(messageRes.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [conversation, nowuser]);

  // Fonction pour tronquer le message si sa longueur dépasse 20 caractères
  const truncateMessage = (message: string) => {
    return message.length > 20 ? `${message.slice(0, 20)}...` : message;
  };

  // Si userData est null, retournez null pour empêcher le rendu de la conversation
  if (!userData || !lastMessage) {
    return null;
  }

  return (
    <div className='conversation'>

      <img className='conversationImg' src={userData?.image || Unknown} alt="User" />

      <div>

        <span className='conversationName text-blackgray'>{userData?.username ?? 'Unknown'}</span>
        
        {lastMessage && (
          <p className='lastMessage'>
            {lastMessage.sender === nowuser._id ? "You: " : ""}
            {/* Utilisez la fonction truncateMessage pour afficher le message */}
            {truncateMessage(lastMessage.text)}
            {/* Ajoutez la date d'envoi du dernier message avant le texte du message */}
            <span className="messageDate display: flex" style={{ fontSize: 'small', color: 'darkgrey' }}>{format(new Date(lastMessage.createdAt), 'dd/MM/yyyy HH:mm')}</span>
          </p>
        )}

      </div>


    </div>
  );
}
