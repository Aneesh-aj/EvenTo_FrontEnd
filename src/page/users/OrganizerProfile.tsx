import React, { useEffect, useState, useRef } from "react";
import Nav from "../../componant/common/Nav";

import { findbyId, uploadBackground, uploadProfilePicture } from "../../api/organizer";
import Chip from '@mui/material/Chip';
import { Country, State } from "country-state-city";
import { EventPostListing } from "../../componant/organizer/EventPostListing";
import { useNavigate, useParams } from "react-router-dom";
import { OrganizerEventPosts } from "../../componant/user/OrganizerEventPost";

const OrganizerProfile: React.FC = () => {
    const imageRef = useRef<HTMLInputElement>(null);
    const profileIMG = useRef<HTMLInputElement>(null);
    const [backgroundUrl, setBackground] = useState<any>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [organizerData, setOrganizer] = useState<any>();
    const [regions, setRegions] = useState<{ country: string | undefined, state: string | undefined, city: string | undefined, pin: string | undefined }>({
        country: undefined,
        state: undefined,
        city: undefined,
        pin: undefined
    });
    const navigate = useNavigate()
    const [profile, setProfile] = useState<any>();
    const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);
    const { id } = useParams()


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
        }
        getInfo();
    }, [id, shouldRefetch]);



    return (
        <>
            <Nav />
            <div className='h-auto bg-white w-full flex p-2 flex-row justify-center items-center'>
                <div className="w-full xl:w-7/12">
                    <div className="w-full rounded-lg shadow-md border-2 mt-20 h-auto bg-white">
                        <div className="w-full rounded-lg object-contain relative shadow bg-white h-32 xl:h-48 flex items-end">

                            <img src={backgroundUrl} className="w-full h-full rounded-md" alt="" />
                            <div
                                className="rounded-full w-28 h-28 xl:w-32 xl:h-32 bg-black absolute translate-y-16 translate-x-5 xl:translate-x-8"
                                style={{
                                    backgroundImage: `url(${profile})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                            </div>
                        </div>
                        <div className="h-auto w-full">
                            <div className="flex justify-between">
                                <h1 className="ps-4 pt-20 xl:ps-9 xl:pt-20 font-sans text-xl xl:text-3xl font-extrabold">{organizerData?.name}</h1>
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
                                <button className="w-[5rem] m-4 h-[2rem] bg-blue-500 rounded-md text-white">book</button>
                                <button className="w-[5rem] h-[2rem] bg-blue-500 rounded-md text-white" onClick={()=>navigate(`/user/message/${id}`)}>message</button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full xl:w-7/12 bg-white h-44 mt-2">
                        <h1>posts</h1>
                    </div>
                </div>
                <div className="w-2/12 ps-2 h-[700px]">
                    <OrganizerEventPosts />
                </div>
            </div>
        </>
    );
};

export default OrganizerProfile;