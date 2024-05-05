import Api from "../survices/axios"
import organizerRoutes from "../survices/endpoints/organizerEndPoint"
import { IorganizerFormData } from "../@types/organizer"
import { eventFormData } from "../@types/eventType"



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

export const Allcategory = async ()=>{
  try{
    const response = await Api.get(organizerRoutes.allcategory)
       return response.data
  }catch(error){
    throw error
  }
}


export const organizerProfileEdit = async(id:string,formData:object)=>{
   try{

      console.log(" the form data ",formData)
       const response = await Api.post(organizerRoutes.profileEdit,{id,formData})
        return response.data
   }catch(error){
     throw error
   }
}


export const getCategory = async(id:string)=>{
  try{
       const response = await Api.get(organizerRoutes.eventCategory+`/${id}`)
       return response.data
  }catch(error){
     throw error
  }
}

export const createEvent= async(data:any)=>{
   try{   
            console.log(" data is before that  clalinggg",data)
            data.date = data.date.toString()
            data.endingTime = data.endingTime.toString()
            data.startingTime = data.startingTime.toString()
          const response = await Api.post(organizerRoutes.eventCreation,{data:data})
          return response.data
   }catch(error){
     throw error
   }
}

export const getAllEvents = async(id:string)=>{
   try{
      const response = await Api.get(organizerRoutes.getAllEvents+`/${id}`)
      return response.data
   }catch(error){
     throw error
   }
}


export const geteventDetails = async(id:string)=>{
  try{
     const response = await Api.get(organizerRoutes.getEventDetails+`/${id}`)
     return response.data
  }catch(error){
     throw error
  }
}