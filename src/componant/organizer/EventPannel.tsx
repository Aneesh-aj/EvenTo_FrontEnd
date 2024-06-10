import { useNavigate, useLocation } from "react-router-dom"
import { fetchEvent } from "../../api/organizer"
import { useEffect, useState } from "react"
import useGetUser from "../../hook/useGetUser"
import EventCreationForm from "./EventCreationForm"
import  EventListing  from "./EventListing"
import { EventSchedule } from "./EventSchedule"

const EventPannel: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const currentUser = useGetUser()
    const [eventTrue, setEventTrue] = useState<boolean>(false)
    const [eventFormTrue, setEventFormTrue] = useState<boolean>(false)
    const [scheduleTrue, setScheduleTrue] = useState<boolean>(false)
    const [events, setEvents] = useState<any>()

    const fetchEvents = async () => {
        const data = await fetchEvent(currentUser?.id)
        console.log("data from of the event", data)
        setEvents(data)
    }

    useEffect(() => {
        // Check the current path and update the state accordingly
        const path = location.pathname;
        if (path.includes("/organizer/events/Schedules")) {
            setScheduleTrue(true);
        } else if (path.includes("/organizer/events/createForm")) {
            setEventFormTrue(true);
        } else if (path === `/organizer/events/${currentUser.id}`) {
            setEventTrue(true);
        }
    }, [location, currentUser.id]);

    const changeComponent = (index: number) => {
        if (index === 0) {
            setEventTrue(true);
            setEventFormTrue(false);
            setScheduleTrue(false);
            navigate(`/organizer/events/${currentUser.id}`);
        } else if (index === 1) {
            setEventFormTrue(true);
            setEventTrue(false);
            setScheduleTrue(false);
            navigate('/organizer/events/createForm');
        } else if (index === 2) {
            setScheduleTrue(true);
            setEventTrue(false);
            setEventFormTrue(false);
            navigate("/organizer/events/Schedules");
        } 
    }

    console.log(events, "okkk")

    return (
        <>
            <div className='w-full flex justify-evenly -translate-y-5'>
                <div className="flex justify-center w-2/12 bg-white items-center border shadow-md rounded-md h-14" onClick={() => changeComponent(0)}>Events</div>
                <div className="flex justify-center w-2/12 bg-white items-center border shadow-md rounded-md h-14" onClick={() => changeComponent(1)}>Create Event</div>
                <div className="flex justify-center w-2/12 bg-white items-center border shadow-md rounded-md h-14" onClick={() => changeComponent(2)}>Schedule</div>
            </div>
            <div>
                {eventTrue && <><EventListing/></>}
                {eventFormTrue && <EventCreationForm/>}
                {/* {eventFormTrue && <SeatCreating/>} */}
                {scheduleTrue && <><EventSchedule/></>}
            </div>
        </>
    )
}

export default EventPannel
