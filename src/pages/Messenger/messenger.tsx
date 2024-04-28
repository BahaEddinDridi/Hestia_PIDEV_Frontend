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


    const handleEmoji = (newMessage: any) => {
        setNewMessage(newMessage)
    }

    return (
        <DefaultLayout>
            <div className='messenger'>

                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input
                            placeholder='search for friends'
                            className='chatMenuInput' />

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
                        <nav>
                            <img src='' className='' />
                        </nav>
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop" ref={messagesContainerRef}>
                                    {/* Affichez les messages ici */}
                                    {messages.map((m) => (
                                        <div className='mt-10' key={m._id}>
                                            <TopMessage message={m} own={m.sender === currentUser._id} />
                                        </div>
                                    ))}
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
                                        className='chatSubmitButton'
                                        onClick={sendMessage}> {/* Utilisez la fonction sendMessage ici */}
                                        Send
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