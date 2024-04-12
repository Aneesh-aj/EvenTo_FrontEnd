import {  useState } from "react";
import useGetUser from "../hook/useGetUser";
import { logout } from "../api/user";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { orgLout } from "../api/organizer";

const Nav: React.FC = () => {
    const role = useGetUser().role;
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [path, setPath] = useState<boolean>(true);
    
    
    async function logingOut (){
       const response = await logout()
       if(response.sucess){
          dispatch(setUser({role:"",name:"",email:"",id:""}))
          toast.success(response.message)
          navigate("/")
       }else{
           toast.error("unable to log out")
       }
    }
    async function organizerLogout(){
        const response = await orgLout()
        console.log(" whahah",response)
          if(response.success){
            dispatch(setUser({role:"",name:"",email:"",id:""}))
          toast.success(response.message)
          navigate("/")
          }else{
             toast.error("enable to logout")
          }
    }
     function adminLogout(){
        dispatch(setUser({role:"",name:"",email:"",id:""}))
        // toast.success(response.message)
        navigate("/")
    }
    
    return (
        <>  {!role&&path && <>
            <div className="bg-white fixed w-full text-black p-4 border shadow-lg rounded-2xl">
            <Toaster position="top-right" reverseOrder={false}/>  

                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl  font-bold">EvenTo</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <a href="/" className="hover:text-gray-300">Home</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300">Events</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300">About</a>
                            </li>
                        
                        </ul>
                    </nav>
                </div>
            </div>

        </>}
            {role === "user" && <>
                <div className="bg-white  w-full text-black p-4 border z-10 shadow-lg fixed">
                <Toaster position="top-right" reverseOrder={false}/>  

                    <div className="container mx-auto flex justify-between items-center">
                        <h1 className="text-2xl  font-bold">EvenTo</h1>
                        <nav>
                            <ul className="flex space-x-4">
                                <li>
                                    <a href="/" className="hover:text-gray-300">Home</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-gray-300"></a>
                                </li>
                                <li>
                                    <a href="/user/profile" className="hover:text-gray-300">profile</a>
                                </li>
                            
                                <li>
                                    <button onClick={logingOut} className="bg-blue-400 pt-1 pb-1 ps-3 pe-3 text-white rounded-md hover:bg-blue-300">logout</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </>

            }
             {role === "organizer" && <>
                <div className="bg-white fixed w-full text-black p-4 border shadow-lg">
                    <div className="container mx-auto flex justify-between items-center">
                    <Toaster position="top-right" reverseOrder={false}/>  
                        <h1 className="text-2xl  font-bold">EvenTo</h1>
                        <nav>
                            <ul className="flex space-x-4">
                                <li>

                                    {/* <a href="#" className="hover:text-gray-300">{role}</a> */}
                                </li>
                                <li>
                                    <a href="#" className="hover:text-gray-300">Events</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-gray-300">About</a>
                                </li>
                                <li>
                                    <button onClick={organizerLogout} className="bg-blue-400 pt-1 pb-1 ps-3 pe-3 text-white rounded-md hover:bg-blue-300">logout</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </>

            }{role=="requestPending"&&
                <>
                  <div className="bg-white fixed w-full text-black p-4 border shadow-lg">
                    <div className="container mx-auto flex justify-between items-center">
                    <Toaster position="top-right" reverseOrder={false}/>  
                        <h1 className="text-2xl  font-bold">EvenTo</h1>
                        <nav>
                            <ul className="flex space-x-4">
                              
                                <li>
                                    <a href="/organizer/pending" className="hover:text-gray-300">Event</a>
                                </li>
                                <li>
                                    <button onClick={organizerLogout} className="bg-blue-400 pt-1 pb-1 ps-3 pe-3 text-white rounded-md hover:bg-blue-300">logout</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                </>
            }
             {role === "admin" && <>
                <div className="bg-white fixed w-full text-black p-4 border shadow-lg">
                    <div className="container mx-auto flex justify-between items-center">
                        <h1 className="text-2xl  font-bold">EvenTo</h1>
                        <nav>
                            <ul className="flex space-x-4">
                                <li>
                                    <a href="/admin/organizers" className="hover:text-gray-300">organizer</a>
                                </li>
                                <li>
                                    <a href="/admin/users" className="hover:text-gray-300">Users</a>
                                </li>
                                <li>
                                    <a href="/admin/request" className="hover:text-gray-300">request</a>
                                </li>
                                <li>
                                    <button onClick={adminLogout} className="bg-blue-400 pt-1 pb-1 ps-3 pe-3 text-white rounded-md hover:bg-blue-300">logout</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </>

            }

        </>
    );
}

export default Nav;
