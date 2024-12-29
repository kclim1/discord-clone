import { create } from "zustand";

export const useMessagesStore = create((set) => ({
  messages: [], // Initial state for messages as an array

  // Add a single message to the existing array
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  // Replace the entire array with new messages
  setMessages: (newMessages) =>
    set(() => ({
      messages: newMessages, // Replace the current state
    })),

  // Clear all messages
  clearMessages: () =>
    set(() => ({
      messages: [], // Clears the entire message list
    })),
}));
