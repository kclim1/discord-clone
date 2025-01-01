import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useCreateChatStore } from "../store/useCreateChatStore";
import { vi } from 'vitest';


describe("useCreateChatStore", () => {
  beforeEach(() => {
    // Reset the Zustand state before each test
    act(() => {
      useCreateChatStore.setState({ isAddOnePersonOpen: false });
    });
  });

  it("should have an initial state of isAddOnePersonOpen set to false", () => {
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
      result.current.openAddOnePerson();
    });

    act(() => {
      result.current.closeAddOnePerson();
    });

    expect(result.current.isAddOnePersonOpen).toBe(false);
  });

  it("should log appropriate messages when opening and closing the modal", () => {
    const consoleLogMock = vi.spyOn(console, "log").mockImplementation(() => {});

    const { result } = renderHook(() => useCreateChatStore());

    act(() => {
      result.current.openAddOnePerson();
    });

    expect(consoleLogMock).toHaveBeenCalledWith("Opening AddOnePerson modal");

    act(() => {
      result.current.closeAddOnePerson();
    });

    expect(consoleLogMock).toHaveBeenCalledWith("Closing AddOnePerson modal");

    consoleLogMock.mockRestore(); // Restore console log after the test
  });
});
