import React, { useState } from 'react';

const ConversationList = ({ conversations, setActiveConversation }) => {
  return (
    <div className="flex flex-col w-1/4 border-r border-gray-200">
      <div className="px-4 py-2 border-b border-gray-200 bg-gray-100 flex items-center">
        <span className="text-lg font-semibold">Conversations</span>
        <span className="ml-auto text-gray-500 hover:text-gray-700">
          <i className="fas fa-pencil-alt"></i>
        </span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation, index) => (
          <div
            key={index}
            className="px-4 py-3 cursor-pointer hover:bg-gray-200"
            onClick={() => setActiveConversation(index)}
          >
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">{conversation.name}</div>
              <div className="text-sm text-gray-500">{conversation.lastMessageTime}</div>
            </div>
            <div className="text-gray-600 truncate">{conversation.lastMessage}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ConversationView = ({ conversation }) => {
  return (
    <div className="flex-1 border-r border-l border-gray-200 overflow-y-auto">
      <div className="px-4 py-2 border-b border-gray-200 bg-gray-100 flex items-center">
        <span className="text-lg font-semibold">{conversation.name}</span>
        <span className="ml-auto text-gray-500 hover:text-gray-700">
          <i className="fas fa-info-circle"></i>
        </span>
      </div>
      <div className="px-4 py-3">
        {conversation.messages.map((message, index) => (
          <div key={index} className="mb-2">
            <div className={`p-2 rounded-lg ${message.sender === 'Me' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-700'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-100  flex items-center">
        <input
          type="text"
          className="flex-1 mr-3 border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:border-blue-500"
          placeholder="Type a message..."
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
          Send
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [activeConversation, setActiveConversation] = useState(0);
  const [conversations, setConversations] = useState([
    {
      name: 'John Doe',
      lastMessage: 'Hello!',
      lastMessageTime: '10:30 AM',
      messages: [{ sender: 'John Doe', text: 'Hello!' }],
    },
    {
      name: 'Jane Smith',
      lastMessage: 'Hi there!',
      lastMessageTime: '11:00 AM',
      messages: [{ sender: 'Jane Smith', text: 'Hi there!' }],
    },
  ]);

  return (
    <div className="flex h-screen bg-white">
      <ConversationList conversations={conversations} setActiveConversation={setActiveConversation} />
      <ConversationView conversation={conversations[activeConversation]} />
    </div>
  );
};

export default App;
