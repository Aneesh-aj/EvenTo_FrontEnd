import { WhatsappShareButton } from 'react-share';
import bg from "../../assets/decorated-banquet-hall-with-flowers.jpg"


export const BoookingList =()=>{
    return(
        <div className=" lg:w-[80%] sm:w-full mx-auto   shadow-lg rounded-2xl overflow-hidden mt-10">
        <div className="ticket flex flex-col sm:flex-row  ">
          <div className="flex items-start  justify-between p-4">
            <img
              className="w-24 h-32 object-cover rounded-lg"
              src={bg}
              alt="Movie Poster"
            />
            <div className="ml-4">
              <h2 className="text-xl font-bold">Aavesham (U/A)</h2>
              <p className="text-sm text-gray-600">Malayalam, 2D</p>
              <p className="text-sm text-gray-600">Sun, 14 Apr | 04:30 PM</p>
              <p className="text-sm text-gray-600">Surabhi Cinemas: Kozhikode</p>
            </div>
            <div className="flex-shrink-0 ">

            </div>
          </div>

            <div className="ticket-dashed  my-4 "></div>

      
          <div className="text-center  p-5 ms-3 me-3">
            <p className="text-sm text-gray-600">3 Ticket(s)</p>
            <p className="text-lg font-bold">Blue Pearl</p>
            <p className="text-sm text-gray-600">Blue Pearl - E8, E7, E9</p>
            <p className="text-sm text-gray-600 mt-2">BOOKING ID: <span className="font-medium">7B3028A5</span></p>
          </div>

          <div className="ticket-dashed my-4"></div>

          <div className="text-center p-4 flex flex-col gap-4">
            <p className="text-sm text-gray-600">Cancellation not available for this venue</p>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-lg font-bold">Rs.604.41</p>
            </div>
          </div>

          <div className=" w-[30%] flex justify-end   my-4">

            <div className=' flex flex-col gap-3 '>
              <h1 className="font-bold">Share</h1>
              <WhatsappShareButton url={'http://localhost:5173/user/bookedlist'}>
                <img width="35" height="35" src="https://img.icons8.com/3d-fluency/94/whatsapp.png" alt="whatsapp" />
              </WhatsappShareButton>

            </div>
          </div>
          <div className="border-t border-gray-300 my-4"></div>

        </div>
      </div>
    )
}


// import { WhatsappShareButton } from 'react-share';
// import bg from "../../assets/decorated-banquet-hall-with-flowers.jpg";

// export const BoookingList = () => {
//   return (
//     <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
//       <div className="ticket">
//         <div className="flex items-start justify-between p-4">
//           <img
//             className="w-24 h-32 object-cover rounded-lg"
//             src={bg}
//             alt="Movie Poster"
//           />
//           <div className="ml-4">
//             <h2 className="text-xl font-bold">Aavesham (U/A)</h2>
//             <p className="text-sm text-gray-600">Malayalam, 2D</p>
//             <p className="text-sm text-gray-600">Sun, 14 Apr | 04:30 PM</p>
//             <p className="text-sm text-gray-600">Surabhi Cinemas: Kozhikode</p>
//           </div>
//           <div className="flex-shrink-0">
//             <p className="text-xs text-gray-600 transform rotate-90">Box Office Pickup</p>
//           </div>
//         </div>

//         <div className="ticket-dashed my-4"></div>

//         <div className="text-center">
//           <p className="text-sm text-gray-600">3 Ticket(s)</p>
//           <p className="text-lg font-bold">Blue Pearl</p>
//           <p className="text-sm text-gray-600">Blue Pearl - E8, E7, E9</p>
//           <p className="text-sm text-gray-600 mt-2">BOOKING ID: <span className="font-medium">7B3028A5</span></p>
//         </div>

//         <div className="ticket-dashed my-4"></div>

//         <div className="text-center">
//           <p className="text-sm text-gray-600">Cancellation not available for this venue</p>
//         </div>

//         <div className="border-t border-gray-300 my-4"></div>

//         <div className="flex items-center justify-between">
//           <p className="text-sm text-gray-600">Total Amount</p>
//           <p className="text-lg font-bold">Rs.604.41</p>
//         </div>

//         <div className="border-t border-gray-300 my-4"></div>

//         <div className="text-center">
//           <p className="text-sm text-gray-600">Contact support</p>
//         </div>
//       </div>
//     </div>
//   );
// };
