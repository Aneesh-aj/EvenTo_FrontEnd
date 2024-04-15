import Nav from "../../componant/Nav"
import Avatar from '@mui/material/Avatar';
import LoopSharpIcon from '@mui/icons-material/LoopSharp';
import TrendingFlatTwoToneIcon from '@mui/icons-material/TrendingFlatTwoTone';
import { LatestEvent } from "../../componant/LatestEvent";
import { useEffect, useRef, useState } from "react";
import EditProfileModal from "../../componant/ProfileEdit";
import useGetUser from "../../hook/useGetUser";
import { userDetails, userUploadPicture } from "../../api/user";
import { Country, State, City } from 'country-state-city';
import { userProfileUpload } from "../../survices/firebase/uploadImage";

export const ProfilePage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const currentUser = useGetUser()
    const [userData,setUser] = useState<any>()
    const [countryName,setCountry] = useState<any>() 
    const [StateName,setState] = useState<any>()
    const [cityName,setCity] = useState<any>()
    const [profile,setProfile] = useState<any>()
    const profileIMG = useRef<HTMLInputElement>(null);
    useEffect(()=>{
        async function getUser (){
             const user = await userDetails(currentUser.id)
             console.log(" the userss",user)
             setUser(user.user)
             console.log(" the image",user.user.user.profielImage)
             setProfile(user.user.user.profileImage)
              if(user.user.address){
                const coun = await Country.getCountryByCode(user.user.address.country)
                const stat = await State.getStateByCode(user.user.address.state)
                 console.log(coun?.name,stat?.name,user.user.address.city)
                 setCountry(coun?.name)
                 setState(stat?.name)
                 setCity(user.user.address.city)
              }
            }
            getUser()
        },[])
        
        console.log('======================================>userdata',userData)
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
    
    async function changingProfile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        // alert(" the file : ",file)
        if (file) {
            const url = await userProfileUpload(file);
            console.log("getting the url", url);

            setProfile(url);
            const result = await userUploadPicture(currentUser.id, url);      
        }
    }
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    const handleSubmitModal = (formData: any) => {
      // Handle form submission logic here, e.g., send data to backend
      console.log("Form data:", formData);
      handleCloseModal(); // Close the modal after submission
    };
    return (

        <>
            <Nav />
            <div className="w-full flex flex-col xl:flex-row    justify-center h-auto  bg-gray-300-600">
                <div className="w-full  xl:w-6/12   p-2 flex flex-col mt-20   gap-2 rounded-xl">
                    <div className="w-full h-auto p-6  gap-3 flex flex-col   xl:pt-6 bg-white rounded-md  justify-center items-center   xl:justify-start  xl:items-start xl:ps-10 ">
                       <div className=" w-full flex items-center justify-center xl:justify-start gap-3 flex-col xl:flex-row">
                         <Avatar className="relative" alt="Remy Sharp" sx={{ width: 130, height: 130 }} src={profile}  />
                        <h1 className="font-bold text-xl xl:text-3xl">{userData&&userData.user.name}</h1>
                        
                        </div>
                        <button className="w-[6rem] h-[2rem] xl:ms-5 rounded-md bg-blue-500 text-white " onClick={(e)=>{profileIMG.current?.click()}}>change
                            <span><LoopSharpIcon sx={{ width: 18, height: 15 }} /></span>
                            <input type="file" className="hidden" ref={profileIMG} onChange={(e)=>changingProfile(e)}  />

                        </button>
                    </div>

                    <div className="w-full h-80 bg-white rounded-md  ">
                        <div className="w-full p-3 flex justify-end gap-2">
                            <button className="w-[5rem] h-[2rem] rounded-md bg-blue-500 text-white" onClick={handleOpenModal}>Edit</button>
                            <EditProfileModal isOpen={isModalOpen}  onClose={handleCloseModal}  userData={userData} />
                            {/* <button className="w-[8rem] h-[2rem] rounded-md bg-blue-500 text-white" >Add address</button> */}
                        </div>
                        <ul className="p-6 flex flex-col gap-3">

                            <li>
                                <div className="w-full flex">
                                    <div className="w-32  ">email</div>
                                    <span>:</span>
                                    <div className="w-40  ps-2"> {userData && userData?.user.email}</div>
                                </div>
                            </li>
                            {/* <li>
                                <div className="w-full flex">
                                    <div className="w-32 ">age</div>
                                    <span>:</span>
                                    <div className="w-40 ps-2"> 12</div>
                                </div>
                            </li> */}
                            <li>
                                <div className="w-full flex">
                                    <div className="w-32 ">phone number</div>
                                    <span>:</span>
                                    <div className="w-40 ps-2"> {userData&&userData.user.phoneNumber ?userData.user.phoneNumber:""}</div>
                                </div>
                            </li>
                            <li>
                                <div className="w-full flex">
                                    <div className="w-32 ">Country</div>
                                    <span>:</span>
                                    <div className="w-40 ps-2"> {countryName}</div>
                                </div>
                            </li>
                            <li>
                                <div className="w-full flex">
                                    <div className="w-32  ">state</div>
                                    <span>:</span>
                                    <div className="w-40 ps-2">{StateName}</div>
                                </div>
                            </li>
                            <li>
                                <div className="w-full flex">
                                    <div className="w-32  ">city</div>
                                    <span>:</span>
                                    <div className="w-40 ps-2">{cityName}</div>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="xl:w-3/12 mt-0 xl:mt-20  p-2">
                     <div className="w-full mb-4 bg-white rounded-md h-[2.5rem] flex justify-center items-center">
                        latest Events 
                        <TrendingFlatTwoToneIcon/>
                     </div>
                     <LatestEvent/>
                     
                </div>
                {/* {userDeta} */}
            </div>
        </>
    )
}