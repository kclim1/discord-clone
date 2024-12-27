// NewDirectMessage.jsx
import { AddOnePerson } from "./FriendPageComponents/AddOnePerson";
import { useCreateChatStore } from "../../store/useCreateChatStore";

export const NewDirectMessage = () => {
  const { isAddOnePersonOpen, openAddOnePerson } = useCreateChatStore();

  return (
    <div
      onClick={openAddOnePerson}
      className="flex justify-between p-2 mx-4 mt-4 text-lg hover:bg-gray-600 rounded-lg cursor-pointer"
    >
      <div>NewMessage</div>
      <div>+</div>

      {isAddOnePersonOpen && (
        
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#2f3136] p-6 rounded-lg shadow-lg w-[600px]">
            <AddOnePerson />
          </div>
        </div>
      )}
    </div>
  );
};
