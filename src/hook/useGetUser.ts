import { useSelector } from "react-redux";
import { currentUser } from "../@types/allTypes";

const useGetUser=()=>{
    const user = useSelector((state:{user:currentUser})=>state.user)
    console.log("from the hook",user)

    console.log("yess it is user hook",user.role)
    return user
}

export default useGetUser