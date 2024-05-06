import { useSelector } from "react-redux";
import { currentUser } from "../@types/allTypes";

const useGetUser=()=>{
    const user = useSelector((state:{user:currentUser})=>state.user)

    return user
}

export default useGetUser