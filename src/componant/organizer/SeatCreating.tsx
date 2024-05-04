import React, { useRef, useState } from "react";

interface Seat {
    row: string; // Change row type to string for alphabet letters
    column: number;
    booked: boolean;
    selected: boolean;
    userSelected: boolean;
}

interface Propose {
    seatArranging: (seat: Seat[]) => void
}

const SeatCreating: React.FC<Propose> = ({ seatArranging }) => {
    const [seats, setSeats] = useState<Seat[][]>([]);
    const [selectedSeats, setSelectedSeats] = useState<{ row: string; column: number }[]>([]);
    const [show,setShow] = useState<boolean>(false)

    const rowInputRef = useRef<HTMLInputElement>(null);
    const columnInputRef = useRef<HTMLInputElement>(null);

    const createSeats = () => {
        const numRows = parseInt(rowInputRef.current?.value || "0");
        const numColumns = parseInt(columnInputRef.current?.value || "0");
        const newSeats: Seat[][] = [];

        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); // Declare alphabet here

        for (let i = 0; i < numRows; i++) {
            const row: Seat[] = [];
            for (let j = 0; j < numColumns; j++) {
                row.push({
                    row: alphabet[i], // Use alphabet letters for rows
                    column: j + 1, // Column numbers start from 1
                    booked: false,
                    selected: false,
                    userSelected: false
                });
            }
            newSeats.push(row);
            if(newSeats){
                setShow(true)
            }
        }

        setSeats(newSeats);
    };

    const handleSeatClick = (row: string, column: number) => {
        const updatedSeats = [...seats];
        const seat = updatedSeats[row.charCodeAt(0) - 65][column - 1];
        seat.selected = !seat.selected;

        setSelectedSeats(
            seat.selected
                ? [...selectedSeats, { row, column }]
                : selectedSeats.filter((selectedSeat) => !(selectedSeat.row === row && selectedSeat.column === column))
        );
        setSeats(updatedSeats);
    };

    const exportSeats = () => {
        const availableSeats: { row: string; column: number }[] = [];
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); 
        seats.forEach((row, rowIndex) => {
            row.forEach((seat) => {
                availableSeats.push({ ...seat });
            });
        });
        console.log("Available Seats:", availableSeats);
        seatArranging(availableSeats as Seat[])

    };

    return (
        <>
            <div className="w-[90%] h-[900px] flex flex-col gap-4">
                <div className="w-full flex  gap-3">
                    <div className="w-5/12 flex flex-col gap-3">
                        <div className="w-[15rem] flex  gap-2">
                            <label className="w-[4rem]" htmlFor="row">Row  :</label>
                            <input type="number" name="row" ref={rowInputRef} className="ps-3  w-[10rem] h-[2rem] rounded-md border-2 border-gray-400" />
                        </div>
                        <div className="w-[15rem] flex  gap-2" >
                            <label htmlFor="column" className="w-[4rem]">Column :</label>
                            <input className="  w-[10rem] rounded-md border-2 ps-3 border-gray-400 h-[2rem]" type="number" name="column" ref={columnInputRef} />
                        </div>
                    </div>
                    <div className="flex gap-4 ">
                        <span className="flex  gap-2">
                            <div className="bg-gray-300 rounded-md w-6 h-6  ">

                            </div>
                             <p className="font-medium text-gray-400">Disabled Seat</p>
                        </span>
                        <span className="flex  gap-2">
                            <div className=" w-6 h-6 bg-white border-sky-400 rounded-md border-2">

                            </div>
                             <p className="font-medium text-gray-400">Active Seat</p>
                        </span>
                    </div>

                </div>
                <div>
                    <button onClick={createSeats} className="w-[7rem] h-[2rem] [-2] bg-blue-500 rounded-md">Create Seats</button>
                </div>
                <div>
                    {seats.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex   h-auto justify-center">
                                <div className="h-8 pe-5 flex items-center text-gray-500">
                                {row[0].row}
                                </div>
                            {row.map((seat, columnIndex) => (
                                <div
                                    key={`${rowIndex}-${columnIndex}`}
                                    className={` h-8 cursor-pointer ${seat.selected ? "bg-gray-300 text-gray-400" : seat.booked ? "bg-red-500" : "bg-white border-sky-400 text-sky-400 "
                                        } border w-9 m-1 rounded-md  flex items-center justify-center `}
                                    onClick={() => handleSeatClick(seat.row, seat.column)}
                                >{`${seat.column}`}</div>
                            ))}
                        </div>
                    ))}
                </div>
                <div>

                    {
                        show&&<button className="w-[7rem] h-[2rem] [-2] bg-blue-500 rounded-md" onClick={exportSeats}>Export Seats</button>
                    }
                </div>
            </div>
        </>
    );
};

export default SeatCreating;
