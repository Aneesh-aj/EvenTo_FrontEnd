import { useEffect, useState } from "react"
import { getAllEvents } from "../../api/organizer"
import useGetUser from "../../hook/useGetUser"
import { Box, Button, Card } from "@mui/material"
import EastIcon from '@mui/icons-material/East';
import { useNavigate } from "react-router-dom";


export const EventListing = () => {
  const currentUser = useGetUser()
  const [events, setEvents] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    async function getEvents() {
      const events = await getAllEvents(currentUser.id)
      console.log(" the evnenen", events)
      setEvents(events.events)
    }
    getEvents()
  }, [])

  // function EditEvent= ()=>{
      
  // }
  let count = 0;

  return (
    <>
      <div className=" w-full h-[800px]">
        <div className="w-full h-[4rem] border-2 rounded-md p-5  bg-white">
          <h1 className="font-bold">All events</h1>
        </div>
        <div className="w-full border-2 p-2  rounded-md mt-3 bg-white">
          <ul className="w-full  flex  gap-3 ms-8  font-semibold  ">
            <li className="w-1/12">Name</li>
            <li className="w-2/12">email</li>
            <li className="w-1/12">Type</li>
            <li className="w-1/12">Category</li>
            <li className="w-1/12">Amount</li>
            <li className="w-1/12">Date</li>
            <li className="w-1/12">Place</li>
            <li className="w-1/12">Status</li>
            <li className="w-1/12"></li>
            <li className="w-1/12" ></li>
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
                  className="w-full  border-t-2 flex gap-11 h-20 items-center shadow-md p-6 bg-white rounded-md"
                >
                  <ul className="w-full flex justify-around">
                    <li className="">{elem.name}</li>
                    <li>{elem.email}</li>
                    <li>{elem.eventType}</li>
                    <li>{elem.eventCategory.category}</li>
                    <li>{`${elem.totalAmount}/:Rs`}</li>
                    <li>{new Date(elem.date).toLocaleDateString()}</li>
                    <li>{elem?.eventCountry + "," + elem.eventState + " ," + elem.eventCity}</li>
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
                      {
                        elem.status && elem.status ==="upcoming" ?  <Button variant="contained"  >Edit</Button>:''
                      }
                      <Button variant="contained" sx={{ bgcolor: 'red' }}>Delete</Button>
                      <div onClick={(e)=>{navigate(`/organizer/eventDetails/${elem._id}`)}} >
                      <EastIcon/>
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