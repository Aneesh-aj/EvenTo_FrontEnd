import Api from "../survices/axios"
import adminRoutes from "../survices/endpoints/adminEndPoint"

export const allRequests = async()=>{
    try{
      const response = await Api.get(adminRoutes.getAllrequests)
       return response.data
    }catch(error){
      throw error
    }
 }

 export const allRequestsPending = async()=>{
   try{
      const response = await Api.post(adminRoutes.requestPendings)
       return response.data
   }catch(error){
      throw error
   }
 }
 

 export const allRequestAccepts = async(limit:number,offset:number)=>{
   try{
      const response = await Api.post(adminRoutes.requestAccepted,{limit:limit,offset:offset})
       return response.data
   }catch(error){
      throw error
   }
 }

 export const getCategory = async()=>{
    try{
        const response = await Api.get(adminRoutes.getAllCategory)
        return response.data
    }catch(error){
        throw error
    }
 }


 export const editCategory= async(id:string,category:string)=>{
    try{
        const response = await Api.post(adminRoutes.editCategorys,{id:id,category:category})
        return response.data
    }catch(error){
         throw error
    }
 }

 export const adminLogin = async(email:string,password:string)=>{
     try{
        const response = await Api.post(adminRoutes.login,{email:email,password:password})
        return response.data
     }catch(error){
        throw error
     }
 }

 export const addCategory = async(name:string)=>{
   try{
       const response = await Api.post(adminRoutes.addCategory,{category:name})
       return response.data
   }catch(error){
      throw error
   }
 }

 export const deleteCategory= async(id:string)=>{
   try{
      console.log(" commmmmmmmmmmmmm")
      const response = await Api.post(adminRoutes.deleteCategory+`/${id}`)
        return response.data
   }catch(error){
      throw error
   }
 }

 export const fetchGraphData = async()=>{
   try{      console.log(" collllllllllllllllllllllllllllllllllllllll")
          const response = await Api.get(adminRoutes.fetchGraphData)
          console.log(" response____",response.data)
          return response.data.data
   }catch(error){
      throw error
   }
 }


 export const fetchDashboard=async()=>{
   try{
      const response = await Api.get(adminRoutes.dashboard)
      console.log(")))))))))))))))))))))",response)
      return response.data
   }catch(error){
      throw error
   }
 }