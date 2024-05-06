import { Divider } from "@mui/material"
import Nav from "../common/Nav"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { geteventDetails } from "../../api/organizer"
import { Ievents } from "../../@types/eventType"
import { Iorganizer } from "../../@types/organizer"
import { PostModal } from "./PostModal"



export const EventDetails = () => {
    const [event, setEvent] = useState<Ievents>()
    const [organizer, setOrganizer] = useState<Iorganizer>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<any>({
         eventId:"",
        organizerId:"",
        seatArrangment:[]
    })

    const { id } = useParams()
    useEffect(() => {
        async function getDetails() {
            console.log(" the id", id)
            const response = await geteventDetails(id as string)
            if (response.success) {
                const { details } = response                                                                             
                setOrganizer(details.organizer)
                setEvent(details.event)
                setFormData({
                    eventId:details.event._id,
                    organizerId:details.organizer?._id,
                    seatArrangment:details.event.seatArrangement
                    
                })
            }
        }
        getDetails()
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
        <>  <Nav />
            <div className="w-full pt-20 flex flex-col mb-8 items-center bg-white ">
                <div className=" w-[80%] p-6 h-auto flex flex-col  gap-6">
                    <h1 className="font-bold text-2xl">Information</h1>
                    <Divider />
                </div>
                <div className="w-[80%] ">
                <PostModal isOpen={isModalOpen} onClose={handleCloseModal} formData={formData} />

                    <ul className="p-6 flex flex-col gap-3">
                        <li>
                            <div className="w-full flex">
                                <div className="w-32 font-semibold ">Name</div>
                                <span>:</span>
                                <div className="w-40 font-light ps-2"> {event && event?.name}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32 font-semibold  ">Email</div>
                                <span>:</span>
                                <div className="w-40 font-light  ps-2">{event && event?.email}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32 font-semibold  ">Phone number</div>
                                <span>:</span>
                                <div className="w-40 font-light  ps-2">{event && event?.phoneNumber}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32 font-semibold  ">country</div>
                                <span>:</span>
                                <div className="w-40 font-light  ps-2"> {event && event.country}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32  font-semibold ">State</div>
                                <span>:</span>
                                <div className="w-40 font-light   ps-2"> {event && event.state}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32 font-semibold  ">City</div>
                                <span>:</span>
                                <div className="w-40 font-light   ps-2"> {event && event.city}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className=" w-[80%] p-6 h-auto flex flex-col gap-6">
                    <h1 className="font-bold text-2xl">Event Information</h1>
                    <Divider />
                </div>
                <div className="w-[80%] flex  gap-12">
                    <ul className="p-6 flex flex-col gap-3">
                        <li>
                            <div className="w-full flex">
                                <div className="w-36 font-semibold   ">Organizer</div>
                                <span>:</span>
                                <div className="w-40 font-light  ps-2"> {organizer && organizer.name}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-36 font-semibold  ">category</div>
                                <span>:</span>
                                <div className="w-40 font-light   ps-2"> {event && event?.eventCategory?.category}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-36 font-semibold  ">EventType</div>
                                <span>:</span>
                                <div className="w-40 font-light   ps-2"> {event && event.eventType}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-36 font-semibold  ">Date & Time</div>
                                <span>:</span>
                                <div className="w-40 font-light   ps-2">  {event && event.date && event.startingTime && event.endingTime
                                    ? `${formatDate(event.date)} from ${formatTime(event.startingTime)} to ${formatTime(event.endingTime)}`
                                    : 'No event details available.'}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-36  font-semibold  ">Country</div>
                                <span>:</span>
                                <div className="w-40 font-light   ps-2"> {event && event.eventCountry}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-36 font-semibold  ">State</div>
                                <span>:</span>
                                <div className="w-40 font-light   ps-2">{event && event.eventState}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-36 font-semibold  ">City</div>
                                <span>:</span>
                                <div className="w-40 font-light  ps-2">{event && event.eventCity}</div>
                            </div>
                        </li>

                        {/*  */}

                    </ul>
                     <ul>
                     <Divider sx={{width:'20%', height:'100%', border:"1px solid #E0E0E0"}} orientation="horizontal"/>
                     </ul>
                    <ul className="p-6 flex flex-col gap-3">
                        <li>
                            <div className="w-full flex">
                                <div className="w-36  font-semibold ">Location</div>
                                <span>:</span>
                                <div className="w-40 font-light  ps-2">{event && event.location}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-36 font-semibold  ">Booking</div>
                                <span>:</span>
                                <div className="w-40 font-light   ps-2">{event && event.eventBooking}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-36 font-semibold  ">Single Payment</div>
                                <span>:</span>
                                <div className="w-40 font-light   ps-2">{event && event.paymentAmount}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-36  font-semibold ">Payment Method</div>
                                <span>:</span>
                                <div className="w-40 font-light  ps-2">{event && event.paymentMethod}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-36 font-semibold  ">Entry</div>
                                <span>:</span>
                                <div className="w-40 font-light   ps-2">{event && event?.seatNumber}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-36  font-semibold ">Total Amound</div>
                                <span>:</span>
                                <div className="w-40 font-light  ps-2">{event && event.totalAmount}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-36  font-semibold ">Event Status</div>
                                <span>:</span>
                                <div className="w-40 font-light   ps-2">{event && event.status}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="w-[80%] flex justify-end">
                    {event && event.eventType === "Public" && <button onClick={handleOpenModal} className="w-[5rem] rounded-lg h-[2rem] bg-blue-500 text-white">Post</button>}
                </div>
            </div>

        </>
    )
}