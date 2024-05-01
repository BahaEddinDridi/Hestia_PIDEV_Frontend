import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from "socket.io-client";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../ApiSlices/authSlice';
import { initializeSocket } from '../../SocketService';
import { useSocket } from '../../SocketContext';

const ENDPOINT = 'http://localhost:3001';

type DefaultEventsMap = {
  [key: string]: (...args: any[]) => void;
};
function NotificationComponent() {
  const [notification, setNotification] = useState([]);
  const [popoverOpen, setPopoverOpen] = useState(false); // State to track popover open/close
  const currentUser = useSelector(selectCurrentUser);
  const [onLineUsers, setOnLineUsers] = useState([]);
  const userId = currentUser ? currentUser._id : null;
  const socket = useSocket(); // Use useSocket hook to get the socket instance

  useEffect(() => {
    if (socket && userId) {
      socket.on('newNotification', (data) => {
        console.log("New notification received:", data);
        setNotification(data.notification);
        setPopoverOpen(true);
        setTimeout(() => {
          setPopoverOpen(false);
        }, 5000);
      });

      console.log("Emitting addUser event...");
      socket.emit("addUser", userId, (response) => {
        console.log("addUser event emitted. Server response:", response);
      });

    }
  }, [socket, userId]);

  const handleClosePopover = () => {
    setPopoverOpen(false); // Close the popover
  };

  return (
    popoverOpen &&( // Render popover only when open
      <div className="fixed bottom-10 left-0 z-50 overflow-hidden">
        <div id="alert-border-1"
             className="flex items-center p-4 mb-4 text-blue-800 border-t-4 border-blue-300 bg-white dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800"
             role="alert">
          <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
               viewBox="0 0 20 20">
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div className="ms-3 text-sm font-medium">
            {notification.message}
          </div>
          <button type="button" onClick={handleClosePopover} // Add onClick handler to close button
                  className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                  aria-label="Close">
            <span className="sr-only">Dismiss</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>
      </div>
    )
  );
}

export default NotificationComponent;
