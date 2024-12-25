// import { useChatStore } from "../../../store/useChatStore";
// import { useEffect } from "react";
// import { useFriendListStore } from "../../store/useFriendListStore";


export const ChatUI = () => {
    
    // const {friendList} = useFriendListStore()

  return (
    <div>
      <div className="flex p-2 mx-4 rounded-lg  items-center space-x-4  hover:bg-gray-600 friends">
        <img
          src="/avatar.png"
          alt="Default Profile"
          className="w-10 h-10 rounded-full"
        />
        <p className="text-base">Usernameeee</p>
      </div>
    </div>
  );
};
