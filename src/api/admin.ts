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