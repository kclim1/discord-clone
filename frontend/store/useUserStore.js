import {create} from "zustand";

export const useUserStore = create((set) => ({
  isAuthenticated: false,
  profileId: null,
  setUser: ({ profileId, isAuthenticated }) =>
    set({ profileId, isAuthenticated }),
}));
