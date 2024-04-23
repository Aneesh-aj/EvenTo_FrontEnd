import { Route, Routes } from "react-router-dom"
import Home from "../page/Home"
import ErrorPage from "../componant/common/ErrorPage"
import { ProfilePage } from "../page/users/ProfilePage"
import Organizers from "../page/users/Organizers"

function UserRoute() {
    return (
        
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:id" element={<ProfilePage/>} />
            <Route path="/organizer" element={<Organizers/>} />
            <Route path="/*" element={<ErrorPage/>} />
        </Routes>
    )
}

export default UserRoute
