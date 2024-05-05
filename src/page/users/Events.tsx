import Nav from "../../componant/common/Nav"
import { SideBar } from "../../componant/common/SideBar"
import { UserEventListing } from "../../componant/user/UserEventListing"


export const Events=()=>{
    return(
        <>
        
            <Nav/>
            <div className="w-full flex pt-12 gap-2  justify-center bg-white h-[auto]">
                <SideBar/>
                <div className="w-9/12 mt-9 flex flex-col p-5 gap-2">
                    <div className=" h-14 w-full">
                          <h1 className="font-bold">All Events</h1>
                    </div>
                     <UserEventListing/>
                    
                </div>
            </div>
        </>
    )
}