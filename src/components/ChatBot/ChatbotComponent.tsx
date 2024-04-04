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
        <div className={`fixed ${expanded ? 'bottom-4 right-4' : 'bottom-8 right-8'}`} >
            {expanded ? (
                <div className="bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]">
                    {/* Chat Container */}
                    <div className="pr-4 h-[474px] overflow-y-auto">
                        {/* Chat Messages */}
                        {chatHistory.map((message, index) => (
                            <div key={index} className={`flex gap-3 my-4 text-gray-600 text-sm flex-1 ${message.role === 'system' ? 'justify-start' : 'justify-end'}`}>
                                <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                                    <div className="rounded-full bg-gray-100 border p-1">
                                        {message.role === 'system' ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" stroke="none" fill="black" strokeWidth="1.5"
                                                viewBox="0 0 24 24" aria-hidden="true" height="20" width="20">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" stroke="none" fill="black" strokeWidth="0"
                                                viewBox="0 0 16 16" height="20" width="20">
                                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                            </svg>
                                        )}
                                    </div>
                                </span>
                                <p className="leading-relaxed"><span className="block font-bold text-gray-700">{message.role === 'system' ? 'AI' : 'You'}</span>{message.content}</p>
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
