import { useEffect, useState } from "react"
import image from "../../assets/3255337.jpg"
// import Api from "../survices/axios"
import { isApprove } from "../../api/organizer"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { currentUser } from "../../@types/allTypes"
import { setApproval, setUser } from "../../redux/userSlice"
import useGetUser from "../../hook/useGetUser"

export const WaitingPage = () => {
    const [isApproved,setApprove]= useState<boolean>()
    const navigate = useNavigate()
    const user = useSelector((state:{user:currentUser})=>state.user)
    const dispatch = useDispatch()
    const currentUser = useGetUser()
    useEffect(()=>{
      async function callingFunction(){
        const approve = await isApprove(user.id)
          console.log(" the approval",approve)
         dispatch(setUser({
             role:currentUser.role,
             name:currentUser.name,
             email:currentUser.email,
             id:currentUser.id,
             blocked:currentUser.blocked,
             approve:approve.approval
         }))
         setApprove(approve.approval)
         
      }
      callingFunction()
    },[])

    async function move(){
         navigate("/auth/organizerLogin")
    }

    return (
        <>
           
            <div className="flex w-full h-screen justify-center  bg-white">
                <div className="flex justify-center items-center gap-2 w-10/12 content-center h-screen">
                    <div className="w-full h-96 object-contain">
                        <img src={image} className="h-full w-full" alt="" />
                    </div>
                    <div className="w-full h-96 p-10">
                        <h1 className=" p-8f font-bolder text-3xl">Waiting for the Admin response</h1>
                        <p className="p-8">Your request to become an organizer has been sent to the admin. you have to wait until you get some response from the admin. make sure that you are not applying multiple times to this website. we are really greatful that you chose our website to explore and contribute to the world of events. Enjoy your journey with us.</p>
                        <div  className="w-full flex justify-end">
                             {
                                isApproved && isApproved === true && <button onClick={move} className="ps-3 pe-3 pt-1 pb-1 bg-blue-700 text-white rounded-md">Continue</button>
                             }
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}