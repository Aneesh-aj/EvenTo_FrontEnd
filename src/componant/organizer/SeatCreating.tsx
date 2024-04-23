import React, { useRef, useState } from "react";

interface Seat {
    row: number;
    column: number;
    booked: boolean;
    selected: boolean;
    userSelected: boolean;
}

const SeatCreating: React.FC = () => {
    const [seats, setSeats] = useState<Seat[][]>([]);
    const [selectedSeats, setSelectedSeats] = useState<{ row: number; column: number }[]>([]);

    const rowInputRef = useRef<HTMLInputElement>(null);
    const columnInputRef = useRef<HTMLInputElement>(null);

    const createSeats = () => {
        const numRows = parseInt(rowInputRef.current?.value || "0");
        const numColumns = parseInt(columnInputRef.current?.value || "0");
        const newSeats: Seat[][] = [];

        for (let i = 0; i < numRows; i++) {
            const row: Seat[] = [];
            for (let j = 0; j < numColumns; j++) {
                row.push({
                    row: i + 1,
                    column: j + 1,
                    booked: false,
                    selected: false,
                    userSelected: false,
                });
            }
            newSeats.push(row);
        }

        setSeats(newSeats);
    };

    const handleSeatClick = (row: number, column: number) => {
        const updatedSeats = [...seats];
        const seat = updatedSeats[row - 1][column - 1];
        seat.selected = !seat.selected;
       
        setSelectedSeats(
            seat.selected
                ? [...selectedSeats, { row, column }]
                : selectedSeats.filter((selectedSeat) => !(selectedSeat.row === row && selectedSeat.column === column))
        );
        setSeats(updatedSeats);
    };

    const exportSeats = () => {
        const availableSeats: { row: number; column: number }[] = [];
        seats.forEach((row, rowIndex) => {
            row.forEach((seat) => {
                if (!seat.selected) {
                    availableSeats.push({ row: rowIndex + 1, column: seat.column });
                }
            });
        });
        console.log("Available Seats:", availableSeats);
    };

    return (
        <>
            <div className="w-full h-[900px] flex gap-4 bg-white">
                <div>
                    <div>
                        <label htmlFor="row">Row</label>
                        <input type="number" name="row" ref={rowInputRef} className="bg-blue-200" />
                    </div>
                    <div>
                        <label htmlFor="column">Column</label>
                        <input type="number" name="column" ref={columnInputRef} className="bg-blue-200" />
                    </div>
                    <button onClick={createSeats}>Create Seats</button>
                </div>
                <div>
                    {seats.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex gap-2">
                            {row.map((seat, columnIndex) => (
                                <div
                                    key={`${rowIndex}-${columnIndex}`}
                                    className={`w-8 h-8 cursor-pointer ${
                                        seat.selected ? "bg-yellow-500" : seat.booked ? "bg-red-500" : "bg-green-500"
                                    } border border-gray-300`}
                                    onClick={() => handleSeatClick(seat.row, seat.column)}
                                ></div>
                            ))}
                        </div>
                    ))}
                </div>
                <div>
                    <h2>Selected Seats:</h2>
                    <ul>
                        {selectedSeats.map((seat, index) => (
                            <li key={index}>{`Row: ${seat.row}, Column: ${seat.column}`}</li>
                        ))}
                    </ul>
                    <button onClick={exportSeats}>Export Seats</button>
                </div>
            </div>
        </>
    );
};

export default SeatCreating;
