import React, { useEffect, useState, useRef } from "react";
import Nav from "../../componant/common/Nav";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { UploadBackgroundImage, UploadProfilePicture } from "../../survices/firebase/uploadImage";
import { findbyId, getPost, postDelete, uploadBackground, uploadProfilePicture } from "../../api/organizer";
import { useSelector } from "react-redux";
import Chip from '@mui/material/Chip';
import { currentUser } from "../../@types/allTypes";
import ProfileEdit from "../../componant/organizer/ProfileEdit";
import { Country, State } from "country-state-city";
import { EventPostListing } from "../../componant/organizer/EventPostListing";
import bg from "../../assets/unknownProfile.jpeg"
import { Divider } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import image from "../../assets/9318688.jpg"

import { PostAddModal } from "../../componant/organizer/PostAddModal";
import { PostEditModal } from "../../componant/organizer/PostEditModal";


const OrganizerProfile: React.FC = () => {
    const imageRef = useRef<HTMLInputElement>(null);
    const profileIMG = useRef<HTMLInputElement>(null);
    const [backgroundUrl, setBackground] = useState<any>();
    const [liked, setLiked] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isModalOpenPost, setIsModalOpenPost] = useState<boolean>(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false);
    const [selectedPostData, setSelectedPostData] = useState(null);
    const [organizerData, setOrganizer] = useState<any>();
    const [posts, setPosts] = useState([])
    const [regions, setRegions] = useState<{ country: string | undefined, state: string | undefined, city: string | undefined, pin: string | undefined }>({
        country: undefined,
        state: undefined,
        city: undefined,
        pin: undefined
    });
    const [profile, setProfile] = useState<any>();
    const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);
    const currentUser = useSelector((state: { user: currentUser }) => state.user);
    const id = currentUser?.id;


    async function changing(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const url = await UploadBackgroundImage(file);
            console.log("getting the url", url);
            setBackground(url);
            await uploadBackground(id, url);
        }
    }

    async function changingProfile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const url = await UploadProfilePicture(file);
            console.log("getting the url", url);
            setProfile(url);
            await uploadProfilePicture(id, url);
        }
    }

    useEffect(() => {
        async function getInfo() {
            const organizer = await findbyId(id);
            setOrganizer(organizer.organizer);
            const country = await Country.getCountryByCode(organizer.organizer.address[0].country);
            const state = await State.getStateByCode(organizer.organizer.address[0].state);
            setRegions({
                country: country?.name || undefined,
                state: state?.name || undefined,
                city: organizer.organizer.address[0].city,
                pin: organizer.organizer.address[0].pincode
            });
            setBackground(organizer?.organizer.backgroundImage);
            setProfile(organizer?.organizer.profileImage);
            const allposts = await getPost(id)
            console.log(" the all psotsss", allposts)
            setPosts(allposts.posts)

        }
        getInfo();
    }, [id, shouldRefetch]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setShouldRefetch(prev => !prev);
    };
    const handleOpenModalPost = () => {
        setIsModalOpenPost(true);
    };

    const handleCloseModalPost = () => {
        setIsModalOpenPost(false);
        setShouldRefetch(prev => !prev);
    };

    const handleOpenModalEdit = (postData:any) => {
        setSelectedPostData(postData);
        setIsModalOpenEdit(true);
    };

    const handleCloseModalEdit = () => {
        setIsModalOpenEdit(false);
        setShouldRefetch(prev => !prev);
    };


  async function deletePost(id:string){
      const response =  await postDelete(id)
      console.log(" the resposen --",response)
      setShouldRefetch(!shouldRefetch)
  }

    return (
        <>
            <Nav />
            <div className='h-auto bg-white w-full flex p-2 flex-row justify-center '>
                <div className="w-full xl:w-7/12">
                    <div className="w-full rounded-lg shadow-md border-2 mt-20 h-auto bg-white">
                        <div className="w-full rounded-lg object-contain relative shadow bg-white h-32 xl:h-48 flex items-end">
                            <button className="top-2 end-2 absolute text-white" onClick={() => imageRef.current?.click()}>
                                <AddPhotoAlternateIcon sx={{ color: "black" }} />
                            </button>
                            <input type="file" className="hidden" onChange={changing} ref={imageRef} />
                            <img src={backgroundUrl} className="w-full h-full bg-gray-100 rounded-md" alt="" />
                            <div
                                className="rounded-full border-2 w-28 h-28 xl:w-32 xl:h-32 bg-black absolute translate-y-16 translate-x-5 xl:translate-x-8"
                                style={{
                                    backgroundImage: `url(${profile || bg})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <button className="bottom-2 end-6 absolute text-white" onClick={() => profileIMG.current?.click()}>
                                    <AddPhotoAlternateIcon sx={{ color: "black" }} />
                                </button>
                                <input type="file" className="hidden" ref={profileIMG} onChange={changingProfile} />
                            </div>
                        </div>
                        <div className="h-auto w-full">
                            <div className="flex justify-between">
                                <h1 className="ps-4 pt-20 xl:ps-9 xl:pt-20 font-sans text-xl xl:text-3xl font-extrabold">{organizerData?.name}</h1>
                                <button className="w-[5rem] m-4 h-[2rem] bg-blue-500 rounded-md text-white" onClick={handleOpenModal}>Edit</button>
                                <ProfileEdit isOpen={isModalOpen} onClose={handleCloseModal} organizerData={organizerData} />
                            </div>
                            <div className="flex justify-between w-full h-auto">
                                <h1 className="pt-8 ps-9 font-bold">Organizer Details</h1>
                                <h1 className="pt-6 pe-9 font-bold">Event Categories</h1>
                            </div>
                            <div className="flex justify-between w-full">
                                <div className="w-6/12">
                                    <p className="ps-4 pt-5 xl:ps-9 font-serif">{regions.country}, {regions.state}, {regions.city}</p>
                                    <p className="ps-4 xl:ps-9 font-serif">{regions.pin}, {organizerData?.email}, {organizerData?.phoneNumber}</p>
                                </div>
                                <div className="flex gap-1 w-6/12 flex-row-reverse pe-9 flex-wrap">
                                    {organizerData && organizerData.eventCategory.map((elem: any, key: any) => (
                                        <Chip label={elem?.category} key={key} />
                                    ))}
                                </div>
                            </div>
                            <div className="m-4 ps-4">
                                <h1 className="font-bold">About the company</h1>
                                <p className="pt-3 pe-5 font-serif">{organizerData?.about}</p>
                            </div>
                            <div className="w-full xl:ps-4">
                                {/* <button className="w-[5rem] m-4 h-[2rem] bg-blue-500 rounded-md text-white">book</button>
                                <button className="w-[5rem] h-[2rem] bg-blue-500 rounded-md text-white">message</button> */}
                            </div>
                        </div>
                    </div>
                    <div className="w-full xl:w-12/12 bg-white border-2 h-auto mt-2 rounded-md p-3 shadow-lg">
                        <div className="w-full flex justify-end h-auto p-3">
                            <button className="bg-blue-500 rounded-md text-white w-[5rem] h-[2rem]" onClick={handleOpenModalPost}  >Add post</button>
                            <PostAddModal isOpen={isModalOpenPost} onClose={handleCloseModalPost} organizerId={currentUser.id} />
                        </div>
                        {
                            posts.length ? posts.map((ele: any) => {
                                const data = {
                                    organizerId: currentUser.id,
                                    postId: ele._id,
                                    description: ele.description,
                                    postImage: ele.postImage
                                }
                                return (
                                    <>
                                        <Divider variant="middle" />
                                        <div className="w-full h-auto p-4 flex flex-col gap-4">
                                            <div className="w-full h-14 flex items-center ">
                                                <div className="w-[50%] h-full flex items-center gap-4">
                                                    <div className="w-14 h-14 bg-yellow-300 rounded-full">
                                                        <img src={organizerData?.profileImage} className="h-full w-full rounded-full" alt="" />
                                                    </div>
                                                    <h1 className="font-bold text-lg">{organizerData?.name}</h1>
                                                </div>
                                                <div className="w-[50%] h-full flex gap-3 justify-end ">
                                                    <EditIcon onClick={()=>handleOpenModalEdit(data)} />
                                                    <DeleteIcon onClick={()=>deletePost(ele._id)} />
                                                </div>
                                            </div>
                                            <div className="w-full p-2">
                                                <p className="font-serif pe-8">{ele?.description}</p>
                                            </div>
                                            <div className="w-full h-[21rem] bg-blue-100">
                                                <img src={ele?.postImage} className="w-full h-full rounded-md" alt="" />
                                            </div>
                                            <div className="w-full h-10 flex gap-4">
                                                <FavoriteIcon sx={{ stroke: 'black', color: `${liked ? 'red' : 'white'}`, boxShadow: '3px', width: '2rem', height: '100%' }} />
                                                {/* <CommentIcon  sx={{stroke:'black',color:"black",boxShadow:'3px',width:'2rem',height:'100%'}} /> */}
                                                <ShareIcon sx={{ stroke: 'black', color: "black", boxShadow: '3px', width: '2rem', height: '100%' }} />
                                            </div>
                                        </div>
                                    </>
                                )
                            }) :
                                (
                                    <div className="w-full h-[400px] flex justify-center">
                                        <div className="w-[50%] h-[100%]">
                                            <img src={image} className="w-full h-full" alt="" />
                                        </div>
                                    </div>
                                )
                        }

                        {selectedPostData && (
                            <PostEditModal isOpen={isModalOpenEdit} onClose={handleCloseModalEdit} postData={selectedPostData} />
                        )}
                    </div>
                </div>
                <div className="w-2/12 p-2 mt-20 h-auto">
                    <EventPostListing />
                </div>
            </div>
        </>
    );
};

export default OrganizerProfile;
