import { act, renderHook } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useFriendListStore } from "../store/useFriendListStore"; // Adjust path as needed

describe("useFriendListStore", () => {
  beforeEach(() => {
    // Reset the store state before each test
    act(() => {
      useFriendListStore.setState({ friendList: [] });
    });
  });

  it("should set the friend list correctly", () => {
    const { result } = renderHook(() => useFriendListStore());
    const mockFriends = [
      { id: 1, username: "Friend 1", profilePic: "pic1.jpg" },
      { id: 2, username: "Friend 2", profilePic: "pic2.jpg" },
    ];

    act(() => {
      result.current.setFriendList(mockFriends);
    });

    expect(result.current.friendList).toEqual(mockFriends);
  });

  it("should initialize with an empty friend list", () => {
    const { result } = renderHook(() => useFriendListStore());
    expect(result.current.friendList).toEqual([]);
  });
});
