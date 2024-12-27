import { create } from "zustand";
import { io } from "socket.io-client";

export const useSocketStore = create((set) => ({
  socket: null, //null because initially connection isnt established yet

  connectSocket: () => {
    const socket = io("http://localhost:3000"); // Replace with your backend URL
    set({ socket });
  },

  disconnectSocket: () => {
    const { socket } = useSocketStore.getState();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
