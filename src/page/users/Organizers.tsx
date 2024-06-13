import Nav from "../../componant/common/Nav";
import { useEffect, useState } from "react";
import { Country, State } from "country-state-city";
import { allOrganizers } from "../../api/user";
import { SideBar } from "../../componant/common/SideBar";
import { Card } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import bg from "../../assets/unknownProfile.jpeg";
import { BottumBar } from "../../componant/common/BottumBar";
import ScrollReveal from 'scrollreveal';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Organizers: React.FC = () => {
    const [allorganizer, setAllorganizer] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function getOrganizer() {
            setLoading(true);
            try {
                const result = await allOrganizers();
                for (let i = 0; i < result.allOrganizer.length; i++) {
                    const country = await Country.getCountryByCode(result.allOrganizer[i].address[0].country);
                    const state = await State.getStateByCode(result.allOrganizer[i].address[0].state);

                    result.allOrganizer[i].address[0].country = country?.name;
                    result.allOrganizer[i].address[0].state = state?.name;
                }
                setAllorganizer(result.allOrganizer);
            } catch (error) {
                toast.error("Token expired !! Login again");
                navigate("/auth/userLogin");
            } finally {
                setLoading(false);
            }
        }
        getOrganizer();
    }, [navigate]);

    useEffect(() => {
        ScrollReveal().reveal('.scrollUp', {
            delay: 200,
            distance: '20px',
            origin: 'bottom',
            easing: 'ease-in-out',
            duration: 1000,
            reset: true,
        });
    }, []);

    return (
        <>
            <Nav />
            <div className="w-full flex pt-12 gap-2 justify-center bg-white h-[auto]">
                <SideBar />
                <div className="w-full xl:w-9/12 mt-9 flex flex-col gap-2">
                    <div className="w-full rounded-lg h-auto xl:h-[13rem]">
                        <div className="w-full p-[2rem] flex justify-between">
                            <h1 className="font-bold text-[25px] w-96">Booking Information</h1>
                            <button className="bg-blue-500 p-2 text-white rounded-md" onClick={() => navigate("/user/bookedlist")}>booking</button>
                        </div>
                        <div className="w-full ps-2 pe-2 flex xl:ps-5 xl:pe-5 scrollUp">
                            <p className="ms-5 me-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae doloribus iure adipisci illo quaerat rerum molestiae, cum, cumque fugiat commodi eligendi nulla? Consequatur eligendi ipsum impedit molestias quos rem placeat? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat eligendi, voluptatibus totam labore</p>
                        </div>
                    </div>
                    <div className="w-full h-[60px] flex items-center">
                        <h1 className="font-bold ps-6">Filter</h1>
                    </div>
                    <div className="w-full h-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 p-2 xl:gap-2">
                        {loading ? (
                            [...Array(8)].map((_, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        boxShadow: "1px 3px 8px 1px rgba(0, 0, 0, 0.2)",
                                        "&:hover": {
                                            boxShadow: "1px 2px 2px 2px rgba(0, 0, 0, 0.3)",
                                        },
                                    }}
                                    className="w-full h-[22rem] border-t border-t-gray-200 rounded-md flex flex-col justify-between items-center"
                                >
                                    <div className="w-full rounded-lg object-contain relative shadow h-24 xl:h-24 flex items-end">
                                        <Skeleton height="100%" width="100%" />
                                    </div>
                                    <div className="w-full h-full pt-2 ps-2 pe-2 border-t-gray-200 rounded-md flex flex-col items-center justify-between">
                                        <div className="w-full mt-4 p-3 flex justify-center">
                                            <Skeleton width="80%" height={30} />
                                        </div>
                                        <div className="h-[6rem] w-full">
                                            <Skeleton height="100%" width="100%" />
                                        </div>
                                    </div>
                                    <div className="w-full mt-4 mb-4 flex justify-evenly">
                                        <Skeleton width="5rem" height="2rem" />
                                        <Skeleton width="5rem" height="2rem" />
                                    </div>
                                </Card>
                            ))
                        ) : (
                            allorganizer.map((items: any) => (
                                <Card
                                    key={items._id}
                                    sx={{
                                        boxShadow: "1px 3px 8px 1px rgba(0, 0, 0, 0.2)",
                                        "&:hover": {
                                            boxShadow: "1px 2px 2px 2px rgba(0, 0, 0, 0.3)",
                                        },
                                    }}
                                    className="w-full h-[22rem] border-t border-t-gray-200 rounded-md flex flex-col justify-between items-center"
                                >
                                    <div className="w-full rounded-lg object-contain relative shadow h-24 xl:h-24 flex items-end">
                                        <img src={items.backgroundImage || bg} className="w-full h-full rounded-md" alt="" />
                                        <div
                                            className="rounded-full border-2 w-20 h-20 xl:w-16 xl:h-16 bg-black absolute translate-y-8 translate-x-2 xl:translate-x-4"
                                            style={{
                                                backgroundImage: `url(${items.profileImage || bg})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        >
                                        </div>
                                    </div>
                                    <Link to={`/user/organizerProfile/${items._id}`} className="w-full h-full">
                                        <div className="w-full h-auto pt-2 ps-2 pe-2 border-t-gray-200 rounded-md flex flex-col items-center justify-between">
                                            <div className="w-full mt-4 p-3 flex justify-center">
                                                <h1 className="font-extrabold text-xl p-1">{items.name}</h1>
                                            </div>
                                            <div className="h-[6rem] w-full">
                                                <p className="h-full ps-1 pe-1 overflow-hidden xl:font-serif">
                                                    {items?.about ? items.about : "No About"}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="w-full mt-4 mb-4 flex justify-evenly">
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
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <BottumBar />
            </div>
        </>
    );
};

export default Organizers;
