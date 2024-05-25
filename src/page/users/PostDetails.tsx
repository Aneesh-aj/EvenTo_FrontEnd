import Nav from "../../componant/common/Nav"
import { PostInfo } from "../../componant/user/PostInfo"

export const PostDetails = ()=>{
    return(
        <>
         <Nav/>
            <div className="w-full flex pt-12 gap-2  justify-center  h-[auto]">
                {/* <SideBar/> */}
                <div className="w-9/12 mt-5 flex flex-col p-5 gap-2">
                    <PostInfo/>
                </div>
            </div>
        </>
    )
}