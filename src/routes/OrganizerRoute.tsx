import { Route, Routes } from "react-router-dom";
import OrganizerProfile from "../page/organizer/OrganizerProfile";
import ErrorPage from "../componant/common/ErrorPage";
import OrganizerRegistration from "../page/organizer/OrganizerSignup";
import { WaitingPage } from "../componant/organizer/WaitingPage";
import useGetUser from "../hook/useGetUser";
import OrganizerDashboard from "../page/organizer/OrganizerPannel";
import { EventDetails } from "../componant/organizer/EventDetails";
import { OrganizerEventPost } from "../page/organizer/OrganizerEventPost";
import { OrganizerEventPostDetails } from "../page/organizer/OrganizerEventPostDetails";
import { EventEntryList } from "../page/organizer/EventEntryList";
import EventEdit from "../page/organizer/EventEdit";
import { Chat } from "../componant/common/chat/Chat";
import { RequestDetails } from "../componant/organizer/RequestDetails";
import RequestEventCreation from "../componant/organizer/RequestEventCreation";
import OrganizerForgotPassword from "../page/organizer/OragnizerForgotPasswrod";
import { Blocked } from "../componant/common/Blocked";

function OrganizerRoutes() {
    const role = useGetUser().role;
    
     console.log(" the role")
    return (
        <>
            <Routes>
                {role && role === "organizer" && (
                    <>
                        <Route path="/Registration" element={<OrganizerRegistration />} />
                        <Route path="/profile/:id" element={<OrganizerProfile />} />
                        <Route path="/Dashboard/:id" element={<OrganizerDashboard/>} />
                        <Route path="/events/:id" element={<OrganizerDashboard/>} />
                        <Route path="/requests/:id" element={<OrganizerDashboard/>} />
                        <Route path="/message" element={<Chat/>} />
                        <Route path="/message/:id" element={<Chat/>} />
                        <Route path="/eventDetails/:id" element={<EventDetails/>} />
                        <Route path="/organizerEventPost/:id" element={<OrganizerEventPost/>} />
                        <Route path="/eventPostDetails/:id" element={<OrganizerEventPostDetails/>} />
                        <Route path="/eventEdit/:id" element={<EventEdit/>} />
                        <Route path="/entrys/:id" element={<EventEntryList/>} />
                        <Route path="/organizer/blocked" element={<Blocked/>} />
                        <Route path="/requestDetails/:id" element={<RequestDetails/>} />
                        <Route path="/requestEventCreation/:id" element={<RequestEventCreation/>} />
                        <Route path="*" element={<ErrorPage />} />
                    </>
                )}
                {role && role === "requestPending" && (
                    <>
                    
                    <Route path="/pending" element={<WaitingPage />} /> </>
                )}
            </Routes>
        </>
    );
}

export default OrganizerRoutes;
