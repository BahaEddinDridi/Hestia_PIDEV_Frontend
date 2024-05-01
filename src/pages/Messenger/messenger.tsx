import React, { useEffect, useRef, useState } from 'react';
import "./messenger.css";
import DefaultLayout from "../../layout/DefaultLayout";
import Conversation from './Conversation/Conversation';
import TopMessage from './TopMessage/TopMessage';
import ChatOnline from './ChatOnline/ChatOnline';
import { selectCurrentUser } from '../../ApiSlices/authSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { button } from '@material-tailwind/react';
import { io, Socket } from "socket.io-client";
import { getUsers } from '../api';
import { useSocket } from '../../SocketContext';


interface Message {
    _id: string;
    sender: string;
    // Autres propriétés des messages...
}
type DefaultEventsMap = {
    [key: string]: (...args: any[]) => void;
};

interface User {
    _id: string;
    username: string;
    email: string;
    role: string;
    birthDate: string;
    image: string;
    gender: string;
    phoneNumber: string;
    ProfileStatus: string;
    deactivationExpiresAt?: Date | null;
}
export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [onLineUsers, setOnLineUsers] = useState([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef<HTMLDivElement>(null); // Assurez-vous que le type est correct
    const [currentChat, setCurrentChat] = useState(null);
    const currentUser = useSelector(selectCurrentUser);
    const userId = currentUser ? currentUser._id : null;
    const socket = useSocket(); // Use useSocket hook to get the socket instance

    /////recherche
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState<User[]>([]);

    const filteredUsers = users.filter((user) =>
        Object.values(user).some((value) =>
            typeof value == 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();

    }, []);




    useEffect(() => {
        if (socket && userId) {
            console.log("Emitting addUser event...");
            socket.emit("addUser", userId, (response) => {
                console.log("addUser event emitted. Server response:", response);
            });
        }
    }, [socket, userId]);

    useEffect(() => {
        console.log("Socket:", socket);

        socket.on('getMessage', data => {
            console.log("New message received:", data);
            // Update messages state with the new message
            setMessages(prev => [...prev, data]);
        });
    }, [socket]);


    useEffect(() => {
        arrivalMessage && currentChat && currentChat.members && arrivalMessage.sender && currentChat.members.includes(arrivalMessage.sender) && setMessages(prev => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

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
            sender: userId,
            text: newMessage,
            ConversationId: currentChat._id
        };
        const receiverId = currentChat?.members.find(
            (member: any) => member !== userId
        );

        if (socket) {
            // Accédez à socket.current en toute sécurité ici
            socket.emit("sendMessage", {
                senderId: userId,
                receiverId,
                text: newMessage
            });
            console.log()
        }

        try {
            const res = await axios.post("http://localhost:3001/message", message);
            setMessages([...messages, res.data])
            setNewMessage("")
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages]);
    return (
        <DefaultLayout>
            <div className='messenger'>

                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input
                            placeholder='search for friends'
                            className='chatMenuInput'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} />

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
                                <div className="chatBoxTop">
                                    {messages.map((m) => (
                                      <div className="" key={m._id}>

                                          <TopMessage message={m} own={m.sender === userId}

                                          />
                                      </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                      className="chatMessageInput"
                                      placeholder='write something...'
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault(); // Empêche le saut de ligne
                                                sendMessage(); // Envoyer le message
                                            }
                                        }}
                                        value={newMessage}
                                    ></textarea>
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