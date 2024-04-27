


import React, { useEffect, useState } from "react";
import api from "../../survices/axios";
import { useNavigate, useParams } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import toast, { Toaster } from "react-hot-toast";

const RequestDetails: React.FC = () => {
    const [details, setDetails] = useState<any | null>();
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/admin/requestDetails/${id}`);
                const data = response.data.result;
                console.log(" the reonses")
                console.log(data,"dataaaa===================================================")
                if(response.data.state === 400){
                    toast.error(response.data.message)
                }
                console.log(" the result", data);
                setDetails(data);
            } catch (error) {
                console.error("Error fetching details:", error);
            }
        };

        fetchData();
    }, [id]);

    const Approve= async()=>{
       await api.post(`/admin/approve/${id}`)
        navigate('/admin/request')
    }
    
    const Reject = async()=>{
        await api.post(`/admin/reject/${id}`)
        navigate('/admin/request')
    }

    return (
        <div className="h-screen overflow-y-scroll bg-[#e8e8e8] w-full flex justify-center custom-scrollbar">
            <div className="w-11/12 h-96 mt-3 flex flex-col items-center ">
                <div className="rounded-md bg-white shadow-md w-full h-11 flex flex-row items-center">
                    {details?.name}
                </div>
                <Toaster position="top-right"
                        reverseOrder={false} />
                <div className="rounded-md mt-2 bg-white shadow-md h-auto p-7 ps-13 w-full">
                    <div className="bg-white ps-2">
                        <h1 className="font-sans font-bold text-2xl">Organization Information</h1>
                    </div>
                    <hr className="mt-3"></hr>
                    <div className="w-4/12 p-6">
                        <div className="flex">
                            <div className="w-4/12">
                                <p className="font-sans font-semibold">Owner name</p>
                            </div>
                            <div className="w-3">:</div>
                            <div className="w-8/12">
                                <p> {details?.name}</p>
                            </div>
                        </div>
                        <div className="flex mt-3">
                            <div className="w-4/12">
                                <p className="font-sans font-semibold">company email</p>
                            </div>
                            <div className="w-3">:</div>
                            <div className="w-8/12">
                                <p> {details?.email}</p>
                            </div>
                        </div>
                        <div className="flex mt-3">
                            <div className="w-4/12">
                                <p className="font-sans font-semibold">Owner name</p>
                            </div>
                            <div className="w-3">:</div>
                            <div className="w-8/12">
                                <p>{details?.address.country && Country.getCountryByCode(details?.address.country)?.name}</p>
                            </div>
                        </div>
                        <div className="flex mt-3">
                            <div className="w-4/12">
                                <p className="font-sans font-semibold">State</p>
                            </div>
                            <div className="w-3">:</div>
                            <div className="w-8/12">
                                <p>{details?.address.state && State.getStateByCode(details?.address.state)?.name}</p>
                            </div>
                        </div>

                        <div className="flex mt-3">
                            <div className="w-4/12">
                                <p className="font-sans font-semibold">City</p>
                            </div>
                            <div className="w-3">:</div>
                            <div className="w-8/12">
                                <p>{details?.address.city }</p>
                            </div>
                        </div>



                    </div>
                </div>
                <div className="rounded-md mb-4 mt-2 bg-white shadow-md h-auto p-7 ps-13  w-full ">
                    <div className="bg-white ps-2">
                        <h1 className="font-sans font-bold text-xl">Additional Information</h1>
                    </div>
                    <hr className="mt-3"></hr>
                    {/* Owner id proof */}
                    <div className="ms-6">
                        <div className="p-6">
                            <h3>Owner id proof</h3>
                        </div>
                        <div style={{ backgroundColor: '#f0f2f0' }} className="border-stone-950 border bg-[#f0f2f0] rounded w-7/12 h-64">
                            <img src={`${details?.ownerId}`} alt="" className="w-full h-full" />
                        </div>
                    </div>
                    {/* Company license */}
                    <div className="ms-6">
                        <div className="p-6">
                            <h3>Company license</h3>
                        </div>
                        <div className="border-stone-950 bg-[#f0f2f0]  border rounded w-7/12 h-64">
                        <img src={`${details?.companyLicense}`} alt="" className="w-full h-full" />
                        </div>
                    </div>
                    {/* Company insurance */}
                    <div className="ms-6">
                        <div className="p-6">
                            <h3>Company insurance</h3>
                        </div>
                        <div className="border-stone-950 bg-[#f0f2f0]  border rounded w-7/12 h-64">
                        <img src={`${details?.companyInsurance}`} alt="" className="w-full h-full" />

                        </div>
                    </div>
                    {/* Bank passbook */}
                    <div className="ms-6">
                        <div className="p-6">
                            <h3>Bank passbook</h3>
                        </div>
                        <div className="border-stone-950 border bg-[#f0f2f0]  rounded w-7/12 h-64">
                        <img src={`${details?.bankPassbook}`} alt="" className="w-full h-full" />

                        </div>
                    </div>
                    {/* Action buttons */}
                    <div className="flex gap-3 p-4 w-full justify-end">
                          {
                            details&& details?.approved ===false&& <>
                                                <button className="rounded-sm text-white w-20 ps-3 pe-3 pt-1 pb-1 bg-blue-600" onClick={Approve}>Approve</button>
                        <button className="rounded-sm text-white shadow-md w-20 ps-3 pe-3 pt-1 pb-1 bg-red-500" onClick={Reject}>Reject</button>
                            </>
                          }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestDetails;



