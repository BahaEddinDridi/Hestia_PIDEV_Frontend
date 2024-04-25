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
    <div>
      <h2>Messenger</h2>
      <label>
        Channel Name:
        <input type="text" value={channelName} onChange={(e) => setChannelName(e.target.value)} />
      </label>
      <br />
      <label>
        Message:
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      <br />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default ChatCard;
