import { BottumBar } from "../../componant/common/BottumBar"
import Nav from "../../componant/common/Nav"
import { PostInfo } from "../../componant/user/PostInfo"

export const PostDetails = () => {
    return (
        <>
            <Nav />
            <div className="w-full flex pt-12 gap-2  justify-center  h-[auto]">
                {/* <SideBar/> */}
                <div className="w-full  xl:w-9/12 mt-5 flex flex-col p-1 xl:p-5 gap-2">
                    <PostInfo />
                </div>
            </div>
            <div className="w-full flex justify-center">
                <BottumBar />
            </div>
        </>
    )
}