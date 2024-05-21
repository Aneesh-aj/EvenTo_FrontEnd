import Nav from "../../componant/common/Nav";
// import bg from "../../assets/FE.jpg";
import { useEffect, useState } from "react";
import { getEventPost } from "../../api/organizer";
import useGetUser from "../../hook/useGetUser";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import bg from "../../assets/9318688.jpg"

export const OrganizerEventPost = () => {
    const [eventPosts, setEventPosts] = useState([])
    const navigate = useNavigate()
    const currentUser = useGetUser()
    useEffect(() => {
        async function fetchAllpost() {
            const response = await getEventPost(currentUser.id)
            console.log(" -----------____________------", response)
            setEventPosts(response.eventPost)
        }
        fetchAllpost()
    }, [])

    return (
        <>
            <Nav />
            <div className="w-full pt-20 h-auto flex flex-col items-center">
                <div className="w-full px-8">
                    <div className="h-[3rem] rounded-md w-full p-2 bg-white border-2">
                        <div className="h-full flex items-center p-3">
                            <h1 className="font-bold">Event Posts</h1>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-wrap ps-[8rem] gap-2">
                    {eventPosts.length >0 && eventPosts.map((ele: any, index:any) => (
                        <div key={index} className="w-1/6 mt-3 p-3 rounded-md border-2 shadow-md">
                            <div className="w-full h-[10rem] flex justify-center">
                                <img src={ele.image} className="w-full rounded-md h-full object-cover" alt="" />
                            </div>
                            <div className="p-2 w-full">
                                <h1 className="font-bold">{ele?.title}</h1>
                            </div>
                            <Divider />
                            <div className="w-full p-2 h-[6rem]">
                                <p className=" h-full text-sm break-words overflow-hidden">
                                    {ele?.about}
                                </p>
                            </div>
                            <div className="w-full p-2 flex justify-center">
                                <button onClick={() => navigate(`/organizer/eventPostDetails/${ele._id}`)} className="w-8/12 h-[2rem] text-sm rounded-2xl text-white bg-violet-600">more...</button>
                            </div>
                        </div>
                    ))}
                    {
                        eventPosts.length === 0 && (
                            <>
                                <div className="w-full h-[450px] ">
                                    <div className="w-[90%] h-full">
                                        <img src={bg} alt="" className="w-full h-full object-contain" />
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
};
