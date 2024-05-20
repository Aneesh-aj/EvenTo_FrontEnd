import Nav from "../../componant/common/Nav"
import bg from "../../assets/9264885.jpg"

export const OrganizerEventPost = () => {
    return (
        <>
            <Nav />
            <div className="w-full  pt-20 h-auto flex flex-col items-center">
                <div className="w-full ps-8 pe-6">
                    <div className="h-[3rem] rounded-md w-full  p-2  bg-white border-2 ">
                        <div className="h-full flex  items-center p-3">
                            <h1 className="font-bold">Event Posts</h1>
                        </div>
                    </div>
                </div>
                <div className="w-11/12 flex gap-2 ">

                    <div className="w-3/12 bg-white mt-3 p-3 rounded-md border-2 shadow-md">
                        <div className="p-2 w-full h-[10rem] flex justify-center">
                            <img src={bg} className="w-11/12 h-full object-cover" alt="" />
                        </div>
                        <div className="p-2 w-full">
                            <h1 className="font-bold">Name of the event</h1>

                        </div>
                        <div className="w-full p-2 h-[5rem]">
                            <p className="text-sm break-words">
                                Lorratensjdfkhskdfhskdjfkhsdkfjhskdfhkshjdfkjshkdfhsjfkhsdim.
                            </p>
                        </div>
                        <div className="w-full p-2 flex justify-center">
                            <button className="w-8/12 h-[2rem] text-sm rounded-2xl text-white bg-violet-600">more...</button>
                        </div>
                    </div>
                    <div className="w-3/12 bg-white mt-3 p-3 rounded-md border-2 shadow-md">
                        <div className="p-2 w-full h-[10rem] flex justify-center">
                            <img src={bg} className="w-11/12 h-full object-cover" alt="" />
                        </div>
                        <div className="p-2 w-full">
                            <h1 className="font-bold">Name of the event</h1>

                        </div>
                        <div className="w-full p-2 h-[5rem]">
                            <p className="text-sm break-words">
                                Lorratensjdfkhskdfhskdjfkhsdkfjhskdfhkshjdfkjshkdfhsjfkhsdim.
                            </p>
                        </div>
                        <div className="w-full p-2 flex justify-center">
                            <button className="w-8/12 h-[2rem] text-sm rounded-2xl text-white bg-violet-600">more...</button>
                        </div>
                    </div>
                    <div className="w-3/12 bg-white mt-3 p-3 rounded-md border-2 shadow-md">
                        <div className="p-2 w-full h-[10rem] flex justify-center">
                            <img src={bg} className="w-11/12 h-full object-cover" alt="" />
                        </div>
                        <div className="p-2 w-full">
                            <h1 className="font-bold">Name of the event</h1>

                        </div>
                        <div className="w-full p-2 h-[5rem]">
                            <p className="text-sm break-words">
                                Lorratensjdfkhskdfhskdjfkhsdkfjhskdfhkshjdfkjshkdfhsjfkhsdim.
                            </p>
                        </div>
                        <div className="w-full p-2 flex justify-center">
                            <button className="w-8/12 h-[2rem] text-sm rounded-2xl text-white bg-violet-600">more...</button>
                        </div>
                    </div>
                    <div className="w-3/12 bg-white mt-3 p-3 rounded-md border-2 shadow-md">
                        <div className="p-2 w-full h-[10rem] flex justify-center">
                            <img src={bg} className="w-11/12 h-full object-cover" alt="" />
                        </div>
                        <div className="p-2 w-full">
                            <h1 className="font-bold">Name of the event</h1>

                        </div>
                        <div className="w-full p-2 h-[5rem]">
                            <p className="text-sm break-words">
                                Lorratensjdfkhskdfhskdjfkhsdkfjhskdfhkshjdfkjshkdfhsjfkhsdim.
                            </p>
                        </div>
                        <div className="w-full p-2 flex justify-center">
                            <button className="w-8/12 h-[2rem] text-sm rounded-2xl text-white bg-violet-600">more...</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}