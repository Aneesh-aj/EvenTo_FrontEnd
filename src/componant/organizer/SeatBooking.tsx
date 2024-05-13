import { useEffect, useState } from "react"
import { book, getAllseat, payment } from "../../api/user"
import { useNavigate, useParams } from "react-router-dom"
import { Ievents, Seat } from "../../@types/eventType";
import { loadStripe } from "@stripe/stripe-js"
import toast from "react-hot-toast";
import useGetUser from "../../hook/useGetUser";

export const SeatBooking = () => {
    const { id } = useParams();
    const currentUser = useGetUser()
    const [seats, setSeats] = useState<Seat[][]>([]);
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [event, setEvent] = useState<Ievents>()
    const navigate = useNavigate()

    useEffect(() => {
        async function getSeat() {
            const allSeats = await getAllseat(id as string);

            console.log("all seats ", allSeats);
            console.log(" iddddd", id)
            setEvent(allSeats.eventSeat)

            const groupedSeats: { [key: string]: Seat[] } = {};
            allSeats.eventSeat.seatArrangement.forEach((seat: Seat) => {
                if (!groupedSeats[seat.row]) {
                    groupedSeats[seat.row] = [];
                }
                groupedSeats[seat.row].push(seat);
            });

            const seatRows = Object.values(groupedSeats);

            setSeats(seatRows);
            console.log("--------------------", seats);
        }
        getSeat();
    }, []);

    console.log(" the paymetns amoudn", event?.paymentAmount)
    const handleSeatClick = (row: string, column: number, disabled: boolean, booked: boolean) => {
        if (disabled || booked) {
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
        const response = await book(id as string, selectedSeats)
        console.log(" the respnseeeeeeeee", response)
        if (response.success) {
            await loadStripe("pk_test_51PFyqWSEhUTiu13xKxIRFqzlwRSAvqHPNSJ0EfCCjE37wcSfKFBZmKiv2oJY1gnaSWPmKb4HgfpITlKqwZ70Amoo00Rwxor5D4")
            const payments = await payment(id as string, currentUser.id, selectedSeats, event?.paymentAmount as string)
            console.log(payments)
            alert(" comes")
            window.location = payments
            //  navigate(payments)
        } else {
            toast.error(response.message)
        }

    };

    return (
        <>
            <div className="w-full flex flex-col gap-5 p-7 items-center h-screen">
                {/* Seat booking header */}
                <div className="w-full h-[60px] flex items-center p-5 bg-white rounded-md border-2">
                    <div className="w-7/12">
                        <h1 className="font-bold text-xl">Seat Booking</h1>
                    </div>
                    <div className="w-5/12  ">
                        <div className="flex gap-6">
                            <span className="flex gap-2 w-[4rem] me-8 ">
                                <div className=" rounded-md ">Amount </div>
                                <p className="font-medium text-black">{`${event?.paymentAmount}/-`}</p>
                            </span>
                            <span className="flex gap-2 ">
                                <div className="bg-gray-300 rounded-md w-6 h-6"></div>
                                <p className="font-medium text-gray-400">Disabled Seat</p>
                            </span>
                            <span className="flex gap-2">
                                <div className="w-6 h-6 bg-white rounded-md border-2"></div>
                                <p className="font-medium text-gray-400">Available Seat</p>
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
                                            ? "bg-yellow-300" :
                                            seat.booked
                                                ? "bg-green-500"
                                                : seat.selected
                                                    ? "bg-gray-300 text-gray-400"
                                                    : "bg-white border-sky-400 text-sky-400"
                                        } border w-9 m-1 rounded-md flex items-center justify-center`}
                                    onClick={() =>
                                        handleSeatClick(seat.row, seat.column, seat.selected, seat.booked)
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
                    </div>
                </div>

            </div>
        </>
    );
};
