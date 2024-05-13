import Nav from "../../componant/common/Nav"
import { SideBar } from "../../componant/common/SideBar"
import { UserEventListing } from "../../componant/user/UserEventListing"


export const Events=()=>{
    return(
        <>
        
            <Nav/>
            <div className="w-full flex pt-12 gap-2 bg-white justify-center h-[auto]">
                <SideBar/>
                <div className="w-9/12 mt-5 flex flex-col p-5 gap-2">
                    
                     <UserEventListing/>
                    
                </div>
            </div>
        </>
    )
}