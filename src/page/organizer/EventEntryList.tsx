import { useEffect, useState } from "react"
import Nav from "../../componant/common/Nav"
import { useParams } from "react-router-dom"
import { fetchAllBooking } from "../../api/organizer"
import bg from "../../assets/9318688.jpg"
import { OrganizerBottumBar } from "../../componant/common/OrganizerBottumBar"
import image from "../../assets/isometric_26.jpg"


export const EventEntryList = () => {
    const [entry, setEntrys] = useState([])
    const { id } = useParams()
    useEffect(() => {
        async function fetchBooking() {
            const bookings = await fetchAllBooking(id as string)
            console.log(" the bookings ---------", bookings)
            setEntrys(bookings.allBookings)
        }
        fetchBooking()
    }, [])
    return (
        <>
            <Nav />
            <div className="w-full h-auto p-8 white hidden xl:block">
                <div className="w-full border-2  p-3 mt-16 bg-white rounded-md shadow-md">
                    <h1 className="font-bold">All Entrys</h1>
                </div>
                <div className="flex w-full items-center justify-evenly bg-white border-2 p-2  rounded-md mt-3">
                    <div className="w-1/12  h-full flex items-center justify-center">

                        <h2 className=" ">profile</h2>
                    </div>
                    <div className="w-1/12 h-full flex items-center justify-center">
                        <h1 className="font-bold ">Name</h1>
                    </div>
                    <div className="w-3/12  h-full flex items-center justify-center">
                        <h1 className="font-bold  flex text-center">Email</h1>
                    </div>
                    <div className="w-1/12  h-full flex items-center justify-center">
                        <h1 className="flex font-bold text-center">BookingId</h1>
                    </div>
                    <div className="w-2/12 font-bold  h-full flex items-center justify-center">
                        <h1 className=" ">Ticket</h1>
                    </div>
                    <div className="w-1/12  h-full flex items-center justify-center">

                        <h1 className="font-bold">Amount</h1>
                    </div>
                    <div className="w-2/12  h-full flex items-center justify-center">
                        <h1 className="font-bold">TransationId</h1>
                    </div>
                </div>
                <div className="w-full  h-auto flex flex-col gap-2 pt-4">
                    {
                        entry && entry.map((ele: any) => {
                            return (
                                <div className="w-full bg-white h-[5rem] flex gap-2 justify-center border-2 shadow-md rounded-xl">
                                    <div className="w-1/12 h-full flex items-center justify-center">
                                        <div className="w-[3rem] h-[3rem] rounded-full bg-gray-500">
                                            <img src={ele.userDetails[0].profileImage} className="w-full h-full object-cover rounded-full" alt="" />
                                        </div>
                                    </div>
                                    <div className="w-1/12 h-full flex items-center justify-center">
                                        <h2>{ele.userDetails[0].name}</h2>
                                    </div>
                                    <div className="w-3/12  h-full flex items-center justify-center">
                                        <h2>{ele.userDetails[0].email}</h2>
                                    </div>
                                    <div className="w-1/12 h-full flex items-center justify-center">
                                        <h2>{ele.bookingId}</h2>
                                    </div>
                                    <div className="w-2/12 h-full flex items-center justify-center">
                                        <h2>{ele.seat.map((seats: any) => { return `${seats.row}${seats.column},` })}</h2>
                                    </div>
                                    <div className="w-1/12  h-full flex items-center justify-center">
                                        <h2>Rs.{ele.paidAmound}</h2>
                                    </div>
                                    <div className="w-2/12 h-full flex items-center justify-center">
                                        <h2>37378292838383838383</h2>
                                    </div>
                                </div>
                            )
                        })
                    }{
                        entry.length == 0 && (
                            <>
                                <div className="w-full h-[450px]">
                                    <div className="w-full h-full">
                                        <img src={bg} alt="" className="w-full h-full object-contain" />
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
            <div className='w-full block  xl:hidden lg:hidden items-center content-center  h-screen '>
                <div className="w-full   flex flex-col items-center ">
                    <img src={image} className='w-full h-full' alt="" />
                    <h4 className='font-semibold p-5'>Switch to laptop view</h4>
                </div>
            </div> 
             <div className="w-full bottum-0 flex justify-center z-0">
                <OrganizerBottumBar />
            </div>
        </>
    )
}