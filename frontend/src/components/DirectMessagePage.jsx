import { InputWithEmoji } from "../components/InputWithEmoji";
import { ChatContainer } from "./ChatContainer";
import { useMessagesStore } from "../../store/useMessagesStore";

export const DirectMessagePage = () => {
  const messages = useMessagesStore((state) => state.messages); // Get messages from the store
  const addMessage = useMessagesStore((state) => state.addMessage); // Get addMessage action from the store

  return (
    <div className="w-full flex flex-col">
      <h1>This is direct message page</h1>
      <ChatContainer messages={messages} />
      <InputWithEmoji onSendMessage={addMessage} />
    </div>
  );
};