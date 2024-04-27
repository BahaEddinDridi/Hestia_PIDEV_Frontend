import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatCard = () => {
    const [channelName, setChannelName] = useState('');
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    try {
      // Envoi de la requête au backend pour envoyer le message
      const response = await axios.post('http://localhost:3001/messagerie/api/messages', {
        channelName: channelName,
        message: message
      });
      // Affichage du message de succès
      alert(response.data);
    } catch (error) {
      // Gestion des erreurs
      console.error('Error sending message:', error);
      alert('Error sending message');
    }
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Chats
      </h4>

      <div>
        {chatData.map((chat, key) => (
          <Link
            to="/"
            className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            <div className="relative h-14 w-14 rounded-full">
              <img src={chat.avatar} alt="User" />
              <span
                className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white"
                style={{backgroundColor: chat.color}}
              ></span>
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white">
                  {chat.name}
                </h5>
                <p>
                  <span className="text-sm text-black dark:text-white">
                    {chat.text}
                  </span>
                  <span className="text-xs"> . {chat.time} min</span>
                </p>
              </div>
              {chat.textCount !== 0 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <span className="text-sm font-medium text-white">
                    {' '}
                    {chat.textCount}
                  </span>
                </div>
              )}
            </div>
          </Link>
        ))}
        
      </div>
      <input>Go to messenger</input>ppp
    </div>
  );
};

export default ChatCard;
