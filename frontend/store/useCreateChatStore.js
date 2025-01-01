import {create} from 'zustand'

export const useCreateChatStore = create((set) => ({
    isAddOnePersonOpen: false,
    openAddOnePerson: () => {
      set({ isAddOnePersonOpen: true });
    },
    closeAddOnePerson: () => {
      set({ isAddOnePersonOpen: false });
    },
  }));
  