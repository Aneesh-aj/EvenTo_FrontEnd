import Api from "../survices/axios";
import userRoutes from "../survices/endpoints/userEndPoint";
import { userFormData } from "../@types/user";
import { loginData } from "../@types/loginType";
import { Seat } from "../@types/eventType";



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
        console.log(" the response from the usersss---------",response)
        return response.data
    }catch(error:any){
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

  export const allOrganizers = async()=>{
     try{
      const response = await Api.get(userRoutes.getAllorganizer)
      console.log(" the data form the api",response)
       return response.data
     }catch(error){
        throw error
     }
  }

  export const getPostDetails = async(id:string)=>{
     try{
        const response = await Api.get(userRoutes.getPostDetails+`/${id}`)
        return response.data
     }catch(error){
        throw error
     }
  }


  export const getAllseat = async(id:string)=>{
    try{
        const response = await Api.get(userRoutes.getSeats+`/${id}`)
        return response.data

    }catch(error){
        throw error
    }
  }


  export const book = async(id:string,selectedSeat:Seat[],userId:string)=>{
    try{
        const response = await Api.post(userRoutes.booking,{id,selectedSeat,userId})
        return response.data
    }catch(error){
        throw error
    }
  }

  export const payment = async(eventId:string,userId:string,seat:Seat[],amount:string,postId: string)=>{
     try{
         const response = await Api.post(userRoutes.payments,{eventId,userId,seat,amount,postId})
         console.log(response,"j")
         return response.data
     }catch(error){
         throw error
     }
  }

  export const  searchEventPost = async(searchQuery:string)=>{
    try{
      const response = await Api.get(userRoutes.searchQuery+`/${searchQuery}`)
      return  response.data
    }catch(error){
        throw error
    }
  }
  

  export const getAllcategory = async()=>{
     try{
        const response = await Api.get(userRoutes.getCategory)
        return response.data
     }catch(error){
        throw error
     }
  }
  

  export const bookings = async(id:string)=>{
    try{
          const response = await Api.get(userRoutes.bookings+`/${id}`)
          return response.data
    }catch(error){
         throw error
    }
  }


  export const  updatePassword= async(user:any)=>{
        try{
            const response = await Api.post(userRoutes.updatePassword,{email:user.email,password:user.password})
            return response.data
        }catch(error){
            throw error
        }
  }

  export const otpSenting = async (email: string, name: string) => {
    try {
      const response = await Api.post(userRoutes.otpSenting, { email: email, name: name })
      console.log("the result ", response)
      return response.data
    } catch (error: any) {
      return error
    }
  }

  export const sendMessage = async (senterId:string,receiverId:string,message:string,imageUrl:string)=>{
    try{
       const response = await Api.post(userRoutes.sendMessage,{senterId:senterId,receiverId:receiverId,message:message,imageUrl:imageUrl})
       return response.data
    }catch(error){
        return error
    }
  }

  export const getChat= async(senterId:string,receiverId:string)=>{
    try{ 

        const response = await Api.get(userRoutes.getChat)
        return response.data
    }catch(error){
        return error
    }
  }

  