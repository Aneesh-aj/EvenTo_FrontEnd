import { Route, Routes } from "react-router-dom";
import OrganizerProfile from "../page/organizer/OrganizerProfile";
import ErrorPage from "../componant/ErrorPage";
import OrganizerRegistration from "../page/organizer/OrganizerSignup";
import { WaitingPage } from "../componant/WaitingPage";
import useGetUser from "../hook/useGetUser";

function OrganizerRoutes() {
    const role = useGetUser().role;
     console.log(" the role")
    return (
        <>
            <Routes>
                {role && role === "organizer" && (
                    <>
                        <Route path="/Registration" element={<OrganizerRegistration />} />
                        <Route path="/profile" element={<OrganizerProfile />} />
                        {/* <Route path="/Login" element={<OrganizerLogin/>} /> */}
                        {
                            console.log("not comming")
                        }
                        <Route path="*" element={<ErrorPage />} />
                    </>
                )}
                {role && role === "requestPending" && (
                    <>{console.log(" wiagingnggnngn")}
                    <Route path="/waiting" element={<WaitingPage />} /> </>
                )}
            </Routes>
        </>
    );
}

export default OrganizerRoutes;
