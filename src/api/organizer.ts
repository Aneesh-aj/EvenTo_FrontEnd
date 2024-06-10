import Api from "../survices/axios"
import organizerRoutes from "../survices/endpoints/organizerEndPoint"
import { IorganizerFormData } from "../@types/organizer"
import { IeventPost, eventFormData } from "../@types/eventType"
import { post } from "../@types/post"



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
    console.log(" ther response", response.data)
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
    return error
  }
}

export const findbyId = async (id: string) => {
  try {
    const response = await Api.get(organizerRoutes.profile + `/${id}`)
    console.log(" the data :::?..>", response)
    return response.data
  } catch (error) {
    throw error
  }
}


export const uploadBackground = async (id: string, img: string) => {
  try {
    const response = await Api.post(organizerRoutes.uploadBackground, { id: id, image: img })
    return response.data

  } catch (error) {
    throw error
  }
}


export const uploadProfilePicture = async (id: string, img: string) => {
  try {
    const response = await Api.post(organizerRoutes.uploadProfilePicture, { id: id, image: img })
    return response.data

  } catch (error) {
    throw error
  }
}

export const resendOtp = async (email: string) => {
  try {
    const response = await Api.post(organizerRoutes.resendOtp, { email: email })
    return response.data

  } catch (error) {
    throw error
  }
}


export const fetchEvent = async (id: string) => {
  try {
    const response = await Api.get(organizerRoutes.getEvents + `/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const Allcategory = async () => {
  try {
    const response = await Api.get(organizerRoutes.allcategory)
    return response.data
  } catch (error) {
    throw error
  }
}


export const organizerProfileEdit = async (id: string, formData: object) => {
  try {

    console.log(" the form data ", formData)
    const response = await Api.post(organizerRoutes.profileEdit, { id, formData })
    return response.data
  } catch (error) {
    throw error
  }
}


export const getCategory = async (id: string) => {
  try {
    const response = await Api.get(organizerRoutes.eventCategory + `/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const createEvent = async (data: any) => {
  try {
    console.log(" data is before that  clalinggg", data)
    data.date = data.date.toString()
    data.endingTime = data.endingTime.toString()
    data.startingTime = data.startingTime.toString()
    const response = await Api.post(organizerRoutes.eventCreation, { data: data })
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateEvent = async (data: any,eventId:string)=> {
  try {
    console.log(" data is before that  clalinggg", data)
    data.date = data.date.toString()
    data.endingTime = data.endingTime.toString()
    data.startingTime = data.startingTime.toString()
    const response = await Api.post(organizerRoutes.updateEvent, { data: data,eventId:eventId })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getAllEvents = async (id: string,limit:number,offset:number) => {
  try {
    const response = await Api.get(organizerRoutes.getAllEvents + `/${id}?limit=${limit}&&offset=${offset}`)
    return response.data
  } catch (error) {
    throw error
  }
}


export const geteventDetails = async (id: string) => {
  try {
    const response = await Api.get(organizerRoutes.getEventDetails + `/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const createPost = async (data: any) => {
  try {
    const response = await Api.post(organizerRoutes.postEvent, { data: data })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getAlleventPost = async () => {
  try {
    const response = await Api.get(organizerRoutes.eventPosts)
    return response.data

  } catch (error) {
    throw error
  }
}

export const getUpcomingEvent = async(id:string,limit:number,offset:number)=>{
   try{
      console.log(" call coming ",limit , offset)
      const response = await Api.get(organizerRoutes.getUpcomingEvent+`/${id}?limit=${limit}&&offset=${offset}`)
      return response.data
   }catch(error){
     throw error
   }
}

export const changeEventStatus = async(status:string,eventId:string,organizerId:string)=>{
  try{
     const response = await Api.post(organizerRoutes.changeStatus,{eventStatus:status,eventId:eventId,organizerId:organizerId})
     return response.data
  }catch(error){
     throw error
  }
}

export const cancelEvent = async(eventId:string,organizerId:string)=>{
  try{
     const response = await Api.post(organizerRoutes.cancelEvent,{eventId:eventId,organizerId:organizerId})
     return response.data
  }catch(error){
     throw error
  }
}

export const getEventPost = async (id:string) => {
  try {
    const response = await Api.get(organizerRoutes.getEventPostWithId+`/${id}`)
    return response.data

  } catch (error) {
    throw error
  }
}

export const updatePost = async(formData:IeventPost,id:string)=>{
    try{
        console.log("----------------------------------------------formdata-----",formData)
        const response = await Api.post(organizerRoutes.updatePost,{formData:formData,id:id})
        return response.data
    }catch(error){
       throw error
    }
}

export const fetchAllBooking = async(eventId:string)=>{
  try{
     const response = await Api.get(organizerRoutes.getBooking+`/${eventId}`)
     return response.data
  }catch(error){
     throw error
  }
}


export const getRequest=async (id:string)=>{
   try{
      const response = await Api.get(organizerRoutes.getAllRequests+`/${id}`)
      return response.data
   }catch(error){
     throw error
   }
}

export const getRequestDetails = async(id:string)=>{
  try{
      const response = await Api.get(organizerRoutes.getRequestDetails+`/${id}`)
      return response.data
  }catch(error){
     throw error
  }
}


export const ApproveRequest = async(id:string)=>{
  try{
      const response = await Api.post(organizerRoutes.approveRequest,{id:id})
      return response.data
  }catch(error){
     throw error
  }
}

export const RejectRequest = async(id:string)=>{
  try{
    const response = await Api.post(organizerRoutes.rejectRequest,{id:id})
    return response.data
  }catch(error){
     throw error
  }
}

export const requestCreateEvent = async (data: any,id:string) => {
  try {
    console.log(" data is before that  clalinggg", data)
    data.date = data.date.toString()
    data.endingTime = data.endingTime.toString()
    data.startingTime = data.startingTime.toString()
    const response = await Api.post(organizerRoutes.requestEventCreat, { data: data,id:id })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getChatUsers = async(id:string)=>{
  try{
     const response = await Api.get(organizerRoutes.getUserChat+`/${id}`)
     return response.data
  }catch(error){
     throw error
  }
}

export const postCreation = async(data:post)=>{
  try{
       const response = await Api.post(organizerRoutes.postCreate,{data:data})
       return response.data
  }catch(error){
    throw error
  }
}

export const postUpdate = async(postId:string,data:post)=>{
  try{
     
       
       const response = await Api.post(organizerRoutes.postUpdate,{postId:postId,data:data})
       return response.data
  }catch(error){
    throw error
  }
}

export const postDelete = async(postId:string)=>{
  try{
       const response = await Api.post(organizerRoutes.postDelete+`/${postId}`)
       return response.data
  }catch(error){
    throw error
  }
}

export const getPost = async(organizerId:string)=>{
  try{
      const response = await Api.get(organizerRoutes.getPosts+`/${organizerId}`)
      console.log("  and then ",response)
      return response.data
  }catch(error){
     throw error
  }
}

export const dashBoardData =async(organizerId:string)=>{
  try{
       const response = await Api.get(organizerRoutes.getDashboardData+`/${organizerId}`)
       return response.data
  }catch(error){
     throw error
  }
}
