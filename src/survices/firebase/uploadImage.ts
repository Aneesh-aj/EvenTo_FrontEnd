import { getDownloadURL,ref,uploadBytes } from "firebase/storage";
import  {firebaseDB} from "./config"
import  {v4 } from "uuid"



const UploadImage = async (image:any) :Promise <any>=>{
    const imgRef = ref(firebaseDB,`/organizerDetails/${v4()+image.name}`)

    if(image){
        try{
            console.log("entrings to theis function")
            const snapshot = await uploadBytes(imgRef,image)
            const downloeadUrl = await getDownloadURL(imgRef)
            console.log("get the downlead",downloeadUrl)
            return downloeadUrl
        }catch(error:any){
            console.log("console.loggggg eorororo",error)
        }
    }
}


export default UploadImage