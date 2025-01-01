import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useProfileStore } from "../store/useProfileStore";

describe("useProfileStore", () => {
  beforeEach(() => {
    // Reset the Zustand state before each test
    act(() => {
      useProfileStore.setState({
        user: {
          username: "",
          profileId: "",
          email: "",
          profilePic: "",
        },
        loading: true,
      });
    });
  });

  it("should have an initial state", () => {
    const { result } = renderHook(() => useProfileStore());

    expect(result.current.user).toEqual({
      username: "",
      profileId: "",
      email: "",
      profilePic: "",
    });
    expect(result.current.loading).toBe(true);
  });

  it("should update the user with setUser", () => {
    const { result } = renderHook(() => useProfileStore());
    const newUserData = {
      username: "JohnDoe",
      profileId: "12345",
      email: "johndoe@example.com",
      profilePic: "profilePicUrl",
    };

    act(() => {
      result.current.setUser(newUserData);
    });

    expect(result.current.user).toEqual({
      username: "JohnDoe",
      profileId: "12345",
      email: "johndoe@example.com",
      profilePic: "profilePicUrl",
    });
  });

  it("should merge new user data with the existing user state", () => {
    const { result } = renderHook(() => useProfileStore());

    // Set initial user state
    act(() => {
      result.current.setUser({
        username: "InitialUser",
        email: "initial@example.com",
      });
    });

    // Update user with partial data
    act(() => {
      result.current.setUser({ profilePic: "newProfilePicUrl" });
    });

    expect(result.current.user).toEqual({
      username: "InitialUser",
      profileId: "",
      email: "initial@example.com",
      profilePic: "newProfilePicUrl",
    });
  });

  it("should update the loading state with setLoading", () => {
    const { result } = renderHook(() => useProfileStore());

    act(() => {
      result.current.setLoading(false);
    });

    expect(result.current.loading).toBe(false);

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.loading).toBe(true);
  });
});
