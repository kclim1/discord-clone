import { create } from "zustand";

export const useMessagesStore = create((set) => ({
  messages: [], // Initial state for messages as an array
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  clearMessages: () =>
    set(() => ({
      messages: [], // Clears the entire message list
    })),
}));
