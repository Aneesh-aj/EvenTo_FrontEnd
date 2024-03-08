import Api from "../survices/axios";
import userRoutes from "../survices/endpoints/userEndPoint";
import { userFormData } from "../@types/userType";
import { loginData } from "../@types/loginType";


export const signup = async (userData: userFormData)=>{
    try{
        console.log("userData======>",userData)
        if (userData.name) {

            const response = await Api.post(userRoutes.signup,userData)
            return response.data
        }
    }catch(error){
        throw error
    }
}

export const login= async (loginData : loginData)=>{
    try{
      const response = await Api.post(userRoutes.login,loginData)
      return response.data
    }catch(error){
       throw error
    }
}