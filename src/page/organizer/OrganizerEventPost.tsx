import Nav from "../../componant/common/Nav";
import { useEffect, useState } from "react";
import { getEventPost } from "../../api/organizer";
import useGetUser from "../../hook/useGetUser";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import bg from "../../assets/9318688.jpg";
import { OrganizerBottumBar } from "../../componant/common/OrganizerBottumBar";

export const OrganizerEventPost = () => {
    const [eventPosts, setEventPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const currentUser = useGetUser();

    useEffect(() => {
        async function fetchAllpost() {
            const response = await getEventPost(currentUser.id);
            console.log(" -----------____________------", response);
            setEventPosts(response.eventPost);
            setLoading(false); // Set loading to false once data is fetched
        }
        fetchAllpost();
    }, [currentUser.id]);

    return (
        <>
            <Nav />
            <div className="w-full pt-20 h-auto flex flex-col items-center">
                <div className="w-full px-2 xl:px-8">
                    <div className="h-[3rem] rounded-md w-full p-2 bg-white border-2">
                        <div className="h-full flex items-center p-3">
                            <h1 className="font-bold">Event Posts</h1>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-wrap xl:ps-[8rem] p-1 pt-3 gap-1 mb-14">
                    {loading ? (
                        // Skeleton loading state
                        Array(6).fill(0).map((_, index) => (
                            <div key={index} className="w-[calc(51.5%-0.5rem)] sm:w-[calc(33.333%-0.5rem)] lg:w-[calc(16.667%-0.5rem)] p-2 rounded-md border-2 shadow-lg bg-gray-200 animate-pulse">
                                <div className="w-full h-[10rem] bg-gray-300 rounded-md"></div>
                                <div className="p-2 w-full">
                                    <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
                                </div>
                                <Divider />
                                <div className="w-full p-2 h-[6rem]">
                                    <div className="h-full bg-gray-300 rounded"></div>
                                </div>
                                <div className="w-full p-2 flex justify-center">
                                    <div className="w-8/12 h-[2rem] bg-gray-300 rounded-2xl"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        eventPosts.length > 0 ? (
                            eventPosts.map((ele: any, index: any) => (
                                <div key={index} className="w-[calc(51.5%-0.5rem)] sm:w-[calc(33.333%-0.5rem)] lg:w-[calc(16.667%-0.5rem)] p-2 rounded-md border-2 shadow-lg bg-white">
                                    <div className="w-full h-[10rem] flex justify-center">
                                        <img src={ele.image} className="w-full rounded-md h-full object-cover" alt="" />
                                    </div>
                                    <div className="p-2 w-full">
                                        <h1 className="font-bold text-center">{ele?.title}</h1>
                                    </div>
                                    <Divider />
                                    <div className="w-full p-2 h-[6rem]">
                                        <p className="h-full text-sm break-words overflow-hidden">
                                            {ele?.about}
                                        </p>
                                    </div>
                                    <div className="w-full p-2 flex justify-center">
                                        <button onClick={() => navigate(`/organizer/eventPostDetails/${ele._id}`)} className="w-8/12 h-[2rem] text-sm rounded-2xl text-white bg-violet-600">more...</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="w-full h-[450px]">
                                <div className="w-[90%] h-full">
                                    <img src={bg} alt="" className="w-full h-full object-contain" />
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
            <div className="w-full bottum-0 flex justify-center z-0">
                <OrganizerBottumBar />
            </div>
        </>
    );
};
