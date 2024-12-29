/* eslint-disable react/prop-types */
export const Message = ({ message }) => {
    const { senderId, profilePic, username, text, createdAt } = message;
  
    return (
      <div className="message flex items-start mb-4">
        <img
          src={profilePic || "/avatar.png"}
          alt={`${username}'s profile`}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <div className="flex items-center">
            <span className="text-sm font-bold text-white">{username}</span>
            <span className="text-xs text-gray-400 ml-2">
              {new Date(createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <p className="text-sm text-white">{text}</p>
        </div>
      </div>
    );
  };
  