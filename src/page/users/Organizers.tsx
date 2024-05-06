import Nav from "../../componant/common/Nav"
import useGetUser from "../../hook/useGetUser"

import { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { allOrganizers } from "../../api/user";
import { SideBar } from "../../componant/common/SideBar";
import { Card } from "@mui/material";



const Organizers: React.FC = () => {
    const [allorganizer, setAllorganizer] = useState([])

    useEffect(() => {
        async function getOrganizer() {
            const result = await allOrganizers()

            console.log(" the reuslt of the api : - ", result.allOrganizer[0].address[0].country)

            for (let i = 0; i < result.allOrganizer.length - 1; i++) {
                const country = await Country.getCountryByCode(result.allOrganizer[i].address[0].country)
                const state = await State.getStateByCode(result.allOrganizer[i].address[0].state)

                result.allOrganizer[i].address[0].country = country?.name
                result.allOrganizer[i].address[0].state = state?.name

            }
            console.log(" after the reuslt  ------------------------------>", result)
            setAllorganizer(result.allOrganizer)
        }
        getOrganizer()
    }, [])

    return (
        <>
            <Nav />
            <div className="w-full flex pt-12 gap-2  justify-center bg-white h-[auto]">
                <SideBar/>
                <div className="w-9/12 mt-9 flex flex-col gap-2">
                    <div className="w-full  rounded-lg h-[13rem]  ">
                        <div className="w-full p-[2rem] flex justify-between">
                            <h1 className="font-bold  text-[25px]  w-96">Booking Information</h1>
                            <button className="bg-blue-500 p-2 text-white rounded-md">booking</button>
                        </div>
                        <div className="w-full flex ps-5 pe-5  ">
                            <p className="ms-5 me-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae doloribus iure adipisci illo quaerat rerum molestiae, cum, cumque fugiat commodi eligendi nulla? Consequatur eligendi ipsum impedit molestias quos rem placeat? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat eligendi, voluptatibus totam labore </p>

                        </div>
                    </div>
                    <div className="w-full h-[60px] flex items-center">
                             <h1 className="font-bold ps-6">Filter</h1>
                    </div>
                    <div className="w-full ps-6 pe-6 flex flex-col gap-3">
                    {
                        allorganizer && allorganizer.map((items: any) => {
                            return (
                                <Card 
                                sx={{
                                    boxShadow: "1px 3px 8px 1px 1px rgba(0, 0, 0, 0.1)", 
                                    "&:hover": {
                                        boxShadow: "1px 2px 2px 2px  rgba(0, 0, 0, 0.2)", 
                                    },
                                }}
                                className="w-full border-t border-t-gray-200  bg-white rounded-md  ps-5 pe-5 flex items-center h-[5rem] justify-between">
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
                                </Card>
                            )
                        })
                    }
                    </div>

                </div>
            </div>
        </>
    )
}

export default Organizers