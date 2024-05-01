import React, { createContext, useContext, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const ENDPOINT = 'http://localhost:3001';

type DefaultEventsMap = {
  [key: string]: (...args: any[]) => void;
};

const SocketContext = createContext<Socket<DefaultEventsMap, DefaultEventsMap> | undefined>(undefined);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  // Create a singleton socket instance using useRef
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  if (!socketRef.current) {
    // Create a new socket instance if it doesn't exist
    socketRef.current = io(ENDPOINT);
  }

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return socket;
};
