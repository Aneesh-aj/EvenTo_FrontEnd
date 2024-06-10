import { Chip, Divider } from "@mui/material"
import bg from "../../assets/FE.jpg"
import { useEffect, useState } from "react"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { getPostDetails } from "../../api/user"
import { useNavigate, useParams } from "react-router-dom"
import { UserEventListing } from "./UserEventListing";



export const PostInfo = () => {
    const [data, setData] = useState<any>()
    const navigate = useNavigate()

    const { id } = useParams()

    useEffect(() => {
        async function fetchDetails() {
            const response = await getPostDetails(id as string)
            console.log(" the datas", response)
            setData(response.details)
        }
        fetchDetails()
    }, [])

    const isEventExpired = (eventDate: string): boolean => {
        const currentDate = new Date();
        const eventEndDate = new Date(eventDate);
        return eventEndDate < currentDate;
    };

    function navigation() {
        console.log(" cominnnn")
        if (data.event.eventBooking === "SeatArrangment") {
            console.log("-------------data", data)
            navigate(`/user/seatBooking/${data.post._id}`)
        }
    }


    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            console.error('Invalid date format:', dateString);
            return 'Invalid date';
        }
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };


    const formatTime = (timeString: string): string => {
        const time = new Date(timeString);
        if (isNaN(time.getTime())) {
            console.error('Invalid time format:', timeString);
            return 'Invalid time';
        }
        let hours = time.getHours();
        let minutes: any = time.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes.toString();
        const strTime = `${hours}:${minutes} ${ampm}`;
        return strTime;
    };

    return (
        <>
            <div className="w-full h-auto bg-white border-2 shadow-md rounded-md">
                <div className="w-full h-[200px] xl:h-[370px] object-contain relative overflow-hidden">
                    <img src={data && data.post.image} className="w-full h-full rounded-md" alt="" />
                    {isEventExpired(data?.event?.date) && (
                        <div className="absolute top-0 right-0  w-[50%] bg-red-500 text-white text-md text-center ps-4 xl:ps-[16rem] shadow-2xl font-bold  px-2 py-1 transform translate-x-10 xl:translate-x-28 translate-y-8 xl:-translate-y-7 rotate-45">
                            Expired
                        </div>
                    )}
                </div>


                <div className="w-full p-4 xl:p-5 flex justify-between">
                    <h1 className="font-bold  text-2xl ">{data && data.post.title}</h1>
                    {!isEventExpired(data?.event?.date) ? (

                    <button onClick={() => { navigation() }} className="w-[5rem] h-[2rem] shadow-md bg-blue-500 p2 text-white rounded-md">Book</button>
                    ):<button disabled className="w-[5rem] h-[2rem] shadow-md bg-red-500 p2 text-white rounded-md">closed</button>}

                </div>
                <div className="w-full ps-2 xl:ps-5 pb-4 flex gap-3 ">
                    <Chip label={data && data.event.eventCategory.category} variant="outlined" />
                    <Chip label={data && data.organizer.name} variant="outlined" />
                </div>
                <Divider variant="middle" />
                <div className="w-full p-4 pb-7 xl:p-6 flex gap-3 ">
                    <h3>{data && data.event.date && data.event.startingTime && data.event.endingTime
                        ? `${formatDate(data.event.date)} from ${formatTime(data.event.startingTime)} to ${formatTime(data.event.endingTime)}`
                        : 'No event details available.'}
                    </h3>
                    <div className=" w-3">
                        <Divider orientation="vertical"></Divider>
                    </div>
                    <h3>
                        <LocationOnIcon />
                        {data && data.event.eventCity + " , " + data.event.eventState + " , " + data.event.eventCountry}
                    </h3>
                    <div className=" w-3">
                        <Divider orientation="vertical"></Divider>
                    </div>
                    <h3 className="pt-3 xl:pt-0">
                        ${data && data.event.paymentAmount}
                    </h3>
                </div>
            </div>
            <div className="w-full flex flex-col xl:flex-row gap-2 ">
                <div className="w-full xl:w-7/12 h-auto xl:h-72 bg-white border-2 shadow-md p-6 rounded-md">
                    <h1 className="font-bold">Details</h1>
                    <Divider className="p-1"></Divider>
                    <div className="w-full h-full  p-5">
                        <ul className="w-full flex  flex-col  gap-3 list-disc">
                            <li>{data && data.event.eventBooking === "SeatArrangment" ? "You Can Participate By Seat Booking" : "You Can Participate By Registration"}</li>
                            <li>{data && `Only ${data.event.seatNumber} seats  Are Avalible For This Program.`}</li>
                            <li>{data && `You Can Contact for furthur information on ${data.event.phoneNumber}`}</li>
                            <li>{data && `Program strats on ${formatDate(data.event.date)} from ${formatTime(data.event.startingTime)} to ${formatTime(data.event.endingTime)}`}</li>
                        </ul>
                    </div>
                </div>
                <div className="w-full xl:w-5/12 border-2 shadow-md h-72 bg-white rounded-md p-6">
                    <h1 className="font-bold">About</h1>
                    <Divider className="p-1" />
                    <p className="font-normal pt-5 overflow-auto break-all"> {data && data.post.about}</p>
                </div>
            </div>
            {/* <div className="w-full">
                <h1 className="font-bold">You Might also like</h1>
            </div> */}
            {/* <UserEventListing></UserEventListing> */}
        </>
    )
}