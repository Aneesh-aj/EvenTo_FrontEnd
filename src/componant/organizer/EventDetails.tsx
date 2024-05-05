import { Divider } from "@mui/material"
import Nav from "../common/Nav"



export const EventDetails = () => {
    return (
        <>  <Nav />
            <div className="w-full pt-20 flex flex-col mb-8 items-center bg-white ">
                <div className=" w-[80%] p-6 h-auto flex flex-col  gap-6">
                    <h1 className="font-bold text-2xl">Information</h1>
                    <Divider />
                </div>
                <div className="w-[80%] ">
                    <ul className="p-6 flex flex-col gap-3">
                        <li>
                            <div className="w-full flex">
                                <div className="w-32  ">Name</div>
                                <span>:</span>
                                <div className="w-40  ps-2"> aneesh</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32  ">email</div>
                                <span>:</span>
                                <div className="w-40  ps-2"> aneesh@gmail.com</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32  ">Phone number</div>
                                <span>:</span>
                                <div className="w-40  ps-2"> 993678297</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32  ">country</div>
                                <span>:</span>
                                <div className="w-40  ps-2"> india</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32  ">State</div>
                                <span>:</span>
                                <div className="w-40  ps-2"> kerala</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32  ">City</div>
                                <span>:</span>
                                <div className="w-40  ps-2"> mongam</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32  ">pincode</div>
                                <span>:</span>
                                <div className="w-40  ps-2"> 673631</div>
                            </div>
                        </li>
                      
                    </ul>
                </div>
                <div className=" w-[80%] p-6 h-auto flex flex-col gap-6">
                    <h1 className="font-bold text-2xl">Event Information</h1>
                    <Divider />
                </div>
                <div className="w-[80%] ">
                    <ul className="p-6 flex flex-col gap-3">
                        <li>
                            <div className="w-full flex">
                                <div className="w-32  ">Organizer</div>
                                <span>:</span>
                                <div className="w-40  ps-2"> evenTomanagment</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32  ">category</div>
                                <span>:</span>
                                <div className="w-40  ps-2"> Tech Event</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32  ">EventType</div>
                                <span>:</span>
                                <div className="w-40  ps-2"> public</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32  ">Date & Time</div>
                                <span>:</span>
                                <div className="w-40  ps-2"> date and issue</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32  ">State</div>
                                <span>:</span>
                                <div className="w-40  ps-2"> kerala</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32  ">City</div>
                                <span>:</span>
                                <div className="w-40  ps-2"> mongam</div>
                            </div>
                        </li>
                        <li>
                            <div className="w-full flex">
                                <div className="w-32  ">pincode</div>
                                <span>:</span>
                                <div className="w-40  ps-2"> 673631</div>
                            </div>
                        </li>
                      
                    </ul>
                </div>
                <div className="w-[80%] flex justify-end">
                    <button className="w-[5rem] rounded-lg h-[2rem] bg-blue-500 text-white">Post</button>
                </div>
            </div>

        </>
    )
}