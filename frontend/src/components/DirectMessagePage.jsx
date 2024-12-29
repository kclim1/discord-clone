import { InputWithEmoji } from "../components/InputWithEmoji";
import { ChatContainer } from "./ChatContainer";

export const DirectMessagePage = () => {
  
  return (
    <div className="w-full flex flex-col">
     
      <ChatContainer  />
      <InputWithEmoji  />
    </div>
  );
};