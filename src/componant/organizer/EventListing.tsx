import { useEffect, useState } from "react"
import { getAllEvents } from "../../api/organizer"
import useGetUser from "../../hook/useGetUser"


export  const EventListing = ()=>{
    const currentUser = useGetUser()
    const [events,setEvents] = useState([])
    useEffect(()=>{
          async function getEvents(){
              const events = await getAllEvents(currentUser.id)
              console.log(" the evnenen",events)
              setEvents(events.events)
          }
          getEvents()
    })

    return(
        <>
          <div className=" w-full h-[800px]">
              <div className="w-full h-[4rem] rounded-md p-5 border-2 bg-white">
                    <h1 className="font-bold">All events</h1>
              </div>
              <div className="w-full  h-auto flex  p-9 flex-col gap-3">
                 {
                    events&&events.map((elem:any)=>{
                        return(
                            <div className="w-full flex gap-11 h-20 items-center shadow-sm  p-6 bg-white border-2  rounded-md">
                                   <div>
                                     <p>{elem?.name}</p>
                                   </div>
                                   <div>
                                     <p>
                                        {elem?.email}
                                     </p>
                                   </div>
                                   <div>
                                     <p>
                                        {elem?.phoneNumber}
                                     </p>
                                   </div>
                            </div>
                        )
                    })
                 }
              </div>
          </div>
        </>
    )
}