import { Route, Routes } from "react-router-dom"
import AdminRequest from "../page/admin/AdminRequest"
import AdminLogin from "../page/admin/AdminLogin"
import Organizers from "../page/admin/OrganizerManagment"
// import AdminRequest from "../Pages/AdminPages/AdminRequest"
// // import AdminLogin from "../Pages/AdminPages/AdminLogin"
// import RequestDetails from "../Pages/AdminPages/RequestDetails"
// import AdminProtected from "./protectedRoute/AdminProctedRoute"
// import Errorpage from "../Components/404page"
// import Users from 
// import Organizers from "../Pages/AdminPages/organizer"



function AdminRoutes() {
    return (
        <>
            <Routes>
            
                    <Route path="/Requests" element={<AdminRequest />} />
                    {/* <Route path="/users" element={<Users/>} />                    */}
                     <Route path="/login" element={< AdminLogin/>} />
                    {/* <Route path="/RequestDetails/:id" element={<RequestDetails />} /> */}
                    <Route path="/organizers" element={<Organizers/>} />
                    {/* <Route path="*" element={<Errorpage/>} /> */}


            </Routes>

        </>
    )
}

export default AdminRoutes