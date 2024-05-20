import { useEffect } from "react"
import bg from "../../assets/3902762.jpg"

export const EventPostListing = () => {

    useEffect(() => {

    })

    return (
        <>
            <div className="w-full ">
                <div className="w-full bg-white border-2 p-2 rounded-md shadow-xl">
                    <h1 className="font-bold">Your Events</h1>
                </div>
                <div className="w-full bg-white mt-3 p-3 rounded-md border-2 shadow-md">
                    <div className="p-2 w-full h-[6rem] flex justify-center">
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
                <div className="w-full bg-white mt-3 p-3 rounded-md border-2 shadow-md">
                    <div className="p-2 w-full h-[6rem] flex justify-center">
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
                <div className="w-full bg-white mt-3 p-3 rounded-md border-2 shadow-md">
                    <div className="p-2 w-full h-[6rem] flex justify-center">
                        <img src={bg} className="w-11/12 h-full object-cover" alt="" />
                    </div>
                    <div className="p-2 w-full">
                        <h1 className="font-bold">Name of the event</h1>

                    </div>
                    <div className="w-full p-2 h-[5rem]">
                        <p className="text-sm break-words overflow-hidden">
                            Lorratensjdfkhskdfhskdjfkhsdkfjhskdfhkshjdfkjshkdfhsjfkhsdim.
                        </p>
                    </div>
                    <div className="w-full p-2 flex justify-center">
                        <button className="w-8/12 h-[2rem] text-sm rounded-2xl text-white bg-violet-600">more...</button>
                    </div>
                </div>
            </div>



        </>
    )
}