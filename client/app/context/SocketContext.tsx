"use client"
import { createContext, useContext, useEffect, ReactNode } from "react";
import socket from "../lib/socket";

const SocketContext = createContext(socket);

export const useSocket = () => {
  return useContext(SocketContext);
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    // socket.on("disconnect", () => {
    //   console.log("Socket disconnected");
    // });

    return () => {
      // socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
