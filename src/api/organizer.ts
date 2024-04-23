import Api from "../survices/axios"
import organizerRoutes from "../survices/endpoints/organizerEndPoint"
import { IorganizerFormData } from "../@types/organizer"



export const organizerSignup = async (organizerData: IorganizerFormData) => {
  try {
    const response = await Api.post(organizerRoutes.organizerSignup, organizerData)
    console.log("sucesss", response.data)
    return response.data
  } catch (error: any) {
    console.log("eroror mwonu", error)
    return error
  }
}

export const otpSenting = async (email: string, name: string) => {
  try {
    const response = await Api.post(organizerRoutes.otpSenting, { email: email, name: name })
    console.log("the result ", response)
    return response
  } catch (error: any) {
    return error
  }
}

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await Api.post(organizerRoutes.verifyOtp, { email: email, otp: otp })
    console.log(" ther response", response)
    return response.data
  } catch (error) {
    return error
  }
}

export const orgLout = async () => {
  try {
    const response = await Api.post(organizerRoutes.logout)
    console.log("comigng", response)
    return response.data
  } catch (error) {
    throw error
  }
}

export const isApprove = async (id: string) => {
  try {
    const response = await Api.post(organizerRoutes.approve + `/${id}`)
    console.log(response.data)
    return response.data
  }
  catch (error) {
    throw error
  }
}
export const organizerLogin = async (email: string, password: string) => {
  try {
    const response = await Api.post(organizerRoutes.organizerLogin, { email, password })
    return response.data
  } catch (error) {
    throw error
  }
}

export const findbyId = async (id: string) => {
  try {
    const response = await Api.get(organizerRoutes.profile + `/${id}`)
     console.log(" the data :::?..>" , response)
    return response.data
  } catch (error) {
    throw error
  }
}


export const uploadBackground= async(id:string,img:string)=>{
   try{
       const response = await Api.post(organizerRoutes.uploadBackground,{id:id,image:img})
       return response.data

   }catch(error){
     throw error
   }
}


export const uploadProfilePicture= async(id:string,img:string)=>{
  try{
      const response = await Api.post(organizerRoutes.uploadProfilePicture,{id:id,image:img})
      return response.data

  }catch(error){
    throw error
  }
}

export const resendOtp= async(email:string)=>{
  try{
      const response = await Api.post(organizerRoutes.resendOtp,{email:email})
      return response.data

  }catch(error){
    throw error
  }
}


export const fetchEvent = async(id:string)=>{
   try{
     const response = await Api.get(organizerRoutes.getEvents+`/${id}`)
      return response.data
   }catch(error){
     throw error
   }
}