import React, { useContext, useEffect, useRef, useState } from 'react';
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
import Unknown from '../../images/user/Unknown.png';
import { color } from 'framer-motion';
import { SocketContext } from '../../SocketContext';



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
    const currentUser = useSelector(selectCurrentUser);
    const socket = useContext(SocketContext); // Use useSocket hook to get the socket instance
    const userId = currentUser ? currentUser._id : null;


    useEffect(() => {
        socket.on("getMessage", data => {
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
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [userAccountVisibility, setUserAccountVisibility] = useState('');
    const [userLocatin, setUserLocation] = useState('');
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
                        const userEmail = res.data.email;
                        const userRole = res.data.role;
                        const userPhoneNumber = res.data.phoneNumber;
                        const userAccountVisibility = res.data.accountVisibility;
                        const userLocation = res.data.location;
                        // Mettre à jour l'état avec le nom d'utilisateur
                        setUsername(username);
                        setUserImage(userImage);
                        setUserEmail(userEmail);
                        setUserRole(userRole);
                        setUserPhoneNumber(userPhoneNumber);
                        setUserAccountVisibility(userAccountVisibility);
                        setUserLocation(userLocation);
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


    /////////////////////// Modal info ///////////////////////////
    const [showFriendInfo, setShowFriendInfo] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const toggleModal = () => {
        setShowFriendInfo(!showFriendInfo);
    };

    const closeModalOutsideClick = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            setShowFriendInfo(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", closeModalOutsideClick);

        return () => {
            document.removeEventListener("mousedown", closeModalOutsideClick);
        };
    }, []);

    return (
        <DefaultLayout>
            {showFriendInfo && (
                <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-opacity-50 backdrop-filter backdrop-blur-sm ${showFriendInfo ? 'bg-gray-300' : ''}`}>
                    <div ref={modalRef} className=" modalInfo bg-white border-black p-6 rounded-lg">
                        <div className='ml-70'>
                            <span className='text-black-2 cursor-pointer' onClick={toggleModal}>X</span>
                        </div>
                        <div className="flex items-center mb-8">
                            {userImage ? (
                                <img src={userImage} className="modalUserImg" alt="User" />
                            ) : (
                                <img src={Unknown} className="modalUserImg" alt="Unknown User" />
                            )}
                            {username && <span className="text-2xl ml-3 font-bold text-black-2">{username}</span>}
                        </div>
                        <div className="flex items-center">
                            <p className="mr-2 m-3 font-semibold text-blackgray">Role :</p>
                            {userRole && <span className="">{userRole}</span>}
                        </div>
                        <div className="flex items-center">
                            <p className="mr-2 m-3 font-semibold text-blackgray">Location :</p>
                            {userLocatin && <span className="">{userLocatin}</span>}
                        </div>
                        <div className="flex items-center">
                            <p className="mr-2 m-3 font-semibold text-blackgray">Email :</p>
                            {userEmail && <span className="">{userEmail}</span>}
                        </div>
                        <div className="flex items-center">
                            <p className="mr-2 m-3 font-semibold text-blackgray">Phone Number :</p>
                            {userPhoneNumber && <span className="">+ {userPhoneNumber}</span>}
                        </div>
                        <div className="flex items-center">
                            <p className="mr-2 m-3 font-semibold text-blackgray">Account Visibility :</p>
                            {userAccountVisibility && <span className="">{userAccountVisibility}</span>}
                        </div>
                    </div>
                </div>
            )}
            <div className='messenger rounded-lg dark:bg-black'>

                <div className="chatMenu">
                    <nav className='navbarConversation my-3'>
                        <div className='flex items-center justify-center'>
                            <h1 className="text-black font-bold text-2xl">Conversations</h1>
                        </div>
                    </nav>
                    <hr className='text-black-2'></hr>
                    <div className="chatMenuWrapper">
                        {conversations.map((c) => (

                            // Correction : Ajout d'une clé 'key' pour chaque élément de la liste
                            <div key={c._id} onClick={() => setCurrentChat(c)}>
                                <Conversation conversation={c} nowuser={currentUser} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="chatBox shadow-lg shadow-black rounded-md">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <nav className='navbarChat'>
                                    <div className='flex items-center justify-between m-2'>
                                        <div className='flex items-center'>
                                            {userImage ? (
                                                <img src={userImage} className="otherUserImage" alt="User" />
                                            ) : (
                                                <img src={Unknown} className="otherUserImage" alt="Unknown User" />
                                            )}
                                            {username && <span className="otherUsername">{username}</span>}
                                        </div>
                                        <div className="moreInfo ml-4">
                                            <svg className="w-6 h-6 text-white dark:text-white" onClick={toggleModal} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </div>
                                    </div>
                                </nav>

                                <div className="container">

                                    <div className="chatBoxTop" ref={messagesContainerRef}>
                                        {/* Affichez les messages ici */}
                                        {messages.map((m) => (
                                            <div className='' key={m._id}>

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
                                        className=" shadow-xl shadow-black-2 flex items-center bg-esprit text-white gap-1 px-4 py-2 cursor-pointer text-gray-800 font-semibold tracking-widest rounded-xl hover:bg-esprit duration-300 "
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

                <div className="chatOnline ml-5">
                   
                        <nav className='navbarConversation my-3'>
                            <div className='flex items-center justify-center'>
                                <h1 className="text-black font-bold text-2xl">Esprit Career Users</h1>
                            </div>
                        </nav>
                        <hr className='text-black-2 '></hr>
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