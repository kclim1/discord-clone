import { useMessagesStore } from "../store/useMessagesStore"; // Adjust the import path as necessary
import { act, renderHook } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";

describe("useMessagesStore", () => {
  beforeEach(() => {
    // Reset the store state before each test
    act(() => {
      useMessagesStore.setState({ messages: [] });
    });
  });

  it("should add a message to the store", () => {
    const { result } = renderHook(() => useMessagesStore());
    const newMessage = { id: 1, text: "Hello, world!" };

    act(() => {
      result.current.addMessage(newMessage);
    });

    expect(result.current.messages).toEqual([newMessage]);
  });

  it("should replace the entire message array with setMessages", () => {
    const { result } = renderHook(() => useMessagesStore());
    const newMessages = [
      { id: 1, text: "Message 1" },
      { id: 2, text: "Message 2" },
    ];

    act(() => {
      result.current.setMessages(newMessages);
    });

    expect(result.current.messages).toEqual(newMessages);
  });

  it("should clear all messages with clearMessages", () => {
    const { result } = renderHook(() => useMessagesStore());
    const initialMessages = [
      { id: 1, text: "Message 1" },
      { id: 2, text: "Message 2" },
    ];

    act(() => {
      result.current.setMessages(initialMessages);
    });

    act(() => {
      result.current.clearMessages();
    });

    expect(result.current.messages).toEqual([]);
  });
});
