import React, { useEffect, useState } from 'react';
import './ChatOnline.css';
import axios from 'axios';
import Unknown from '../../../images/user/Unknown.png';

export default function ChatOnline({ onLineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/user/getUsersByUserId/${currentId}`);
        setFriends(res.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    const updateMaxHeight = () => {
      const chatOnline = document.querySelector('.chatOnline');
      if (chatOnline) {
        const windowHeight = window.innerHeight;
        const chatOnlineHeight = chatOnline.getBoundingClientRect().height;
        const maxHeight = Math.min(windowHeight * 0.8, chatOnlineHeight); // 80% de la taille de la fenêtre ou la hauteur actuelle, selon la plus petite valeur
        chatOnline.style.maxHeight = `${maxHeight}px`;
      }
    };
/////////////////////////////////////////
    window.addEventListener('resize', updateMaxHeight);
    updateMaxHeight(); // Appeler la fonction de mise à jour initiale lors du premier rendu

    return () => {
      window.removeEventListener('resize', updateMaxHeight);
    };
  }, []);

  const handleClick = async (user: any) => {
    try {
      const res = await axios.get(`http://localhost:3001/conversation/find/${currentId}/${user._id}`);

      if (res.data) {
        setCurrentChat(res.data);
      } else {
        console.log('New conversation created');
        // Affichez un message indiquant que la nouvelle conversation a été créée
        // ou effectuez toute autre action appropriée
      }
    } catch (err) {
      console.error('Error fetching conversation:', err);
    }
  };


  return (
    <div className='chatOnline'>
      {friends.map(friend => (
        <div className='chatOnlineFriend' key={friend._id} onClick={() => handleClick(friend)}>
          <div className='chatOnlineImgContainer'>
            <img className='chatOnlineImg' src={friend.image || Unknown} alt="" />
            <div className='chatOnlineBadge'></div>
          </div>
          <span className="chatOnlineName">{friend.username ?? 'Unknown'}</span>
        </div>
      ))}
    </div>
  );
}
