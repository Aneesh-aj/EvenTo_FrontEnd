import useGetUser from "../../hook/useGetUser"
import bg from "../../assets/bunch-flowers-leaves-table.jpg"
import EventIcon from '@mui/icons-material/Event';
import Divider from '@mui/material/Divider';
import MessageIcon from '@mui/icons-material/Message';
import BookIcon from '@mui/icons-material/Book';
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";


export const SideBar=()=>{
    const currentUser = useGetUser()
    const navigate = useNavigate()

    return(
        <div className="w-2/12 h-fit mt-9 flex gap-2 flex-col">
        <Card className="-lg h-[11rem] bg-white  ">
            <div className="w-full pt-5 h-4/6 p-3 flex justify-center">
                <div style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: "center" }} className="rounded-full bg-green-500 w-[40%] ">

                </div>
            </div>
            <div className="w-full flex justify-center">
                <span className="  p-0 font-bold">{currentUser.name}</span>
            </div>
        </Card>
        <Card className="w-full h-fit  bg-white  ">
            <ul className="flex flex-col gap-3  ">
                <li className="flex h-[5rem] " onClick={(e)=>navigate("/user/events")}>
                    <div className="w-6/12 h-full flex items-center justify-center">
                        <EventIcon />
                    </div>
                    <div className="w-6//12 h-full flex items-center">
                        Events
                    </div>
                </li>
                <Divider variant="middle" />
                <li className="flex h-[5rem] " onClick={(e)=>{navigate("/user/message")}} >
                    <div className="w-6/12 h-full flex items-center justify-center">
                        <MessageIcon />
                    </div>
                    <div className="w-6//12 h-full flex items-center">
                        message
                    </div>
                </li>
                <Divider variant="middle" />
                <li className="flex  h-[5rem]" onClick={(e)=>{navigate("/user/Booking")}}>
                    <div className="w-6/12 h-full flex items-center justify-center">
                        <BookIcon />
                    </div>
                    <div className="w-6//12 h-full flex items-center">
                        Bookings
                    </div>
                </li>
            </ul>
        </Card>
    </div>
    )
}