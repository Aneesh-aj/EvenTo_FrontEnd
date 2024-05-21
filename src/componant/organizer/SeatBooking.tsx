import { useEffect, useState } from "react"
import { book, getAllseat, payment } from "../../api/user"
import { useNavigate, useParams } from "react-router-dom"
import { Ievents, Seat } from "../../@types/eventType";
import { loadStripe } from "@stripe/stripe-js"
import toast, { Toaster } from "react-hot-toast";
import useGetUser from "../../hook/useGetUser";
import io from 'socket.io-client';

const socket = io("http://localhost:3000");



export const SeatBooking = () => {
    const { id } = useParams();
    const currentUser = useGetUser()
    const [seats, setSeats] = useState<Seat[][]>([]);
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
    const [postId,setPostid] = useState<string>()
    const [event, setEvent] = useState<Ievents>()


    useEffect(() => {

        socket.on('seatSelected', ({ data }) => {
            console.log('Seat ------------selected:', data);
            getSeat()
        });

        return () => {

            socket.off('seatSelected');

        };
    }, []);


    const handleSeatSelection = () => {
        socket.emit('selectSeat');
    };



    async function getSeat() {
        const allSeats = await getAllseat(id as string);

        console.log("all seats ", allSeats);
        console.log(" iddddd", id)
        console.log(" there ar elittlee e",allSeats.eventSeat[0].eventDetails[0])
        setEvent(allSeats.eventSeat[0].eventDetails[0])
        setPostid(allSeats.eventSeat[0]._id)




        const groupedSeats: { [key: string]: Seat[] } = {};
         console.log("  the eventss s",event)
        allSeats.eventSeat[0].eventDetails[0].seatArrangement.forEach((seat: Seat) => {
            if (!groupedSeats[seat.row]) {
                groupedSeats[seat.row] = [];
            }
            groupedSeats[seat.row].push(seat);
        });

        const seatRows = Object.values(groupedSeats);

        setSeats(seatRows);
    }
    useEffect(() => {
        getSeat();
        console.log("after the assigment",event)
    }, []);

    console.log(" the paymetns amoudn", event?.paymentAmount)
    const handleSeatClick = (row: string, column: number, disabled: boolean, booked: boolean, isSelected: boolean) => {
        if (disabled || booked || isSelected) {
            return;
        }

        const updatedSeats = seats.map((seatRow) =>
            seatRow.map((seat) => {
                if (seat.row === row && seat.column === column) {
                    const updatedSeat = { ...seat, userSelected: !seat.userSelected };
                    updatedSeat.userSelected = updatedSeat.userSelected ? true : false;
                    return updatedSeat;
                }
                return seat;
            })
        );

        const selectedSeat = updatedSeats
            .find((seatRow) => seatRow[0]?.row === row)
            ?.find((seat) => seat.column === column);

        if (selectedSeat && selectedSeat.userSelected) {
            setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, selectedSeat]);
        } else {
            setSelectedSeats((prevSelectedSeats) =>
                prevSelectedSeats.filter(
                    (selectedSeat) => !(selectedSeat.row === row && selectedSeat.column === column)
                )
            );
        }

        setSeats(updatedSeats);
    };


    const handleConfirmBooking = async () => {
        // Send selectedSeats array to backend
        console.log("Selected Seats:", selectedSeats);

        setSelectedSeats([]);
        if (selectedSeats.length == 0) return toast.error("please select seats")

            selectedSeats.map((ele: any) => {
                seats.map((elem: any) => {
                    return elem.row === ele.row && elem.column === ele.column&&  ele.isSelected ?  toast.error("Seat is already taken"):''

                });
                 
               
                 
            });
            
      
        const response = await book(event?._id as string, selectedSeats, currentUser.id)
        console.log(" the respnseeeeeeeee -----------------------", response)
        handleSeatSelection()
        if (response.success) {
            await loadStripe("pk_test_51PFyqWSEhUTiu13xKxIRFqzlwRSAvqHPNSJ0EfCCjE37wcSfKFBZmKiv2oJY1gnaSWPmKb4HgfpITlKqwZ70Amoo00Rwxor5D4")
            const payments = await payment(event?._id as string, currentUser.id, selectedSeats, event?.paymentAmount as string , postId as string)
            console.log(payments)
            window.location = payments
        } else {
            toast.error("seat Already taken")
        }

    };

    return (
        <>
            <div className="w-full flex flex-col gap-5 p-7 items-center h-screen">
                <div className="w-full h-[60px] flex items-center p-5 bg-white rounded-md border-2">
                    <div className="w-7/12">
                        <h1 className="font-bold text-xl">Seat Booking</h1>
                    </div>
                    <Toaster />
                    <div className="w-5/12  ">
                        <div className="flex gap-6">
                            <span className="flex gap-2 w-[4rem] me-8 ">
                                <div className=" rounded-md ">Amount </div>
                                <p className="font-medium text-black">{`${event?.paymentAmount}/-`}</p>
                            </span>

                            <span className="flex gap-2">
                                <div className="w-6 h-6 bg-white rounded-md border-2"></div>
                                <p className="font-medium text-gray-400">Available Seat</p>
                            </span>
                            <span className="flex gap-2">
                                <div className="w-6 h-6 bg-gray-100 rounded-md border-2"></div>
                                <p className="font-medium text-gray-400">booked Seat</p>
                            </span>
                            <span className="flex gap-2">
                                <div className="w-6 h-6 bg-green-400 rounded-md border-2"></div>
                                <p className="font-medium text-gray-400">Your Seat</p>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Seat grid */}
                <div className="w-full pt-12 h-[500px] bg-white">
                    {seats.map((row: Seat[], rowIndex: number) => (
                        <div key={rowIndex} className="flex h-auto justify-center">
                            <div className="h-8 pe-5 flex items-center text-gray-500">
                                {row[0]?.row}
                            </div>
                            {row.map((seat: Seat, columnIndex: number) => (
                                <div
                                    key={`${rowIndex}-${columnIndex}`}
                                    className={`h-8 cursor-pointer ${seat.userSelected
                                        ? "bg-sky-300 text-white" :
                                         selectedSeats.find((val)=>val.row == seat.row&& val.column === seat.column) ?"bg-sky-300 text-white":
                                        seat.booked && seat.userId === currentUser.id ? "bg-green-400 text-white" :
                                            seat.booked
                                                ? " bg-gray-200 border-gray-200 text-gray-400"
                                                :
                                                seat.isSelected ? " bg-gray-200 border-gray-200 text-gray-400" : seat.selected
                                                    ? "bg-white text-white border-0"
                                                    : "bg-white border-sky-400 text-sky-400"
                                        } border w-9 m-1 rounded-md flex items-center justify-center`}
                                    onClick={() =>
                                        handleSeatClick(seat.row, seat.column, seat.selected, seat.booked, seat.isSelected)
                                    }
                                >
                                    {seat.column}
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className="w-full bg-white p-9 flex justify-center">
                        <button
                            onClick={handleConfirmBooking}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
                        >
                            Confirm Booking
                        </button>
                        <div>
                        
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};
