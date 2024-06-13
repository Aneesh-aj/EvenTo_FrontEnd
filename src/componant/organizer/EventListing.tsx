import { useEffect, useState } from "react"
import { cancelEvent, getAllEvents } from "../../api/organizer"
import useGetUser from "../../hook/useGetUser"
import { Box, Button, Skeleton, Pagination } from "@mui/material"
import EastIcon from '@mui/icons-material/East';
import { useNavigate } from "react-router-dom";
import bg from "../../assets/9318688.jpg"
import toast, { Toaster } from "react-hot-toast";


const EventListing = () => {
  const currentUser = useGetUser()
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()

  const limit = 7

  async function getEvents(pageNumber = 1) {
    setLoading(true);
    const offset = (pageNumber - 1) * limit;

    const events = await getAllEvents(currentUser.id, limit, offset)
    console.log(" the evnenen", events)
    setEvents(events.events)
    setTotalPages(Math.ceil(events.events.length-1 / limit));
    setLoading(false);
  }

  useEffect(() => {
    getEvents(currentPage)
  }, [currentPage]);

  const handlePageChange = (event:any, newPage:number) => {
    console.log(event)
    setCurrentPage(newPage);
  };

  async function cancelEvents(eventId:string) {
    try {
      const events = await cancelEvent(eventId, currentUser.id)
      if (events.success) {
        getEvents()
        toast.success("cancelled successfully")
      } else {
        getEvents()
        toast.error(events.message)
      }
    } catch (error) {
      throw error
    }
  }


  let count = 0;

  return (
    <>
      <div className="w-full h-auto">
        <div className="w-full h-[4rem] border-2 rounded-md p-5 bg-white">
          <h1 className="font-bold">All events</h1>
          <Toaster />
        </div>
        <div className="w-full border-2 p-3 rounded-md mt-3 bg-white">
          <ul className="w-full flex ms-2 gap-5 font-semibold">
            <li className="w-1/12 text-center">Name</li>
            <li className="w-2/12 text-center">Email</li>
            <li className="w-1/12 text-center">Type</li>
            <li className="w-1/12 text-center">Category</li>
            <li className="w-1/12 text-center">Date</li>
            <li className="w-2/12 text-center">Place</li>
            <li className="w-2/12 text-center">Status</li>
            <li className="w-1/12">Action</li>
          </ul>
        </div>
        <div className="w-full h-auto flex pt-4 flex-col gap-3">
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={400} />
          ) : events.length ? (
            events.map((elem:any, index:any) => {
              count++
              return (
                <div
                  key={index}
                  style={{
                    transition: "opacity 1s linear",
                    opacity: 1,
                    transitionDelay: `${(index * 0.5) + 1}s`,
                  }}
                  className="w-full border-t-2 flex gap-11 bg-white h-20 items-center shadow-md rounded-md"
                >
                  <ul className="w-full flex justify-around">
                    <li className="w-1/12">{elem.name}</li>
                    <li className="w-2/12">{elem.email}</li>
                    <li className="w-1/12">{elem.eventType}</li>
                    <li className="w-1/12">{elem.eventCategory.category}</li>
                    <li className="w-1/12">{new Date(elem.date).toLocaleDateString()}</li>
                    <li className="w-2/12">{elem?.eventCountry + "," + elem.eventState + " ," + elem.eventCity}</li>
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
                          <span className="flex w-3 h-3 me-3 bg-red-600 rounded-full"></span>
                          <span>{elem.status}</span>
                        </>
                      )}
                    </li>
                    <li className="flex gap-1 items-center">
                      {elem.status === "upcoming" ? (
                        <>
                          <Button variant="contained" onClick={() => navigate(`/organizer/eventEdit/${elem._id}`)}>Edit</Button>
                          <Button variant="contained" sx={{ bgcolor: 'red' }} onClick={() => cancelEvents(elem._id)}>Cancel</Button>
                        </>
                      ) : (
                        <>
                          <button className="w-[3.5rem] h-[2rem]"></button>
                          <button className="w-[5.5rem] h-[2rem]"></button>
                        </>
                      )}
                      <div onClick={() => navigate(`/organizer/eventDetails/${elem._id}`)}>
                        <EastIcon />
                      </div>
                    </li>
                  </ul>
                </div>
              )
            })
          ) : (
            <div className="w-full h-[400px] flex justify-center">
              <div className="w-[50%] h-full">
                <img src={bg} alt="" className="w-full h-full" />
              </div>
            </div>
          )}
        </div>
        <Box display="flex" justifyContent="center" marginTop="20px">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </div>
    </>
  )
}

export default EventListing
