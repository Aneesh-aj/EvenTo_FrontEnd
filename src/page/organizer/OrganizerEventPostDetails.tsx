



import { Chip, Divider } from "@mui/material"
import { useEffect, useState } from "react"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { getPostDetails } from "../../api/user"
import { useNavigate, useParams } from "react-router-dom"
import Nav from "../../componant/common/Nav";
import { EventPostEdit } from "../../componant/organizer/EventPostEdit";
import { OrganizerBottumBar } from "../../componant/common/OrganizerBottumBar";



export const OrganizerEventPostDetails = () => {
    const [data, setData] = useState<any>()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        title: "",
        postId: "",
        image: "",
        about: "",
        eventId: ''

    })


    const { id } = useParams()

    useEffect(() => {
        async function fetchDetails() {
            const response = await getPostDetails(id as string)
            console.log(" the datas", response.details.post._id)
            setFormData({
                title: response.details.post.title,
                postId: response.details.post._id,
                image: response.details.post.image,
                about: response.details.post.about,
                eventId: response.details.event._id
            })
            setData(response.details)
        }
        fetchDetails()
    }, [])



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


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <Nav></Nav>
          
            <div className="w-full flex flex-col gap-2 items-center pt-20 px-2">
                <div className="w-full xl:w-[60%] h-auto bg-white border-2 shadow-md rounded-md">
                <EventPostEdit isOpen={isModalOpen} onClose={handleCloseModal} formData={formData} />   
                    <div className="w-full h-[200px]  xl:h-[370px]  object-contain">
                        <img src={data && data.post.image} className="w-full h-full  rounded-md" alt="" />
                    </div>
                    <div className="w-full p-4 xl:p-5 flex justify-between">
                        <h1 className="font-bold  text-2xl ">{data && data.post.title}</h1>
                        <div className="hidden xl:block ">
                            <button onClick={handleOpenModal} className="w-[5rem] h-[2rem] bg-blue-500 p2 text-white rounded-md">Edit</button>
                            <button onClick={() => navigate(`/organizer/entrys/${formData.eventId}`)} className="w-[5rem] ms-3 h-[2rem] bg-blue-500 p2 text-white rounded-md">Entrys</button>
                        </div>
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
                    <div className="w-full block xl:hidden lg:hidden h-[5rem]">
                        <Divider variant="middle" />
                        <div className="flex w-full h-full gap-3 p-2 justify-center items-center ">
                            <button onClick={handleOpenModal} className="w-[40%] shadow-lg h-[2rem] bg-blue-500 p2 text-white rounded-md">Edit</button>
                            <button onClick={() => navigate(`/organizer/entrys/${formData.eventId}`)} className="w-[40%] shadow-lg h-[2rem] bg-blue-500 p2 text-white rounded-md">Entrys</button>
                        </div>
                    </div>

                </div>
                <div className="w-full xl:w-[60%] flex flex-col xl:flex-row gap-2 ">
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
            </div>
            <div className="w-full bottum-0 flex justify-center z-0">
                <OrganizerBottumBar />
            </div>

        </>
    )
}