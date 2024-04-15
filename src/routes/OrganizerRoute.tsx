import { Route, Routes } from "react-router-dom";
import OrganizerProfile from "../page/organizer/OrganizerProfile";
import ErrorPage from "../componant/ErrorPage";
import OrganizerRegistration from "../page/organizer/OrganizerSignup";
import { WaitingPage } from "../componant/WaitingPage";
import useGetUser from "../hook/useGetUser";
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
