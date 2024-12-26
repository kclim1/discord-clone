import { InputWithEmoji } from "../components/InputWithEmoji"
import { ChatContainer } from "./ChatContainer"


export const DirectMessagePage = ()=>{

    return(
        <div className=" w-full flex flex-col ">
           <h1> this is direct message page </h1>
            <ChatContainer/>
            <InputWithEmoji/>
        </div>
    )
}
