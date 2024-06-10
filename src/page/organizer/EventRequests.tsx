import  { useState } from "react";
import { EventRequestListing } from "../../componant/organizer/EventRequestListing";
import { EventRequestApprove } from "../../componant/organizer/EventRequestApprove";

export const EventRequests = () => {
    const [activeTab, setActiveTab] = useState("pending");

    return (
        <>
            <div className="w-full">
                <div className="w-full h-[4rem] border-2 rounded-md p-5 bg-white">
                    <h1 className="font-bold">All Requests</h1>
                </div>
                <div className="w-full flex justify-around mt-4 ">
                    <div
                        className={`px-4 py-2 cursor-pointer ${activeTab === "pending" ? "border-b-4 border-blue-500 text-blue-500" : "text-gray-600"}`}
                        onClick={() => setActiveTab("pending")}
                    >
                        Pending Requests
                    </div>
                    <div
                        className={`px-4 py-2 cursor-pointer ${activeTab === "approved" ? "border-b-4 border-green-500 text-green-500" : "text-gray-600"}`}
                        onClick={() => setActiveTab("approved")}
                    >
                        Approved Requests
                    </div>
                </div>
                <div className="mt-4">
                    {activeTab === "pending" && (
                        <div>
                            <EventRequestListing/>
                        </div>
                    )}
                    {activeTab === "approved" && (
                        <div>
                            <EventRequestApprove/>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
