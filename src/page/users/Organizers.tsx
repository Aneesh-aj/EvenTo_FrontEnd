import Nav from "../../componant/common/Nav"
import bg from "../../assets/bunch-flowers-leaves-table.jpg"
import useGetUser from "../../hook/useGetUser"
import EventIcon from '@mui/icons-material/Event';
import Divider from '@mui/material/Divider';
import MessageIcon from '@mui/icons-material/Message';
import BookIcon from '@mui/icons-material/Book';
import { useEffect, useState } from "react";
import { Country,State,City } from "country-state-city";
import { allOrganizers } from "../../api/user";



const Organizers: React.FC = () => {
    const [allorganizer, setAllorganizer] = useState([])

    useEffect(() => {
        async function getOrganizer() {
            const result = await allOrganizers()

            console.log(" the reuslt of the api : - ",result.allOrganizer[0].address[0].country)
              
            for(let i=0;i < result.allOrganizer.length-1;i++){
                const country = await Country.getCountryByCode(result.allOrganizer[i].address[0].country)
                const state = await State.getStateByCode(result.allOrganizer[i].address[0].state)
            
                  result.allOrganizer[i].address[0].country = country?.name
                  result.allOrganizer[i].address[0].state = state?.name
                  
            }
            console.log(" after the reuslt  ------------------------------>",result)
            setAllorganizer(result.allOrganizer)
        }
        getOrganizer()
    }, [])

    const currentUser = useGetUser()
    return (
        <>
            <Nav />
            <div className="w-full flex pt-12 gap-2  justify-center  h-[900px]">
                <div className="w-2/12 mt-9 flex gap-2 flex-col">
                    <div className="w-full rounded-lg h-[11rem] bg-white border-2 ">
                        <div className="w-full pt-5 h-4/6 p-3 flex justify-center">
                            <div style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: "center" }} className="rounded-full bg-green-500 w-[40%] ">

                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <span className="  p-0 font-bold">{currentUser.name}</span>
                        </div>
                    </div>
                    <div className="w-full h-[800px]  bg-white border-2 ">
                        <ul className="flex flex-col gap-3  ">
                            <li className="flex h-[5rem] ">
                                <div className="w-6/12 h-full flex items-center justify-center">
                                    <EventIcon />
                                </div>
                                <div className="w-6//12 h-full flex items-center">
                                    Events
                                </div>
                            </li>
                            <Divider variant="middle" />
                            <li className="flex h-[5rem] ">
                                <div className="w-6/12 h-full flex items-center justify-center">
                                    <MessageIcon />
                                </div>
                                <div className="w-6//12 h-full flex items-center">
                                    message
                                </div>
                            </li>
                            <Divider variant="middle" />
                            <li className="flex  h-[5rem]">
                                <div className="w-6/12 h-full flex items-center justify-center">
                                    <BookIcon />
                                </div>
                                <div className="w-6//12 h-full flex items-center">
                                    Bookings
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-9/12 mt-9 flex flex-col gap-2">
                    <div className="w-full h-[200px] rounded-lg border-2 bg-white">
                        <div className="w-full p-[2rem] flex justify-between">
                            <h1 className="font-bold  text-[25px]  w-96">Booking Information</h1>
                            <button className="bg-blue-500 p-2 rounded-md">booking</button>
                        </div>
                        <div className="w-full ps-5 pe-5 h-14">
                            <p className="ms-5 me-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae doloribus iure adipisci illo quaerat rerum molestiae, cum, cumque fugiat commodi eligendi nulla? Consequatur eligendi ipsum impedit molestias quos rem placeat? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat eligendi, voluptatibus totam labore dignissimos saepe provide</p>

                        </div>
                    </div>
                    <div className="w-full bg-white h-[60px]">

                    </div>
                    {
                        allorganizer && allorganizer.map((items: any) => {
                            return (
                                <div className="w-full bg-white border-2 ps-5 pe-5 flex items-center h-[4rem] justify-between">
                                    <div className="rounded-full border-2 h-[3rem] w-[3rem] bg-red-500" style={{ backgroundImage: `url(${items?.profileImage})`, backgroundSize: 'cover', backgroundPosition: "center" }}>
                                    </div>
                                    <div className="">
                                        <h1>{items.name}</h1>
                                    </div>
                                    <div>
                                        <p className="">
                                            {items?.address[0]?.country},{items.address[0].state},{items.address[0].city}
                                        </p>
                                    </div>
                                    <div>
                                        <button className="w-[5rem] h-[2rem] bg-blue-500 text-white rounded-lg">Request</button>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </>
    )
}

export default Organizers