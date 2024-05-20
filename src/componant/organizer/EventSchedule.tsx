import { useEffect, useState } from "react"
import { cancelEvent, changeEventStatus, getAllEvents, getUpcomingEvent } from "../../api/organizer"
import useGetUser from "../../hook/useGetUser"
import { Box, Button, Card } from "@mui/material"
import EastIcon from '@mui/icons-material/East';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export const EventSchedule = () => {
    const currentUser = useGetUser()
    const [events, setEvents] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        async function getEvents() {
            const events = await getUpcomingEvent(currentUser.id)
            console.log(" the evnenen", events)
            if (events.success) {

                setEvents(events.events)
            } else {
                toast.error(events.message)
            }
        }
        getEvents()
    }, [])


    let count = 0;

    async function changeStatus(e: any,eventId:string) {
        try {
            const status = e.target.value
            const events = await changeEventStatus(status,eventId,currentUser.id)
            if (events.success) {

                setEvents(events.events)
            } else {
                toast.error(events.message)
            }
        } catch (error:unknown) {
            console.log(error)
        }
    }
    
    async function cancelEvents(eventId:string){
        try{
            const events = await cancelEvent(eventId,currentUser.id)
            if (events.success) {

                setEvents(events.events)
            } else {
                toast.error(events.message)
            }
        }catch(error){
            throw error
        }
    }

    return (
        <>
            <div className=" w-full h-[800px]">
                <div className="w-full h-[4rem] border-2 rounded-md p-5  bg-white">
                    <h1 className="font-bold">Scheduled Events</h1>
                </div>
                <div className="w-full border-2 p-3  rounded-md mt-3 bg-white">
                    <ul className="w-full  flex ms-2 gap-5   font-semibold  ">
                        <li className="w-1/12 text-center ">Name</li>
                        <li className="w-2/12 text-center">email</li>
                        <li className="w-1/12 text-center ">Type</li>
                        <li className="w-1/12 text-center  ">Category</li>

                        <li className="w-1/12 text-center ">Date</li>
                        <li className="w-2/12 text-center ">Place</li>
                        <li className="w-2/12 text-center ">Status</li>
                        <li className="w-1/12  ">Action</li>


                    </ul>
                </div>
                <div className="w-full  h-auto flex   pt-4  flex-col gap-3">
                    {

                        events && events.map((elem: any, index) => {
                            count++
                            return (
                                <div
                                    key={index}
                                    style={{
                                        transition: "opacity 1s linear",
                                        opacity: 1, // Start with opacity 1
                                        transitionDelay: `${(index * 0.5) + 1}s`, // Apply delay based on index
                                    }}
                                    className="w-full  border-t-2 flex gap-11 bg-white h-20 items-center shadow-md  rounded-md"
                                >
                                    <ul className="w-full flex justify-around">
                                        <li className="  w-1/12">{elem.name}</li>
                                        <li className="  w-2/12">{elem.email}</li>
                                        <li className=" w-1/12">{elem.eventType}</li>
                                        <li className=" w-1/12">{elem.eventCategory.category}</li>
                                        <li className="  w-1/12">{new Date(elem.date).toLocaleDateString()}</li>
                                        <li className="  w-2/12">{elem?.eventCountry + "," + elem.eventState + " ," + elem.eventCity}</li>
                                        <li className="flex items-center">
                                            {elem.status === "upcoming" && (
                                                <>
                                                    <span className="flex w-3 h-3 me-3 bg-yellow-300 rounded-full"></span>
                                                    <span>{elem.status}</span>
                                                </>
                                            )}
                                            {elem.status === "ongoing" && (
                                                <>
                                                    <span className="flex w-3 h-3 me-3 bg-orange-300 rounded-full"></span>
                                                    <span>{elem.status}</span>
                                                </>
                                            )}
                                            {elem.status === "completed" && (
                                                <>
                                                    <span className="flex w-3 h-3 me-3 bg-green-300 rounded-full"></span>
                                                    <span>{elem.status}</span>
                                                </>
                                            )}
                                            {elem.status === "cancelled" && (
                                                <>
                                                    <span className="flex w-3 h-3 me-3 bg-red-300 rounded-full"></span>
                                                    <span>{elem.status}</span>
                                                </>
                                            )}
                                        </li>
                                        <li className="flex gap-1 items-center">
                                            {/* {
                        elem.status && elem.status ==="upcoming" ?  <Button variant="contained"  >Edit</Button>:<button className="w-[3rem] h-[2rem] bg-slate-800">hhh</button>
                      } */}
                                            <select className="border-2 border-black border-opacity-50 p-1 rounded-md" onChange={(e: any) => changeStatus(e,elem._id)}>
                                                <option className="rounded-md p-2" selected>{elem.status}</option>
                                                {elem.status === "upcoming" ? (
                                                    <option className="rounded-md p-2" value="ongoing">ongoing</option>
                                                ) : elem.status === "ongoing" ? (
                                                    <option className="rounded-md p-2" value="completed">completed</option>
                                                ) : null}
                                            </select>

                                            {
                                                elem.status && elem.status === "upcoming" ? <Button variant="contained" sx={{ bgcolor: 'red' }} onClick={()=>cancelEvents(elem._id)}>Cancel</Button> : <button className="w-[5.5rem] h-[2rem] "></button>

                                            }
                                            <div onClick={(e) => { navigate(`/organizer/eventDetails/${elem._id}`) }} >
                                                <EastIcon />
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}