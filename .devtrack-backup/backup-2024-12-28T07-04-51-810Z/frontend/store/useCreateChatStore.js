import {create} from 'zustand'

export const useCreateChatStore = create((set) => ({
    isAddOnePersonOpen: false,
    openAddOnePerson: () => {
      console.log("Opening AddOnePerson modal");
      set({ isAddOnePersonOpen: true });
    },
    closeAddOnePerson: () => {
      console.log("Closing AddOnePerson modal");
      set({ isAddOnePersonOpen: false });
    },
  }));
  