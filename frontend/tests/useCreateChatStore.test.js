import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useCreateChatStore } from "../store/useCreateChatStore";

describe("useCreateChatStore", () => {
  beforeEach(() => {
    // Reset Zustand state before each test
    act(() => {
      useCreateChatStore.setState({ isAddOnePersonOpen: false });
    });
  });

  it("should initialize isAddOnePersonOpen to false", () => {
    const { result } = renderHook(() => useCreateChatStore());
    expect(result.current.isAddOnePersonOpen).toBe(false);
  });

  it("should set isAddOnePersonOpen to true when openAddOnePerson is called", () => {
    const { result } = renderHook(() => useCreateChatStore());

    act(() => {
      result.current.openAddOnePerson();
    });

    expect(result.current.isAddOnePersonOpen).toBe(true);
  });

  it("should set isAddOnePersonOpen to false when closeAddOnePerson is called", () => {
    const { result } = renderHook(() => useCreateChatStore());

    act(() => {
      result.current.openAddOnePerson(); // Open the modal
    });

    act(() => {
      result.current.closeAddOnePerson(); // Close the modal
    });

    expect(result.current.isAddOnePersonOpen).toBe(false);
  });
});

