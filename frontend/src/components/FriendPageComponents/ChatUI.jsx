/* eslint-disable react/prop-types */
export const ChatUI = ({ chat, onClick }) => {
  return (
    <div
      className="flex items-center p-2 mb-2 mx-2 rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center w-full p-2 rounded-md hover:bg-gray-600">
        <img
          className="w-10 h-10 rounded-full mx-3"
          src={chat.serverPicture || '/avatar.png'}
          alt={`${chat.serverName}'s profile`}
        />
        <span className="text-white text-lg">{chat.serverName}</span>
      </div>
    </div>
  );
};
