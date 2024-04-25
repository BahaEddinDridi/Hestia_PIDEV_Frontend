import React from 'react'
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
  
  return (
    
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className='messageImg' src={currentUser.image} alt="User" />
        <p className='messageText'>
          {message.text}
        </p>
      </div>
      <div className="messageButtom">
        {format(createdAtString)} {/* Utiliser la chaîne de caractères dans timeago.js */}
      </div>
    </div>
  );
};
export default TopMessage;
