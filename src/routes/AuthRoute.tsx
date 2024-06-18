import { Navigate, Route, Routes } from "react-router-dom"
import Signup from "../page/users/UserSignup"
import Login from "../page/users/UserLogin"
import OrganizerRegistration from "../page/organizer/OrganizerSignup"
import ErrorPage from "../componant/common/ErrorPage"
import OtpForm from "../page/users/Otp"
import AdminLogin from "../page/admin/AdminLogin"
import OrganizerLogin from "../page/organizer/OrganizerLogin"
import useGetUser from "../hook/useGetUser"
import ForgotPassword from "../page/users/ForgotPassword"
import OrganizerForgotPassword from "../page/organizer/OragnizerForgotPasswrod"

function CommonRoutes() {
    const currentUser = useGetUser()
    return (
        <>
            <Routes>
                <Route path="/adminLogin" element={currentUser.role ? <Navigate to={"/"}/> : <AdminLogin />} />
                <Route path="/organizerLogin" element={<OrganizerLogin />} />
                <Route path="/userSignup" element={currentUser && currentUser.role ? <Navigate to={"/"} /> : <Signup />} />
                <Route path="/userLogin" element={currentUser && currentUser.role ? <Navigate to={"/"} /> : <Login />} />
                <Route path="/otp/:email" element={currentUser && currentUser.role ? <Navigate to={"/"} /> : <OtpForm />} />
                <Route path="/organizerRegister" element={currentUser && currentUser.role ? <Navigate to={"/"} /> : <OrganizerRegistration />} />
                <Route path="/user/forgotpassword" element={currentUser && currentUser.role ? <Navigate to={"/"} /> : <ForgotPassword />} />
                <Route path="/forgotpassword" element={<OrganizerForgotPassword />} />

                <Route path="/organizerLogin" element={currentUser && currentUser.approve === true ? <OrganizerLogin /> : <Navigate to={"/"} />} />
                {
                    currentUser && currentUser.role === "requestPending" && currentUser.approve === false && <>
                        <Navigate to={'/pending'}></Navigate>
                    </>

                }
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </>
    )
}

export default CommonRoutes