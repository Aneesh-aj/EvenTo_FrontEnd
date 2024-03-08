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


export default UploadImage