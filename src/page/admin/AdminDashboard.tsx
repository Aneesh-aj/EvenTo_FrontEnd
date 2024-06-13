import { useEffect, useState } from "react"
import Nav from "../../componant/common/Nav"
import AdminChart from "./AdminChart"
import { fetchDashboard } from "../../api/admin"


export const AdminDashboard = () => {
     const [data,setData]=useState<{user:number,organizer:number,events:number}>()
    useEffect(()=>{
         async function fetchData(){
            const response = await fetchDashboard()
            console.log(" dhjas board",response)
            setData(response.data)
         }
         fetchData()
    },[])
    
     
    return (
        <>  
             <Nav/>
            <div className="w-full  h-auto flex gap-6 flex-col pt-20">
                <div className="w-full flex justify-center">
                    <div className="w-[80%] h-[7rem] flex gap-3 ps-7 pe-7 justify-evenly">
                        <div className="w-1/4  h-full rounded-md shadow-xl">
                            <div className="w-full flex justify-center h-[40%] items-center">
                                <h1 className="font-bold ">Total organizer</h1>
                            </div>
                            <div className="w-full flex justify-center h-[40%] items-center ">
                                <h1 className=" font-extrabold text-4xl ">{data && data?.organizer}</h1>
                            </div>
                        </div>
                        <div className="w-1/4  h-full rounded-md shadow-xl">
                            <div className="w-full flex justify-center h-[40%] items-center">
                                <h1 className="font-bold ">Total users</h1>
                            </div>
                            <div className="w-full flex justify-center h-[40%] items-center ">
                                <h1 className=" font-extrabold text-4xl ">{data && data?.user}</h1>
                            </div>
                        </div>
                        <div className="w-1/4  h-full rounded-md shadow-xl">
                            <div className="w-full flex justify-center h-[40%] items-center">
                                <h1 className="font-bold ">Total events</h1>
                            </div>
                            <div className="w-full flex justify-center h-[40%] items-center ">
                                <h1 className=" font-extrabold text-4xl ">{data && data?.events}</h1>
                            </div>
                        </div>
                       
                    </div>
                </div>
                <div className="w-[100%] h-[500px]  flex justify-center">
                   <div className="w-[80%] h-full flex justify-center">
                   <AdminChart/>
                   </div>
                </div>
            </div>
        </>
    )
}