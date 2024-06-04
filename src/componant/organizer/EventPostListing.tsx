import { useEffect, useState } from "react"
import bg from "../../assets/3902762.jpg"
import { useNavigate } from "react-router-dom"
import { getEventPost } from "../../api/organizer"
import image from "../../assets/9318688.jpg"
import useGetUser from "../../hook/useGetUser"

export const EventPostListing = () => {
    const [eventPosts,setEventPosts] = useState([])
    const navigate = useNavigate()
    const currentUser = useGetUser()
     
     useEffect(()=>{
        async function fetchAllpost(){
               const response = await getEventPost(currentUser.id)
               console.log(" -----------____________------",response)
               setEventPosts(response.eventPost)
        }
        fetchAllpost()
   },[])
    

    return (
        <>
            <div className="w-full ">
                <div className="w-full bg-white border-2 p-2 rounded-md shadow-xl">
                    <h1 className="font-bold">Your Events</h1>
                </div>
                {
                    eventPosts && eventPosts.map((ele: any) => {
                        return (
                            <div className="w-full bg-white mt-3 p-3 rounded-md border-2 shadow-md">
                                <div className=" rounded-md w-full h-[6rem] flex justify-center">
                                    <img src={ele.image} className="w-full h-full object-cover rounded-md" alt="" />
                                </div>
                                <div className="p-2 w-full">
                                    <h1 className="font-bold">{ele.title}</h1>

                                </div>
                                <div className="w-full p-2 h-[5rem]">
                                    <p className="h-full text-sm break-words overflow-hidden">
                                       {ele.about}
                                    </p>
                                </div>
                                <div className="w-full p-2 flex justify-center">
                                    <button onClick={()=>navigate(`/organizer/eventPostDetails/${ele._id}`)} className="w-8/12 h-[2rem] text-sm rounded-2xl text-white bg-violet-600">more...</button>
                                </div>
                            </div>
                        )
                    })
                }{
                    eventPosts.length ==0 && <>
                        <div className="w-full bg-red-100 h-[13rem] mt-8">
                            <img src={image} className="w-full h-full" alt="" />
                        </div>
                    </>
                 }
            </div>



        </>
    )
}