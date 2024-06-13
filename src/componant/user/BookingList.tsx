import { useEffect, useState } from 'react';
import { WhatsappShareButton } from 'react-share';
import { bookings } from '../../api/user';
import useGetUser from '../../hook/useGetUser';
import { Country, State } from 'country-state-city';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from 'react-router-dom';

interface EventDetails {
  _id: string;
  name: string;
  date: string;
  startingTime: string;
  endingTime: string;
  eventCity: string;
  eventState: string;
  eventCountry: string;
}

interface Booking {
  _id: string;
  eventDetails: EventDetails[];
}

interface LocationMap {
  [key: string]: string | undefined;
}

export const BookingList = () => {
  const currentUser = useGetUser();
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [locationMap, setLocationMap] = useState<LocationMap>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchBooking() {
      const allBooking = await bookings(currentUser.id);
      console.log("Bookings:", allBooking);

      const locationMap: LocationMap = {};

      const filteredBookings = allBooking.bookings.filter((booking: Booking) => {
        const eventDetails = booking.eventDetails[0];
        const eventDateTime = new Date(eventDetails.date);
        return eventDateTime > new Date();
      });

      for (const booking of filteredBookings) {
        const eventDetails = booking.eventDetails[0];

        if (!locationMap[eventDetails.eventState]) {
          const state = State.getStateByCode(eventDetails.eventState);
          if (state) {
            locationMap[eventDetails.eventState] = state.name;
          }
        }

        if (!locationMap[eventDetails.eventCountry]) {
          const country = Country.getCountryByCode(eventDetails.eventCountry);
          if (country) {
            locationMap[eventDetails.eventCountry] = country.name;
          }
        }
      }

      setLocationMap(locationMap);
      setUserBookings(filteredBookings);
      setLoading(false);
    }

    fetchBooking();
  }, [currentUser.id]);

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
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes.toString();
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  };

  return (
    <div>
      {loading ? (
        Array(3).fill(0).map((_, index) => (
          <div key={index} className="lg:w-[80%] sm:w-full mx-auto shadow-lg bg-transparent rounded-2xl overflow-hidden mt-3">
            <div className="ticket flex flex-col sm:flex-row p-4">
              <div className="flex items-start justify-between p-2 sm:p-4">
                <Skeleton width={96} height={128} />
                <div className="ml-4">
                  <Skeleton width={150} height={20} />
                  <Skeleton width={100} height={20} />
                  <Skeleton width={200} height={20} />
                  <Skeleton width={180} height={20} />
                </div>
                <div className="flex-shrink-0"></div>
              </div>
              <div className="ticket-dashed my-4"></div>
              <div className="text-center sm:p-5 sm:ms-3 sm:me-3">
                <Skeleton width={100} height={20} />
                <Skeleton width={80} height={20} />
                <Skeleton width={200} height={20} />
                <Skeleton width={150} height={20} />
              </div>
              <div className="ticket-dashed my-4"></div>
              <div className="text-center sm:p-4 flex flex-col sm:gap-4">
                <Skeleton width={200} height={20} />
                <div className="flex items-center justify-between">
                  <Skeleton width={80} height={20} />
                  <Skeleton width={80} height={20} />
                </div>
              </div>
              <div className="w-[100%] sm:w-[30%] flex sm:justify-end justify-center my-4">
                <div className="flex flex-row sm:flex-col gap-3">
                  <Skeleton width={35} height={35} circle />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        userBookings.map((ele: any) => {
          const day = ele.eventDetails[0].date.split(' ');
          const eventDetails = ele.eventDetails[0];
          const stateName = locationMap[eventDetails.eventState];
          const countryName = locationMap[eventDetails.eventCountry];

          return (
            <div key={ele._id} className="lg:w-[80%] sm:w-full mx-auto shadow-lg bg-transparent rounded-2xl overflow-hidden mt-3" onClick={()=>navigate(`/user/postDetails/${ele.postId}`)}>
              <div className="ticket flex flex-col sm:flex-row">
                <div className="flex items-start justify-between p-2 sm:p-4">
                  <img
                    className="w-20 h-24 sm:w-24 sm:h-32 object-cover rounded-lg"
                    src={ele.postDetails[0].image}
                    alt="Event"
                  />
                  <div className="ml-4">
                    <h2 className="text-xl font-bold">{ele.postDetails[0].title}</h2>
                    <p className="text-sm text-gray-600">{eventDetails.name}</p>
                    <p className="text-sm text-gray-600">
                      {day[0]} , {formatDate(eventDetails.date)} | {formatTime(eventDetails.startingTime)} to {formatTime(eventDetails.endingTime)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {eventDetails.eventCity}, {stateName}, {countryName}
                    </p>
                  </div>
                  <div className="flex-shrink-0"></div>
                </div>

                <div className="ticket-dashed my-4"></div>

                <div className="text-center sm:p-5 sm:ms-3 sm:me-3">
                  <p className="text-lg font-bold">Booking Details</p>
                  <p className="text-sm text-gray-600">{ele.seat.length} Ticket(s)</p>
                  <p className="text-sm text-gray-600">
                    Booking Seats -
                    {ele.seat.map((seat: any) => `${seat.row}${seat.column}`).join(', ')}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">BOOKING ID: <span className="font-medium">{ele.bookingId}</span></p>
                </div>

                <div className="ticket-dashed my-4"></div>

                <div className="text-center sm:p-4 flex flex-col sm:gap-4">
                  <p className="text-sm text-gray-600">Cancellation not available for this venue</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-lg font-bold">Rs.{ele.paidAmound}</p>
                  </div>
                </div>

                <div className="w-[100%] sm:w-[30%] flex sm:justify-end justify-center my-4">
                  <div className="flex flex-row sm:flex-col gap-3">
                    <h1 className="font-bold">Share</h1>
                    <WhatsappShareButton url={'http://localhost:5173/user/bookedlist'}>
                      <img width="35" height="35" src="https://img.icons8.com/3d-fluency/94/whatsapp.png" alt="whatsapp" />
                    </WhatsappShareButton>
                  </div>
                </div>
                <div className="border-t border-gray-300 my-4"></div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
