import { Route, Routes } from "react-router-dom";
import OrganizerProfile from "../page/organizer/OrganizerProfile";
import ErrorPage from "../componant/common/ErrorPage";
import OrganizerRegistration from "../page/organizer/OrganizerSignup";
import { WaitingPage } from "../componant/organizer/WaitingPage";
import useGetUser from "../hook/useGetUser";
import OrganizerDashboard from "../page/organizer/OrganizerPannel";
import { EventDetails } from "../componant/organizer/EventDetails";
// import Nice from "../componant/organizer/TabNavigater";
// import { useEffect } from "react";
// import { OrganizerPending } from "../page/organizer/OrganizerPending";

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
                        <Route path="/message/:id" element={<OrganizerDashboard/>} />
                        <Route path="/eventDetails/:id" element={<EventDetails/>} />

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
