import {create} from 'zustand'

export const useFriendListStore = create((set)=>({
    friendList : [] ,
    setFriendList : (friends) => set({friendList : friends})
}))

//can use this as the friend list for the droplist 