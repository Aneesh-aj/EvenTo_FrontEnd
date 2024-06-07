import CustomLineChart from "../organizer/Revenue"


export const AdminDashboard = () => {
    return (
        <>
            <div className="w-full  h-auto flex gap-6 flex-col">
                <div className="w-full flex justify-center">
                    <div className="w-[80%] h-[7rem] flex gap-3 ps-7 pe-7">
                        <div className="w-1/4  h-full rounded-md shadow-xl">
                            <div className="w-full flex justify-center h-[40%] items-center">
                                <h1 className="font-bold ">Total organizer</h1>
                            </div>
                            <div className="w-full flex justify-center h-[40%] items-center ">
                                <h1 className=" font-extrabold text-4xl ">2955</h1>
                            </div>
                        </div>
                        <div className="w-1/4  h-full rounded-md shadow-xl">
                            <div className="w-full flex justify-center h-[40%] items-center">
                                <h1 className="font-bold ">Total users</h1>
                            </div>
                            <div className="w-full flex justify-center h-[40%] items-center ">
                                <h1 className=" font-extrabold text-4xl ">2955</h1>
                            </div>
                        </div>
                        <div className="w-1/4  h-full rounded-md shadow-xl">
                            <div className="w-full flex justify-center h-[40%] items-center">
                                <h1 className="font-bold ">Total events</h1>
                            </div>
                            <div className="w-full flex justify-center h-[40%] items-center ">
                                <h1 className=" font-extrabold text-4xl ">2955</h1>
                            </div>
                        </div>
                        <div className="w-1/4 h-full rounded-md shadow-xl">
                            <div className="w-full flex justify-center h-[40%] items-center">
                                <h1 className="font-bold ">Total organizer</h1>
                            </div>
                            <div className="w-full flex justify-center h-[40%] items-center ">
                                <h1 className=" font-extrabold text-4xl ">2955</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[100%] h-[500px]  flex justify-center">
                   <div className="w-[80%] h-full flex justify-center">
                   <CustomLineChart/>
                   </div>
                </div>
            </div>
        </>
    )
}