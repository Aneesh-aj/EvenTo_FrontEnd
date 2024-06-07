import Nav from "../../componant/common/Nav"
import useGetUser from "../../hook/useGetUser"

import { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { allOrganizers } from "../../api/user";
import { SideBar } from "../../componant/common/SideBar";
import { Card } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import bg from "../../assets/unknownProfile.jpeg"



const Organizers: React.FC = () => {
    const [allorganizer, setAllorganizer] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function getOrganizer() {
            try {
                const result = await allOrganizers()
                for (let i = 0; i < result.allOrganizer.length - 1; i++) {
                    const country = await Country.getCountryByCode(result.allOrganizer[i].address[0].country)
                    const state = await State.getStateByCode(result.allOrganizer[i].address[0].state)

                    result.allOrganizer[i].address[0].country = country?.name
                    result.allOrganizer[i].address[0].state = state?.name

                }
                setAllorganizer(result.allOrganizer)
            } catch (error) {
                toast.error("Token expired !! Login again")
                navigate("/aut/userLogin")
            }
        }
        getOrganizer()
    }, [])

    return (
        <>
            <Nav />
            <div className="w-full flex pt-12 gap-2  justify-center bg-white h-[auto]">
                <SideBar />
                <div className="w-9/12 mt-9 flex flex-col gap-2">
                    <div className="w-full  rounded-lg h-[13rem]  ">
                        <div className="w-full p-[2rem] flex justify-between">
                            <h1 className="font-bold  text-[25px]  w-96">Booking Information</h1>
                            <button className="bg-blue-500 p-2 text-white rounded-md" onClick={() => navigate("/user/bookedlist")}>booking</button>
                        </div>
                        <div className="w-full flex ps-5 pe-5  ">
                            <p className="ms-5 me-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae doloribus iure adipisci illo quaerat rerum molestiae, cum, cumque fugiat commodi eligendi nulla? Consequatur eligendi ipsum impedit molestias quos rem placeat? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat eligendi, voluptatibus totam labore </p>

                        </div>
                    </div>
                    <div className="w-full h-[60px] flex items-center">
                        <h1 className="font-bold ps-6">Filter</h1>
                    </div>
                    <div className="w-full h-auto  flex flex-wrap gap-3">
                        {allorganizer &&
                            allorganizer.map((items: any) => (
                                <Card
                                    key={items._id}
                                    sx={{
                                        boxShadow: "1px 3px 8px 1px rgba(0, 0, 0, 0.2)",
                                        "&:hover": {
                                            boxShadow: "1px 2px 2px 2px rgba(0, 0, 0, 0.3)",
                                        },
                                    }}
                                    className="w-full  md:w-1/5 lg:w-1/5 h-[22rem]  border-t border-t-gray-200  rounded-md  flex flex-col justify-between items-center"
                                >
                                    <div className="w-full rounded-lg object-contain relative shadow  h-24 xl:h-24 bg-red-100 flex items-end">

                                        <img src={items.backgroundImage|| bg} className="w-full h-full rounded-md" alt="" />
                                        <div
                                            className="rounded-full border-2 w-20 h-20 xl:w-16  xl:h-16 bg-black absolute translate-y-8 translate-x-2 xl:translate-x-4"
                                            style={{
                                                backgroundImage: `url(${items.profileImage || bg})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        >
                                        </div>
                                    </div>
                                    <Link to={`/user/organizerProfile/${items._id}`} className="w-full h-full ">
                                        <div className="w-full h-auto pt-2 ps-2 pe-2   border-t-gray-200  rounded-md flex flex-col items-center  justify-between">
                                            {/* <div
                                                className="rounded-full border-2 h-[4rem] w-[4rem] bg-red-500"
                                                style={{
                                                    backgroundImage: `url(${items?.profileImage})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: "center",
                                                }}
                                            /> */}
                                            <div className="w-full mt-4  p-3 flex justify-center">
                                                <h1 className="font-extrabold text-xl p-1">{items.name}</h1>
                                            </div>
                                            <div className="h-[6rem]  w-full  ">
                                                <p className="h-full ps-1 pe-1 overflow-hidden font-serif">
                                                    {items?.about ? items.about:" No About "}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className=" w-full mt-4 mb-4 flex justify-evenly  ">
                                        <button
                                            className="w-[5rem] h-[2rem] bg-blue-500 text-white rounded-lg"
                                            onClick={() => navigate(`/user/requestPage/${items._id}`)}
                                        >
                                            Request
                                        </button>
                                        <button
                                            className="w-[5rem] h-[2rem] bg-blue-500 text-white rounded-lg"
                                            onClick={() => navigate(`/user/message/${items._id}`)}
                                        >
                                            Message
                                        </button>
                                    </div>
                                </Card>
                            ))}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Organizers