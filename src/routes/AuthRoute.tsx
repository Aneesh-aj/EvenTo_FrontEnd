import { Route, Routes } from "react-router-dom"
import Signup from "../page/users/UserSignup"
import Login from "../page/users/UserLogin"
import OrganizerRegistration from "../page/organizer/OrganizerSignup"
import ErrorPage from "../componant/common/ErrorPage"
import OtpForm from "../page/users/Otp"
import AdminLogin from "../page/admin/AdminLogin"
import OrganizerLogin from "../page/organizer/OrganizerLogin"

function CommonRoutes() {
    return (
        <>
            <Routes>
                    <Route path="/userSignup" element={<Signup />} />
                    <Route path="/userLogin" element={<Login />} />
                    <Route path="/otp/:email" element={<OtpForm/>} />
                    <Route path="/adminlogin" element={<AdminLogin/>} />
                    <Route path="/organizerRegister" element={<OrganizerRegistration/>} />
                    <Route path="/organizerLogin" element={<OrganizerLogin/>} />
                                  
                    {/* <Route path="/adminlogin" element={< AdminLogin/>} /> */}
                    <Route path="*" element={<ErrorPage/>} />

            </Routes>
        </>
    )
}

export default CommonRoutes