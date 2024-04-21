import React from 'react'
import { selectCurrentUser } from '../../../ApiSlices/authSlice';
import './TopMessage.css'
import { useSelector } from 'react-redux';


interface TopMessageProps {
    own: boolean; // Spécifiez le type de la prop "own" ici
  }
  const TopMessage: React.FC<TopMessageProps> = ({own}) => {
    const currentUser = useSelector(selectCurrentUser);
    return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
      <img className='messageImg' src={currentUser.image} />
      <p className='messageText'>Lorem, ipsum dolor sit amet alias quam eos dicta magnam vero earum fugit ipsa, distinctio officia. Eaque optio consequatur omnis distinctio!</p>
      </div>
      <div className="messageButtom">
        1 hour ago
      </div>
    </div>
  );
};
export default TopMessage;
