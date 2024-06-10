import { useEffect, useState } from "react"
import EventChart from "./EventChart"
import Revenue from "./Revenue"
import { dashBoardData } from "../../api/organizer"
import useGetUser from "../../hook/useGetUser"

export const OrganizerDashboard = () => {
    const currentUser = useGetUser()
    const [data,setData] = useState({events:0,eventPosts:0,totalRevenue:0})
    useEffect(()=>{
         async function fetchData(){
            const responseData = await dashBoardData(currentUser.id)
            console.log("-+=>...",responseData)
            setData(responseData)

         }
         fetchData()
    },[])

    return (
        <>
            <div className="hidden lg:block xl:block w-full  h-auto  gap-6 flex-col">
                <div className="w-full flex justify-center">
                    <div className="w-[80%] h-[7rem] flex gap-3 ps-7 pe-7 justify-evenly">
                        <div className="w-1/4  h-full rounded-md shadow-xl">
                            <div className="w-full flex justify-center h-[40%] items-center">
                                <h1 className="font-bold ">Completed Events</h1>
                            </div>
                            <div className="w-full flex justify-center h-[40%] items-center ">
                                <h1 className=" font-extrabold text-4xl ">{ data?.events}</h1>
                            </div>
                        </div>
                        <div className="w-1/4  h-full rounded-md shadow-xl">
                            <div className="w-full flex justify-center h-[40%] items-center">
                                <h1 className="font-bold ">Total Posts</h1>
                            </div>
                            <div className="w-full flex justify-center h-[40%] items-center ">
                                <h1 className=" font-extrabold text-4xl ">{ data?.eventPosts}</h1>
                            </div>
                        </div>
                        <div className="w-1/4  h-full rounded-md shadow-xl">
                            <div className="w-full flex justify-center h-[40%] items-center">
                                <h1 className="font-bold ">Total Revenue</h1>
                            </div>
                            <div className="w-full flex justify-center h-[40%] items-center ">
                                <h1 className=" font-extrabold text-4xl ">{data?.totalRevenue}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[100%] h-[400px]  flex justify-center items-center">
                    <div className=" w-[50%] h-full flex justify-center items-center">
                        <Revenue />
                    </div>
                    <div className="w-[50%] h-full flex justify-center items-center">
                        <EventChart />
                    </div>
                </div>
            </div>
        </>
    )
}