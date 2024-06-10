import { useEffect, useState } from "react"
import { BottumBar } from "../../componant/common/BottumBar"
import Nav from "../../componant/common/Nav"
import { SideBar } from "../../componant/common/SideBar"
import { UserEventListing } from "../../componant/user/UserEventListing"
import { getAlleventPost } from "../../api/organizer"
import { getAllcategory } from "../../api/user"


export const Events = () => {
    return (
        <>

            <Nav />
            <div className="w-full flex pt-16 bg-white xl:pt-12 gap-0 xl:gap-2  justify-center h-[auto]">
                <SideBar />
                <div className=" w-full xl:w-9/12 mt-5 flex flex-col p-0 xl:p-5  gap-6 xl:gap-2">
                    <UserEventListing />
                </div>
            </div>
            <div className="w-full flex justify-center">
                <BottumBar />
            </div>
        </>
    )
}