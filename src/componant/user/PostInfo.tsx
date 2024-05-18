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

    function navigation() {
        console.log(" cominnnn")
        if (data.event.eventBooking === "SeatArrangment") {
             console.log("-------------data",data)
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
            <div className="w-full h-auto bg-white border-2  rounded-md">
                <div className="w-full h-[370px]  object-contain">
                    {/* <h1 className="font-bold text-2xl pb-3">{data && data.post.title}</h1> */}

                    <img src={data && data.post.image} className="w-full h-full " alt="" />
                </div>
                <div className="w-full p-5 flex justify-between">
                    <h1 className="font-bold  text-2xl ">{data && data.post.title}</h1>
                    <button onClick={() => { navigation() }} className="w-[5rem] h-[2rem] bg-blue-500 p2 text-white rounded-md">Book</button>

                </div>
                <div className="w-full ps-5 pb-4 flex gap-3 ">
                    <Chip label={data && data.event.eventCategory.category} variant="outlined" />
                    <Chip label={data && data.organizer.name} variant="outlined" />


                </div>
                <Divider variant="middle" />
                <div className="w-full p-6 flex gap-3">
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
                    <h3>
                        ${data && data.event.paymentAmount}
                    </h3>
                </div>

                {/* <div className="w-full p-8">
                    <ul className="p-6 flex flex-col gap-3"> 
                        <li>
                            <div className="w-full flex">
                                <div className="w-32 font-semibold ">Organizer</div>
                                <span>:</span>
                                <div className="w-40 font-light ps-2">{data && data?.organizer?.name} </div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32 font-semibold  ">co-ordinator</div>
                                <span>:</span>
                                <div className="w-40 font-light  ps-2">{data && data?.event?.name}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32 font-semibold  ">category</div>
                                <span>:</span>
                                <div className="w-40 font-light  ps-2">{data && data?.event?.eventCategory?.category}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32 font-semibold  ">Phone number</div>
                                <span>:</span>
                                <div className="w-40 font-light  ps-2">{data && data.event.phoneNumber}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32 font-semibold  ">Location</div>
                                <span>:</span>
                                <div className="w-40 font-light  ps-2">{data && data.event.eventState + " ," + data.event.eventCity + " ," + data.event.eventCountry + " ," + data.event.location}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32  font-semibold ">Date and Time</div>
                                <span>:</span>
                                <div className="w-40 font-light   ps-2">  {data && data.event.date && data.event.startingTime && data.event.endingTime
                                    ? `${formatDate(data.event.date)} from ${formatTime(data.event.startingTime)} to ${formatTime(data.event.endingTime)}`
                                    : 'No event details available.'}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32 font-semibold  ">Entry</div>
                                <span>:</span>
                                <div className="w-40 font-light   ps-2">{data && data.event.eventBooking}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32 font-semibold  ">Pay.Method </div>
                                <span>:</span>
                                <div className="w-40 font-light   ps-2">{data && data.event.paymentMethod}</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32 font-semibold  ">Cost </div>
                                <span>:</span>
                                <div className="w-40 font-light   ps-2">{data && data.event.paymentAmount}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="w-full p-8">
                    <h1 className="font-bold text-2xl">About the Event</h1>
                </div>
                <Divider />
                <div className="w-full h-[250px] p-8">
                    <h1 className="font-bold text-xl p-3">{data && data.post.subTitle}</h1>
                    <p className=" w-full h-full">{data && data.post.about}</p>
                </div>
                <div className="w-full flex justify-end pe-8 mb-10">
                </div> */}
            </div>
            <div className="w-full flex gap-2 ">
                <div className="w-7/12 h-72 bg-white border-2 p-6 rounded-md">
                    <h1 className="font-bold">Details</h1>
                    <div className="w-full h-full  p-5">
                        <ul className="w-full flex  flex-col  gap-3 list-disc">
                            <li>{data && data.event.eventBooking === "SeatArrangment" ? "You Can Participate By Seat Booking" : "You Can Participate By Registration"}</li>
                            <li>{data && `Only ${data.event.seatNumber} seats  Are Avalible For This Program.`}</li>
                            <li>{data && `You Can Contact for furthur information on ${data.event.phoneNumber}`}</li>
                            <li>{data && `Program strats on ${formatDate(data.event.date)} from ${formatTime(data.event.startingTime)} to ${formatTime(data.event.endingTime)}`}</li>
                            <li></li>
                        </ul>
                    </div>
                </div>
                <div className="w-5/12 border-2  h-72 bg-white rounded-md p-6">
                    <h1 className="font-bold">About</h1>

                    <p className="font-normal pt-5 overflow-auto break-all"> {data && data.post.about}</p>
                </div>
            </div>
            <div className="w-full">
                <h1 className="font-bold">You Might also like</h1>
            </div>
            <UserEventListing></UserEventListing>
        </>
    )
}