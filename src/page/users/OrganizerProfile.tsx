import React, { useEffect, useState } from "react";
import Nav from "../../componant/common/Nav";

import { findbyId, getPost} from "../../api/organizer";
import Chip from '@mui/material/Chip';
import { Country, State } from "country-state-city";
import image from "../../assets/9318688.jpg"
import bg from "../../assets/unknownProfile.jpeg"
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate, useParams } from "react-router-dom";
import { OrganizerEventPosts } from "../../componant/user/OrganizerEventPost";
import { Divider } from "@mui/material";
import { BottumBar } from "../../componant/common/BottumBar";

const OrganizerProfile: React.FC = () => {
   
    const [posts, setPosts] = useState([])

    const [backgroundUrl, setBackground] = useState<any>();
    const [organizerData, setOrganizer] = useState<any>();
    const [regions, setRegions] = useState<{ country: string | undefined, state: string | undefined, city: string | undefined, pin: string | undefined }>({
        country: undefined,
        state: undefined,
        city: undefined,
        pin: undefined
    });
    const navigate = useNavigate()
    const [profile, setProfile] = useState<any>();
    const { id } = useParams()
    const liked = true


    useEffect(() => {
        async function getInfo() {
            const organizer = await findbyId(id as string);
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
            const allposts = await getPost(id as string)
            console.log(" the all psotsss", allposts)
            setPosts(allposts.posts)
        }
        getInfo();
    }, [id]);



    return (
        <>
            <Nav />
            <div className='h-auto bg-white w-full flex p-2 flex-row justify-center items-center'>
                <div className="w-full h-auto  xl:w-7/12 ">
                    <div className="w-full rounded-lg shadow-md border-2 mt-20 h-auto ">
                        <div className="w-full rounded-lg object-contain relative shadow bg-red-200 h-32  xl:h-48 flex items-end">

                            <img src={backgroundUrl} className="w-full h-full rounded-md bg-gray-100" alt="" />
                            <div
                                className="rounded-full border-2 w-20 h-20 xl:w-28 xl:h-28 bg-black absolute translate-y-10 xl:translate-y-16 translate-x-5 xl:translate-x-8"
                                style={{
                                    backgroundImage: `url(${profile || bg})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                            </div>
                        </div>
                        <div className="h-auto w-full">
                            <div className="flex justify-between">
                                <h1 className="ps-4 pt-12 xl:ps-9  xl:pt-20 font-sans text-2xl xl:text-3xl font-extrabold">{organizerData?.name}</h1>
                            </div>
                            <div className="flex justify-between w-full h-auto">
                                <h1 className="pt-6 ps-2 xl:ps-9 text-lg font-bold">Organizer Details</h1>
                                <h1 className="pt-6 pe-2 xl:pe-9 font-bold text-lg">Event Categories</h1>
                            </div>
                            <div className="flex justify-between w-full">
                                <div className="w-6/12 m-1 ">
                                    <p className="ps-3 pt-5 xl:ps-9 xl:font-serif text-sm xl:text-lg">{regions.country}, {regions.state}, {regions.city}</p>
                                    <p className="ps-3 xl:ps-9 xl:font-serif text-sm xl:text-lg">{regions.pin}, {organizerData?.email}, {organizerData?.phoneNumber}</p>
                                </div>
                                <div className="flex pt-5 gap-1 h-full m-1 w-6/12 flex-row-reverse xl:pe-9 flex-wrap">
                                    {organizerData && organizerData.eventCategory.map((elem: any, key: any) => (
                                        <Chip label={elem?.category} key={key} />
                                    ))}
                                </div>
                            </div>
                            <div className=" ms-2 xl:m-4  ps-2 xl:ps-4">
                                <h1 className="font-bold mt-4">About the company</h1>
                                <p className="pt-3 pe-5 text-sm xl:text-lg xl:font-serif">{organizerData?.about}</p>
                            </div>
                            <div className="w-full xl:ps-4">
                                <button className=" w-[45%] xl:w-[5rem] m-4 h-[2rem] bg-blue-500 rounded-md text-white" onClick={() => navigate(`/user/requestPage/${id}`)}>Request</button>
                                <button className="w-[45%] xl:w-[5rem] h-[2rem] bg-blue-500 rounded-md text-white" onClick={() => navigate(`/user/message/${id}`)}>message</button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full xl:w-12/12  h-44 mt-2">
                        {
                            posts.length ? posts.map((ele: any) => {

                                return (
                                    <>
                                        <Divider variant="middle" />
                                        <div className="w-full h-auto p-4 flex flex-col gap-4">
                                            <div className="w-full h-14 flex items-center ">
                                                <div className="w-[50%] h-full flex items-center gap-4 ">
                                                    <div className="w-10 h-10 xl:w-14 xl:h-14 bg-yellow-300 rounded-full">
                                                        <img src={organizerData?.profileImage} className="h-full w-full rounded-full" alt="" />
                                                    </div>
                                                    <h1 className="font-bold text-lg">{organizerData?.name}</h1>
                                                </div>
                                                <div className="w-[50%] h-full flex gap-3 justify-end ">

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

                    </div>
                </div>
                <div className="hidden xl:block  w-2/12 ps-2   h-[730px]">
                    <OrganizerEventPosts />
                </div>
            </div>
            <div className="w-full flex justify-center">
                <BottumBar />
            </div>
        </>
    );
};

export default OrganizerProfile;
