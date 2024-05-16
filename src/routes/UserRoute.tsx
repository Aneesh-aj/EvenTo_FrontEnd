import { Route, Routes } from "react-router-dom"
import Home from "../page/Home"
import ErrorPage from "../componant/common/ErrorPage"
import { ProfilePage } from "../page/users/ProfilePage"
import Organizers from "../page/users/Organizers"
import { Events } from "../page/users/Events"
import { PostDetails } from "../page/users/PostDetails"
import { SeatBooking } from "../componant/organizer/SeatBooking"
import MovieTicket from "../componant/user/Bookings"
import SuccessCard from "../componant/user/successCard"

function UserRoute() {
    return (
        
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:id" element={<ProfilePage/>} />
            <Route path="/booking" element={<Organizers/>} />
            <Route path="/events" element={<Events/>} />
            <Route path="/postDetails/:id" element={<PostDetails/>} />
            <Route path="/seatBooking/:id" element={<SeatBooking/>} />
            <Route path="/bookedlist" element={<MovieTicket/>}></Route>
            <Route path="/success" element={<SuccessCard/>} />
            <Route path="/*" element={<ErrorPage/>} />
        </Routes>
    )
}

export default UserRoute
