import ChatArea from "./ChatBody"
import ChatList from "./ChatList"



export const Chat = () => {
    return (
        <>
            <div className="w-full  bg-gray-50 flex h-screen  ps-3 pe-3">
               
                <ChatList />
                <ChatArea />
            </div>
        </>
    )
}