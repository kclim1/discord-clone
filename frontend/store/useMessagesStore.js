import { create } from "zustand";

export const useMessagesStore = create((set) => ({
  messages: [], // Initial state for messages
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message],
  })),
}));