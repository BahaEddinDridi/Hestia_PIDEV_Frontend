import { useState } from 'react';
import { selectCurrentUser } from '../../ApiSlices/authSlice';
import { useSelector } from 'react-redux';
const ChatbotComponent = () => {
    const storedUser=useSelector(selectCurrentUser);
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userInput.trim()) return;

        // Add user message to chat history
        setChatHistory(prevChatHistory => [...prevChatHistory, { role: "user", content: userInput }]);
        setUserInput('');
        const userId = storedUser._id;
        console.log(userId);
        // Make API call to send user input and receive AI response
        try {
            const response = await fetch(`http://localhost:3001/gptchatbot/AddGptchatbot/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userInput })
            });
            const data = await response.json();

            // Add AI response to chat history
            setChatHistory(prevChatHistory => [...prevChatHistory, { role: "system", content: data.response }]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    return (
    <div className={`fixed ${expanded ? 'z-40 bottom-4 left-4' : 'bottom-8 left-8'}`}>
        {expanded ? (
            <div className="bg-white p-4 rounded-lg border border-[#e5e7eb] w-[380px] h-[564px]">
                {/* Chat Container */}
                <div className="pr-4 h-[474px] overflow-y-auto">
                    {/* Chat Messages */}
                    {chatHistory.map((message, index) => (
                        <div key={index} className={`flex gap-3 my-4 text-gray-600 text-sm flex-1 ${message.role === 'system' ? 'justify-start' : 'justify-end'}`}>
                            {message.role === 'user' && storedUser.image && (
                                <img src={storedUser.image} alt="User" className="rounded-full w-8 h-8" />
                            )}
                            <p className="leading-relaxed">
                                <span className="block font-bold text-gray-700">
                                    {message.role === 'system' ? 'Mr. Blue' : 'You'}
                                </span>
                                {message.content}
                            </p>
                        </div>
                    ))}
                </div>
                {/* Input box  */}
                <div className="flex items-center pt-0">
                    <form onSubmit={handleSubmit} className="flex items-center justify-center w-full space-x-2">
                        <input
                            id="user-input"
                            className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                            placeholder="Type your message"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-red-600 hover:bg-red-800 h-10 px-4 py-2"
                        >
                            Send
                        </button>
                    </form>
                </div>
                {/* Close button */}
                <button onClick={toggleExpansion} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.293 10l3.646-3.646a1 1 0 1 0-1.414-1.414L10 8.586 6.354 4.939a1 1 0 1 0-1.414 1.414L8.586 10l-3.646 3.646a1 1 0 1 0 1.414 1.414L10 11.414l3.646 3.646a1 1 0 1 0 1.414-1.414L11.414 10z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        ) : (
            <button onClick={toggleExpansion} className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white block border-gray-200 align-middle">
                    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                </svg>
            </button>
        )}
    </div>
);

};

export default ChatbotComponent;
