import React from 'react';
import './style.css';  

const MovieTicket = () => {
  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
      <div className="ticket">
        <div className="flex items-start justify-between p-4">
          <img
            className="w-24 h-32 object-cover rounded-lg"
            src="https://via.placeholder.com/150"
            alt="Movie Poster"
          />
          <div className="ml-4">
            <h2 className="text-xl font-bold">Aavesham (U/A)</h2>
            <p className="text-sm text-gray-600">Malayalam, 2D</p>
            <p className="text-sm text-gray-600">Sun, 14 Apr | 04:30 PM</p>
            <p className="text-sm text-gray-600">Surabhi Cinemas: Kozhikode</p>
          </div>
          <div className="flex-shrink-0">
            <p className="text-xs text-gray-600 transform rotate-90">Box Office Pickup</p>
          </div>
        </div>

        <div className="ticket-dashed my-4"></div>

        <div className="text-center">
          <p className="text-sm text-gray-600">3 Ticket(s)</p>
          <p className="text-lg font-bold">Blue Pearl</p>
          <p className="text-sm text-gray-600">Blue Pearl - E8, E7, E9</p>
          <p className="text-sm text-gray-600 mt-2">BOOKING ID: <span className="font-medium">7B3028A5</span></p>
        </div>

        <div className="ticket-dashed my-4"></div>

        <div className="text-center">
          <p className="text-sm text-gray-600">Cancellation not available for this venue</p>
        </div>

        <div className="border-t border-gray-300 my-4"></div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Total Amount</p>
          <p className="text-lg font-bold">Rs.604.41</p>
        </div>

        <div className="border-t border-gray-300 my-4"></div>

        <div className="text-center">
          <p className="text-sm text-gray-600">Contact support</p>
        </div>
      </div>
    </div>
  );
};

export default MovieTicket;