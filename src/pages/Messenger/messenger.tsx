import React, { useEffect, useRef, useState } from 'react';
import "./messenger.css";
import DefaultLayout from "../../layout/DefaultLayout";
import Conversation from './Conversation/Conversation';
import TopMessage from './TopMessage/TopMessage';
import ChatOnline from './ChatOnline/ChatOnline';
import { selectCurrentUser } from '../../ApiSlices/authSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { button, navbar } from '@material-tailwind/react';
import { io, Socket } from "socket.io-client";
import InputEmoji from "react-input-emoji";



interface Message {
    _id: string;
    sender: string;
    // Autres propriétés des messages...
}
type DefaultEventsMap = {
    [key: string]: (...args: any[]) => void;
};



export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [onLineUsers, setOnLineUsers] = useState([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef<HTMLDivElement>(null); // Assurez-vous que le type est correct
    const [currentChat, setCurrentChat] = useState(null);
    const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | undefined>(undefined);
    const currentUser = useSelector(selectCurrentUser);


    useEffect(() => {
        socket.current = io("ws://localhost:3001")
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now
            })
        })
    }, []);

    useEffect(() => {
        arrivalMessage && currentChat && currentChat.members && arrivalMessage.sender && currentChat.members.includes(arrivalMessage.sender) && setMessages(prev => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);


    useEffect(() => {
        if (socket.current) {
            socket.current.emit("addUser", currentUser._id);
            socket.current.on("getUsers", users => {
                setOnLineUsers(users);
            });
        }
    }, [currentUser]);


    console.log(socket)


    useEffect(() => {
        // Correction : Ajout d'une clé 'key' pour chaque élément de la liste
        const getConversation = async () => {
            try {
                const res = await axios.get("http://localhost:3001/conversation/" + currentUser._id);
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversation();
    }, [currentUser._id]);

    useEffect(() => {
        // Correction : Ajout d'une vérification pour éviter une erreur si currentChat est null
        const getMessages = async () => {
            try {
                if (currentChat) {
                    const res = await axios.get("http://localhost:3001/message/" + currentChat._id);
                    setMessages(res.data);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);



    const sendMessage = async () => {
        if (newMessage.trim() === "") return; // Vérifiez que le message n'est pas vide

        const message = {
            sender: currentUser._id,
            text: newMessage,
            ConversationId: currentChat._id
        };
        const receiverId = currentChat?.members.find(
            (member: any) => member !== currentUser._id
        );

        if (socket.current) {
            // Accédez à socket.current en toute sécurité ici
            socket.current.emit("sendMessage", {
                senderId: currentUser._id,
                receiverId,
                text: newMessage
            });
        }
        try {
            const res = await axios.post("http://localhost:3001/message", message);
            setMessages([...messages, res.data])
            setNewMessage("")
        } catch (err) {
            console.log(err)
        }
    }



    const messagesContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // Défilez vers le bas lorsque les messages changent
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const [username, setUsername] = useState('');
    const [userImage, setUserImage] = useState('');
    useEffect(() => {
        const getUsernameForChat = async () => {
            try {
                if (currentChat) {
                    const otherUserId = currentChat.members[1];
                    const res = await axios.get("http://localhost:3001/user/getOneUserById/" + otherUserId);

                    // Vérifier si la requête a réussi
                    if (res.status === 200) {
                        // Extraire le nom d'utilisateur de la réponse
                        const username = res.data.username;
                        const userImage = res.data.image;
                        setUsername(username); // Mettre à jour l'état avec le nom d'utilisateur
                        setUserImage(userImage);
                    } else {
                        console.error("La requête a échoué.");
                    }
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du nom d'utilisateur :", error);
            }
        };

        getUsernameForChat();
    }, [currentChat]);


    return (
        <DefaultLayout>
            <div className='messenger rounded-lg dark:bg-black'>

                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        {conversations.map((c) => (

                            // Correction : Ajout d'une clé 'key' pour chaque élément de la liste
                            <div key={c._id} onClick={() => setCurrentChat(c)}>
                                <Conversation conversation={c} nowuser={currentUser} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">

                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                            <nav className='navbarChat'>
                                        <div className='otheruser'>
                                            {userImage && <img src={userImage} className="otherUserImage" />}
                                            {username && <span className="otherUsername">{username}</span>}
                                        </div>
                                    </nav>

                                <div className="container">
                                    
                                    <div className="chatBoxTop" ref={messagesContainerRef}>
                                        {/* Affichez les messages ici */}
                                        {messages.map((m) => (
                                            <div className='mt-10' key={m._id}>

                                                <TopMessage message={m} own={m.sender === currentUser._id}
                                                
                                                />
                                            </div>

                                        ))}
                                    </div>
                                </div>

                                <div className="chatBoxBottom">
                                    {/* <textarea
                                        className='chatMessageInput '
                                        placeholder='write something...'
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault(); // Empêche le saut de ligne
                                                sendMessage(); // Envoyer le message
                                            }
                                        }}
                                        value={newMessage}
                                    ></textarea> */}


                                    <div className='input-emoji'>
                                        <InputEmoji
                                            onChange={(newMessage) => setNewMessage(newMessage)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault(); // Empêche le saut de ligne
                                                    sendMessage(); // Envoyer le message
                                                }
                                            }}
                                            value={newMessage}
                                            shouldReturn={false}
                                            shouldConvertEmojiToImage={false}

                                        />

                                    </div>
                                    <button
                                        className="flex items-center bg-esprit text-white gap-1 px-4 py-2 cursor-pointer text-gray-800 font-semibold tracking-widest rounded-xl hover:bg-esprit duration-300 hover:gap-2 hover:translate-x-2"
                                        onClick={sendMessage}>
                                        Send
                                        <svg
                                            className="w-5 h-5"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                                                stroke-linejoin="round"
                                                stroke-linecap="round"
                                            ></path>
                                        </svg>
                                    </button>


                                </div>


                            </>
                        ) : (
                            <span className='noConversationText'>Open a new conversation to start a chat.</span>
                        )}
                    </div>
                </div>

                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline
                            onLineUsers={onLineUsers}
                            currentId={currentUser._id}
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>

            </div>
        </DefaultLayout >
    );
}