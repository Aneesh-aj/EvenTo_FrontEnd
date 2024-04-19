import Api from "../survices/axios";
import userRoutes from "../survices/endpoints/userEndPoint";
import { userFormData } from "../@types/user";
import { loginData } from "../@types/loginType";



export const signup = async (userData: userFormData) => {
    try {
        const response = await Api.post(userRoutes.signup, userData)
        return response.data
    } catch (error: any) {
        return error
    }
}

export const login = async (loginData: loginData) => {
    try {
        const response = await Api.post(userRoutes.login, loginData)
        return response.data
    } catch (error) {
        return error
    }
}

export const otpVerify = async (otp: string) => {
    try {
        console.log("what is the data and its type",otp,typeof otp)
        const response = await Api.post(userRoutes.verifyOTP, {otp:otp})
        console.log(" after that api call ", response)
        return response.data
    } catch (error:any) {
        console.log("the eroror of called fucntion",error.response.data.status,error.response.data.message,error.response.data.success)
        return error
    }
}

export const logout = async ()=>{
     try{
        const response = await Api.post(userRoutes.logout)
        console.log(" the respoe",response)
       
        return response.data
     }catch(error){
        throw error
     }
}


export const userDetails= async (id : string)=>{
       try{
          const response = await Api.get(userRoutes.getUser+`/${id}`)
          return response.data
       }catch(error){
         throw error
       }
}

export const profileEdit= async (id:string,formData:any)=>{
     try{
         const response = await Api.post(userRoutes.profileEdit+`/${id}`,{formData})
          return response.data
     }catch(error){
        throw error
     }
}


export const userUploadPicture= async(id:string,img:string)=>{
    try{
        const response = await Api.post(userRoutes.uploadProfile,{id:id,image:img})
        return response.data
  
    }catch(error){
      throw error
    }
  }

  export const resendOtp= async(email:string)=>{
    try{
        const response = await Api.post(userRoutes.resendOpt,{email:email})
        return response.data
  
    }catch(error){
      throw error
    }
  }