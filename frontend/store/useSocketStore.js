import { create } from "zustand";
import { io } from "socket.io-client";

export const useSocketStore = create((set) => {
  let socket = null;

  const connectSocket = () => {
    if (socket) {
      return;
    }

    console.log("Connecting to Socket.IO server...");
    socket = io("http://localhost:3000", {
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log(`Connected to Socket.IO server: ${socket.id}`);
      set({ isConnected: true });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
      set({ isConnected: false });
    });

    set({ socket });
  };

  const registerSocket = (profileId) => {
    if (socket && socket.connected) {
      console.log(`Registering profileId: ${profileId} with socket.`);
      socket.emit("register", profileId);
    } else {
      console.warn("Socket is not connected. Unable to register.");
    }
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      console.log("Socket disconnected.");
      set({ isConnected: false, socket: null });
      socket = null;
    } else {
      console.warn("No active socket to disconnect.");
    }
  };

  const addSocketHandler = (event, handler) => {
    if (!socket) {
      console.warn("Socket is not connected. Unable to add handler.");
      return;
    }
    socket.off(event, handler); // Ensure no duplicate listeners
    socket.on(event, handler);
    console.log(`Handler added for event: ${event}`);
  };

  const removeSocketHandler = (event, handler) => {
    if (!socket) {
      console.warn("Socket is not connected. Unable to remove handler.");
      return;
    }
    socket.off(event, handler);
    console.log(`Handler removed for event: ${event}`);
  };

  return {
    isConnected: false,
    connectSocket,
    disconnectSocket,
    registerSocket,
    addSocketHandler,
    removeSocketHandler,
  };
});