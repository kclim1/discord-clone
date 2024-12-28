import { create } from 'zustand'

export const useUserStore = create((set)=>({
    isOnline : false , 
    setOnline : ()=> set({isOnline : true }),
    setOffline : ()=> set({isOnline:false})
}))