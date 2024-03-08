import Api from "../survices/axios"
import organizerRoutes from "../survices/endpoints/organizerEndPoint"
import { IorganizerFormData } from "../@types/organizer"



export const organizerSignup= async(organizerData:IorganizerFormData)=>{
            const response = await Api.post(organizerRoutes.organizerSignup,organizerData)
    return response.data
}

export const otpSenting = async (email:string)=>{
    alert(email)
      const response = await Api.post(organizerRoutes.otpSenting,{"email":email})
    return response.data
}