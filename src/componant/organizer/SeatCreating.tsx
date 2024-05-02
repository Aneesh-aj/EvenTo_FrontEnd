import React, { useRef, useState } from "react";

interface Seat {
    row: string; // Change row type to string for alphabet letters
    column: number;
    booked: boolean;
    selected: boolean;
    userSelected:boolean;
}

interface Propose{
    seatArranging : (seat:Seat[])=> void
}

const SeatCreating: React.FC<Propose> = ({seatArranging}) => {
    const [seats, setSeats] = useState<Seat[][]>([]);
    const [selectedSeats, setSelectedSeats] = useState<{ row: string; column: number }[]>([]);

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
                    userSelected:false
                });
            }
            newSeats.push(row);
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
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); // Declare alphabet here
        seats.forEach((row, rowIndex) => {
            row.forEach((seat) => {
                    availableSeats.push({...seat});
            });
        });
        console.log("Available Seats:", availableSeats);
        seatArranging(availableSeats as Seat[])
        
    };

    return (
        <>
            <div className="w-[90%] h-[900px] flex flex-col gap-4">
                <div className="w-full flex flex-col gap-3">
                    <div className="w-[15rem] flex  gap-2">
                        <label className="w-[4rem]" htmlFor="row">Row  :</label>
                        <input type="number"  name="row" ref={rowInputRef} className="bg-blue-200 w-[10rem] rounded-md border-2 border-black" />
                    </div>
                    <div  className="w-[15rem] flex  gap-2" >
                        <label htmlFor="column" className="w-[4rem]">Column :</label>
                        <input  className="bg-blue-200 w-[10rem] rounded-md border-2 border-black" type="number" name="column" ref={columnInputRef} />
                    </div>
                    <div>
                    <button onClick={createSeats} className="w-[7rem] h-[2rem] [-2] bg-blue-500 rounded-md">Create Seats</button>
                    </div>
                </div>
                <div>
                    {seats.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex gap-2  h-auto justify-center">
                            {row.map((seat, columnIndex) => (
                                <div
                                    key={`${rowIndex}-${columnIndex}`}
                                    className={`w-8 h-8 cursor-pointer ${
                                        seat.selected ? "bg-yellow-500" : seat.booked ? "bg-red-500" : "bg-green-500"
                                    } border border-gray-300`}
                                    onClick={() => handleSeatClick(seat.row, seat.column)}
                                >{`${seat.row}${seat.column}`}</div>
                            ))}
                        </div>
                    ))}
                </div>
                <div>
                    
                    <button className="w-[7rem] h-[2rem] [-2] bg-blue-500 rounded-md" onClick={exportSeats}>Export Seats</button>
                </div>
            </div>
        </>
    );
};

export default SeatCreating;
