import React, { useState } from 'react'
import { selectCurrentUser } from '../../../ApiSlices/authSlice';
import './TopMessage.css'
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';

interface TopMessageProps {
  own: boolean; // Spécifiez le type de la prop "own" ici
  message: any;
}


const TopMessage: React.FC<TopMessageProps> = ({ message, own }) => {

  const currentUser = useSelector(selectCurrentUser);
  const createdAtString = message.createdAt.toString();

  // Fonction pour insérer un retour à la ligne après chaque tranche de 40 caractères
  const insertLineBreaks = (text: string) => {
    const maxLength = 50;
    const regex = new RegExp(`.{1,${maxLength}}`, 'g');
    return text.match(regex)?.join('\n') || text;
  };

  return (
    <div className={own ? "message own" : "message"}>
      
      <div className="messageTop">
        <p className='messageText'>
          {insertLineBreaks(message.text)}
        </p>
      </div>
      <div className="messageButtom">
        {format(createdAtString)} {/* Utiliser la chaîne de caractères dans timeago.js */}
      </div>
    </div>
  );
};

export default TopMessage;