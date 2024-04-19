import React, { useEffect, useState } from "react";
import Nav from "../../componant/common/Nav";
// import backgorund from "../../assets/FE.jpg"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useRef } from "react";
import { UploadBackgroundImage, UploadProfilePicture } from "../../survices/firebase/uploadImage";
import { findbyId, uploadBackground, uploadProfilePicture } from "../../api/organizer";
import { useSelector } from "react-redux";
import { currentUser } from "../../@types/allTypes";


const OrganizerProfile: React.FC = () => {
    
    const imageRef = useRef<HTMLInputElement>(null);
    const  profileIMG = useRef<HTMLInputElement>(null);
    const [backgroundUrl,setBackground] = useState<any>()
    const [profile,setProfile] = useState<any>()
    // const [image , setImage] = useState<File>()
    const currentUser = useSelector((state:{user:currentUser})=>state.user)
    const id = currentUser?.id
    // var img 
    async function changing(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        // alert(" the file : ",file)
        if (file) {
            const url = await UploadBackgroundImage(file);
            console.log("getting the url", url);

            setBackground(url);
             await uploadBackground(id, url);      
        }
    }

    async function changingProfile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        // alert(" the file : ",file)
        if (file) {
            const url = await UploadProfilePicture(file);
            console.log("getting the url", url);

            setProfile(url);
            const result = await uploadProfilePicture(id, url);      
        }
    }
    
    
    useEffect(() => {
        async function getInfo() {
            const organizer = await findbyId(id);
            console.log("getting the data====>", organizer.organizer.backgroundImage);
            setBackground(organizer?.organizer.backgroundImage);
            setProfile(organizer?.organizer.profielImage);
        }
        getInfo();
    }, []); 
    


    return (
        <>
            <Nav />
            <div className='h-auto   bg-[#f0f2f0] w-full flex p-2 flex-col  items-center '>

                <div className="w-full  xl:w-7/12 rounded-lg shadow mt-20 h-auto bg-white">
                    <div className="w-full rounded-lg object-contain  relative shadow bg-white h-32 xl:h-48 flex  items-end  ">
                    {/* <AddPhotoAlternateIcon className=" "/> */}
                    <button className="top-2 end-2  absolute text-white" onClick={(e)=>{imageRef.current?.click()
                         console.log(imageRef)}
                    }> <AddPhotoAlternateIcon sx={{color:"black"}} /></button>
                    <input type="file" className="hidden " onChange={(e)=>changing(e)} ref={imageRef}/>
                        <img src={backgroundUrl} className="w-full h-full rounded-md" alt="" />
                        <div
                            className="rounded-full w-28 h-28  xl:w-32 xl:h-32 bg-black absolute translate-y-16 translate-x-5 xl:translate-x-8"
                            style={{
                                backgroundImage: `url(${profile})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                         <button className="bottom-2 end-6  absolute text-white "  onClick={(e)=>{profileIMG.current?.click()}}><AddPhotoAlternateIcon  sx={{color:"black"}} /></button>
                         <input type="file" className="hidden" ref={profileIMG} onChange={(e)=>changingProfile(e)}  />
                        </div>
                    </div>
                    <div className="h-auto w-full ">
                        <h1 className="ps-4  pt-20 xl:ps-9 xl:pt-20 font-sans  text-xl xl:text-2xl font-extrabold ">Evoos Organization</h1>
                        <p className="ps-4 pt-2 xl:ps-9" >we are event organizer Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus unde quo debitis labore corrupti eaque natus, accusantium architecto quos sint iusto eligendi similique culpa dicta iure est doloremque odio officia!</p>
                        <p className="ps-4 pt-5 xl:ps-9"> 13 street stand building, calicut , kerala</p>
                        <p className="ps-4  xl:ps-9">673642 , event@gmail.com</p>
                        <div className="w-full xl:ps-4 ">
                                <button className="w-[5rem] m-4 h-[2rem]   bg-blue-500 rounded-md text-white">book</button>
                                <button className="w-[5rem] h-[2rem]  bg-blue-500 rounded-md text-white">message</button>
                        </div>
                        
                    </div>
                </div>
                <div className="w-full xl:w-7/12 bg-white h-44 mt-2">
                       <h1>posts</h1>
                </div>
               
            </div>
        </>
    )
}


export default OrganizerProfile