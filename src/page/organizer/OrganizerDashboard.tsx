import EventChart from "./EventChart"
import Revenue from "./Revenue"
import CustomLineChart from "./Revenue"
import CustomBarChart from "./Revenue"

export const OrganizerDashboard = () => {
    return (
        <>
            <div className="w-full  h-auto flex gap-6 flex-col">
                <div className="w-full flex justify-center">
                    <div className="w-[80%] h-[7rem] flex gap-3 ps-7 pe-7 justify-evenly">
                        <div className="w-1/4  h-full rounded-md shadow-xl">
                            <div className="w-full flex justify-center h-[40%] items-center">
                                <h1 className="font-bold ">Total Events</h1>
                            </div>
                            <div className="w-full flex justify-center h-[40%] items-center ">
                                <h1 className=" font-extrabold text-4xl ">55</h1>
                            </div>
                        </div>
                        <div className="w-1/4  h-full rounded-md shadow-xl">
                            <div className="w-full flex justify-center h-[40%] items-center">
                                <h1 className="font-bold ">Total Posts</h1>
                            </div>
                            <div className="w-full flex justify-center h-[40%] items-center ">
                                <h1 className=" font-extrabold text-4xl ">8</h1>
                            </div>
                        </div>
                        <div className="w-1/4  h-full rounded-md shadow-xl">
                            <div className="w-full flex justify-center h-[40%] items-center">
                                <h1 className="font-bold ">Total Revenue</h1>
                            </div>
                            <div className="w-full flex justify-center h-[40%] items-center ">
                                <h1 className=" font-extrabold text-4xl ">2955</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[100%] h-[400px]  flex justify-center items-center">
                    <div className=" w-[50%] h-full flex justify-center items-center">
                        <Revenue />
                    </div>
                    <div className="w-[50%] h-full flex justify-center items-center">
                        <EventChart />
                    </div>
                </div>
            </div>
        </>
    )
}