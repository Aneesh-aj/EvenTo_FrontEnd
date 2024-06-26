import { getDownloadURL,ref,uploadBytes } from "firebase/storage";
import  {firebaseDB} from "./config"
import  {v4 } from "uuid"



const UploadImage = async (image:any) :Promise <any>=>{
    const imgRef = ref(firebaseDB,`/organizerDetails/${v4()+image.name}`)

    if(image){
        try{
            await uploadBytes(imgRef,image)
            const downloeadUrl = await getDownloadURL(imgRef)
          
            return downloeadUrl
        }catch(error:any){
            throw error
        }
    }
}

 export const UploadBackgroundImage = async (image:File):Promise <any>=>{
    console.log(" the image  from the upload" , image)
    const imageRef = ref(firebaseDB,`/organizerDetails/backgroundPicture${v4()+image.name}`)
    if(image){
        try{
            await uploadBytes(imageRef,image)
            const downloeadUrl = await getDownloadURL(imageRef)
            return downloeadUrl
        }catch(error){
            throw error
        }
    }
}

export const UploadProfilePicture = async (image:File):Promise <any>=>{
    console.log(" the image  from the upload" , image)
    const imageRef = ref(firebaseDB,`/organizerDetails/backgroundPicture/${v4()+image.name}`)
    if(image){
        try{
            await uploadBytes(imageRef,image)
            const downloeadUrl = await getDownloadURL(imageRef)
            return downloeadUrl
        }catch(error){
            throw error
        }
    }
}


export const userProfileUpload = async (image:File):Promise <any>=>{
    console.log(" the image  from the upload" , image)
    const imageRef = ref(firebaseDB,`/user/profile/${v4()+image.name}`)
    if(image){
        try{
            console.log("-----------1")
            await uploadBytes(imageRef,image)
            console.log("------------------2")
            const downloeadUrl = await getDownloadURL(imageRef)
            console.log(" --------------3")
            return downloeadUrl
        }catch(error){
            console.log(" 0000",error)
            throw error
        }
    }
}


export const eventPostImageUploead = async (image:File):Promise <any>=>{
    console.log(" the image  from the upload" , image)
    const imageRef = ref(firebaseDB,`/organizer/eventPost/${v4()+image.name}`)
    if(image){
        try{
            await uploadBytes(imageRef,image)
            const downloeadUrl = await getDownloadURL(imageRef)
            return downloeadUrl
        }catch(error){
            throw error
        }
    }
}

export const sentImageUpload = async(image:File):Promise <any>=>{
    console.log(" the image  from the upload" , image)
    const imageRef = ref(firebaseDB,`/chat/image/${v4()+image.name}`)
    if(image){
        try{
            await uploadBytes(imageRef,image)
            const downloeadUrl = await getDownloadURL(imageRef)
            return downloeadUrl
        }catch(error){
            throw error
        }
    }
}

export default UploadImage