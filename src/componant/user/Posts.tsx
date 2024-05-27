import Nav from "../common/Nav"
import { SideBar } from "../common/SideBar"
import bg from "../../assets/FE.jpg"
import { Divider } from "@mui/material"

export const Posts = () => {
    return (
        <>
            <Nav />
            <div className="w-full flex gap-3  h-auto  pt-12 ps-10 pe-10">
                <SideBar />
                <div className="w-[60%] h-fit bg-white mt-10 ps-6 pt-3 pe-6 rounded-md  border-2 ">
                    <div className="w-full flex items-center p-3 gap-5 h-[5rem]">
                        <div className="rounded-full bg-red-200 w-16 h-16    "></div>
                        <div className="w-full flex items-center bg-yellow h-full">
                            <h1>event name</h1>
                        </div>
                    </div>
                    <Divider />
                    <div className="w-full h-[20rem] rounded-md bg-orange-100 mt-2 mb-2">
                        <img src={bg} className="w-full h-full rounded-md" alt="" />
                    </div>
                    <Divider />
                    <div className="w-full mt-2 bg-red-50 h-[3rem]">

                    </div>
                </div>
                <div className="w-[20%] pt-10">
                    <div className="w-full bg-white rounded-md border-2 shadow-sm p-2">
                        <h1 className="font-bold">suggetions</h1>
                    </div>
                    <div className="w-full bg-white mt-3 p-3 rounded-md border-2 shadow-md">
                        <div className=" rounded-md w-full h-[6rem] flex justify-center">
                            <img src={bg} className="w-full h-full object-cover rounded-md" alt="" />
                        </div>
                        <div className="p-2 w-full">
                            <h1 className="font-bold">random</h1>

                        </div>
                        <div className="w-full p-2 h-[5rem]">
                            <p className="h-full text-sm break-words overflow-hidden">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates magnam reprehenderit delectus repudiandae, necessitatibus voluptate, voluptatum reiciendis soluta libero illo molestias nemo culpa amet voluptatibus fuga a impedit dolores quasi.
                            </p>
                        </div>
                        <div className="w-full p-2 flex justify-center">
                            <button
                                // onClick={()=>navigate(`/organizer/eventPostDetails/${ele._id}`)}
                                className="w-8/12 h-[2rem] text-sm rounded-2xl text-white bg-violet-600">more...</button>
                        </div>
                    </div>
                    <div className="w-full bg-white mt-3 p-3 rounded-md border-2 shadow-md">
                        <div className=" rounded-md w-full h-[6rem] flex justify-center">
                            <img src={bg} className="w-full h-full object-cover rounded-md" alt="" />
                        </div>
                        <div className="p-2 w-full">
                            <h1 className="font-bold">random</h1>

                        </div>
                        <div className="w-full p-2 h-[5rem]">
                            <p className="h-full text-sm break-words overflow-hidden">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates magnam reprehenderit delectus repudiandae, necessitatibus voluptate, voluptatum reiciendis soluta libero illo molestias nemo culpa amet voluptatibus fuga a impedit dolores quasi.
                            </p>
                        </div>
                        <div className="w-full p-2 flex justify-center">
                            <button
                                // onClick={()=>navigate(`/organizer/eventPostDetails/${ele._id}`)}
                                className="w-8/12 h-[2rem] text-sm rounded-2xl text-white bg-violet-600">more...</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}