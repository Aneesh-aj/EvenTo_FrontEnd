import ChatArea from "./ChatBody"
import ChatList from "./ChatList"


import { socket } from '../../organizer/SeatBooking';
import { useEffect } from "react";

export const Chat = () => {

    useEffect(()=>{
        socket.on("connection",(data)=>console.log(data))
    },[])
    return (
        <>
            <div className="w-full  bg-gray-50 flex h-screen  ps-3 pe-3">
               
                <ChatList />
                <ChatArea socket={socket} />
            </div>
        </>
    )
}