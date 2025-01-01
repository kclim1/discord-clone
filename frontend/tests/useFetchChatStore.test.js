import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useFetchChatStore } from "../store/useFetchChatStore"; // Adjust the path as necessary

describe("useFetchChatStore", () => {
  beforeEach(() => {
    // Reset the Zustand store before each test
    act(() => {
      useFetchChatStore.setState({ chats: [] });
    });
  });

  it("should initialize with an empty chats array", () => {
    const { result } = renderHook(() => useFetchChatStore());

    expect(result.current.chats).toEqual([]);
  });

  it("should set chats with setChats", () => {
    const { result } = renderHook(() => useFetchChatStore());

    const mockChats = [
      { chatId: "1", participants: ["user1", "user2"] },
      { chatId: "2", participants: ["user1", "user3"] },
    ];

    act(() => {
      result.current.setChats(mockChats);
    });

    expect(result.current.chats).toEqual(mockChats);
  });

  it("should add a new chat with addChat", () => {
    const { result } = renderHook(() => useFetchChatStore());

    const initialChats = [
      { chatId: "1", participants: ["user1", "user2"] },
    ];
    const newChat = { chatId: "2", participants: ["user1", "user3"] };

    act(() => {
      result.current.setChats(initialChats);
    });

    act(() => {
      result.current.addChat(newChat);
    });

    expect(result.current.chats).toEqual([...initialChats, newChat]);
  });
});
