import { create } from "zustand";
import { io } from "socket.io-client";

export const useSocketStore = create((set) => {
  let socket = null;

  const connectSocket = () => {
    console.log("Attempting to connect to Socket.IO server...");

    if (socket) {
      console.warn("Socket is already connected.");
      return;
    }

    socket = io("http://localhost:3000", {
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log(`Connected to Socket.IO server: ${socket.id}`);
      set({ isConnected: true });
    });

    socket.on("disconnect", () => {
      console.log(`Disconnected from Socket.IO server`);
      set({ isConnected: false });
    });

    set({ socket });
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      console.log("Socket disconnected.");
      set({ isConnected: false, socket: null });
      socket = null;
    }
  };

  return {
    socket: null, // Initialize socket as null
    isConnected: false, // Properly initialize isConnected
    connectSocket, // Expose connectSocket function
    disconnectSocket, // Expose disconnectSocket function
  };
});
