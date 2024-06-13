import { useState } from "react";
import useGetUser from "../../hook/useGetUser";
import { logout } from "../../api/user";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { orgLout } from "../../api/organizer";

const Nav: React.FC = () => {
    const role = useGetUser().role;
    const currentUser = useGetUser();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);

    async function logingOut() {
         await logout();
     
            dispatch(setUser({ role: "", name: "", email: "", id: "" }));
            toast.success(" user Logout successfully!!!");
            navigate("/");
        
    }

    async function organizerLogout() {
        await orgLout();
        dispatch(setUser({ role: "", name: "", email: "", id: "" }));
        toast.success("Logged out successfully");
        navigate("/");
    }

    async function organizerLogoutReq() {
        const response = await orgLout();
        if (response.success) {
            dispatch(setUser({ role: "", name: "", email: "", id: "" }));
            toast.success(response.message);
            navigate("/");
        } else {
            toast.error("Unable to log out");
        }
    }

    function adminLogout() {
        dispatch(setUser({ role: "", name: "", email: "", id: "" }));
        navigate("/");
    }

    return (
        <>
            <div className="bg-white fixed w-full text-black p-4 border shadow-lg z-30">
                <Toaster position="top-right" reverseOrder={false} />
                <div className="container mx-auto flex flex-col xl:flex-row justify-between items-center ">
                    <div className="w-full xl:w-[100%] flex  ">
                        <h1 className="text-2xl w-[50%] font-extrabold ">EvenTo</h1>
                        <div className="md:hidden w-[50%]  flex justify-end">
                            <button onClick={handleToggle} className="text-black focus:outline-none">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <nav className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center  w-full md:w-auto `}>
                        <ul className="flex w-full flex-col md:flex-row  md:space-x-4 mt-4 md:mt-0 md:ml-auto ">
                            {!role && (
                                <>
                                    <li className=" border-t-2 xl:border-t-0   rounded-sm  w-full flex justify-center"><a href="/" className="hover:text-gray-500 block py-2 md:py-0">Home</a></li>
                                    <li  className=" xl:border-b-0 w-full  flex justify-center"><a href="#" className="hover:text-gray-500 block py-2 md:py-0">Events</a></li>
                                    <li  className=" w-full flex justify-center"><a href="#" className="hover:text-gray-500 block py-2 md:py-0">About</a></li>
                                    <li  className=" xl:border-b-0 w-full  flex justify-center"><a href="#"  className="hover:text-gray-500 block py-2 md:py-0"></a></li>

                                    <li className=" xl:border-b-0 w-full  flex justify-center  gap-3"><button onClick={()=>navigate('/auth/userLogin')} className="block w-[50%] xl:hidden bg-blue-400 pt-1 pb-1 px-3 text-white rounded-md hover:bg-blue-300 md:inline-block mt-2 md:mt-0">Login </button>
                                    <button onClick={()=>navigate('/auth/userSignup')} className="block xl:hidden w-[50%] bg-blue-400 pt-1 pb-1 px-3 text-white rounded-md hover:bg-blue-300 md:inline-block mt-2 md:mt-0">Signup</button>
                                    </li>

                                </>
                            )}
                            {role === "user" && (
                                <>
                                    <li  className="border-t-2 xl:border-t-0 xl:border-b-0 w-full flex justify-center"><a href="/" className="hover:text-gray-500 block py-2 md:py-0">Home</a></li>
                                    <li  className=" xl:border-b-0 w-full flex justify-center"><a href="/user/booking" className="hover:text-gray-500 block py-2 md:py-0">Booking</a></li>
                                    <li  className=" xl:border-b-0 w-full flex justify-center"><a href="/user/events" className="hover:text-gray-500 block py-2 md:py-0">Events</a></li>
                                    <li  className=" xl:border-b-0 w-full flex justify-center"><a href={`/user/profile/${currentUser.id}`} className="hover:text-gray-500 block py-2 md:py-0">Profile</a></li>
                                    <li  className=" xl:border-b-0 w-full flex justify-center"><a href={`/user/posts`} className="hover:text-gray-500 block py-2 md:py-0">Posts</a></li>
                                    <li  className="xl:border-b-0 w-full flex justify-center"><button onClick={logingOut}  className=" w-[80%] xl:w-full shadow-md bg-blue-400 pt-1 pb-1 px-3 text-white rounded-md hover:bg-blue-300 md:inline-block mt-2 md:mt-0">Logout</button></li>
                                </>
                            )}
                            {role === "organizer" && (
                                <>
                                    <li className="border-t-2 xl:border-b-0 w-full flex justify-center"><a href={`/organizer/dashboard/${currentUser.id}`} className="hover:text-gray-500 block py-2 md:py-0">Events</a></li>
                                    <li className=" xl:border-b-0 w-full flex justify-center"><a href={`/organizer/message`} className="hover:text-gray-500 block py-2 md:py-0">Message</a></li>
                                    <li className=" xl:border-b-0 w-full flex justify-center"><a href={`/organizer/profile/${currentUser.id}`} className="hover:text-gray-500 block py-2 md:py-0">Profile</a></li>
                                    <li className=" xl:border-b-0 w-full flex justify-center"><a href={`/organizer/organizerEventPost/${currentUser.id}`} className="hover:text-gray-500 block py-2 md:py-0">EventPost</a></li>
                                    <li className=" xl:border-b-0 w-full flex justify-center"><button onClick={organizerLogout} className="  bg-blue-400 pt-1 pb-1 px-3 text-white rounded-md hover:bg-blue-300 block md:inline-block mt-2 md:mt-0">Logout</button></li>
                                </>
                            )}
                            {role === "admin" && (
                                <>
                                    <li><a href="/admin/dashboard" className="hover:text-gray-500 block py-2 md:py-0">Dashboard</a></li>
                                    <li><a href="/admin/organizers" className="hover:text-gray-500 block py-2 md:py-0">Organizers</a></li>
                                    <li><a href="/admin/users" className="hover:text-gray-500 block py-2 md:py-0">Users</a></li>
                                    <li><a href="/admin/request" className="hover:text-gray-500 block py-2 md:py-0">Request</a></li>
                                    <li><a href="/admin/category" className="hover:text-gray-500 block py-2 md:py-0">Category</a></li>
                                    <li><button onClick={adminLogout} className="bg-blue-400 pt-1 pb-1 px-3 text-white rounded-md hover:bg-blue-300 block md:inline-block mt-2 md:mt-0">Logout</button></li>
                                </>
                            )}
                            {role === "requestPending" && (
                                <>
                                    <li><a href="/pending" className="hover:text-gray-500 block py-2 md:py-0">Event</a></li>
                                    <li><button onClick={organizerLogoutReq} className="bg-blue-400 pt-1 pb-1 px-3 text-white rounded-md hover:bg-blue-300 block md:inline-block mt-2 md:mt-0">Logout</button></li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Nav;
