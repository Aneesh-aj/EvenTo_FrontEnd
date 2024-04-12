import React, { useEffect, useState } from "react";
import Api from "../../survices/axios";
import Nav from "../../componant/Nav";

const Organizers: React.FC = () => {
    const [requests, setRequests] = useState<any[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get('/admin/organizers');
                setRequests(response.data.result);
                console.log(" hhhh", response.data)
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchData();
    }, []);

    async function access(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: any) {
        console.log("the calling id ", id)
         await Api.post(`/admin/organizer/block/${id}`)
    }

    return (
        <>
            <Nav />
            <div className="w-full h-96 p-4 flex flex-col items-center">
                <div className="rounded-md bg-white shadow-md w-full h-11 flex flex-row items-center">
                    <h2 className="font-sans font-bold ps-5"> All Users</h2>
                </div>

                <div className="rounded-md bg-white mb-1 shadow-md mt-3 w-11/12 h-9 flex border items-center">
                    <div className="w-4/12 flex justify-center">Owner name</div>
                    <div className="w-4/12 flex justify-center">Email</div>
                    <div className="w-4/12 flex justify-center">id</div>
                    <div className="w-4/12 flex justify-center"></div>
                </div>
                {requests &&
                    requests.map((request) => (
                        <div
                            key={request._id}
                            className="rounded-md bg-white shadow-md mt-2 w-11/12 h-12 flex flex-row items-center"
                        >
                            <div className="w-4/12 flex justify-center">{request.name}</div>
                            <div className="w-4/12 flex justify-center">{request.email}</div>
                            <div className="w-4/12 flex justify-center">{request._id}</div>
                            <div className="w-4/12 flex justify-center">
                                <button onClick={(e) => access(e, request._id)} className="bg-blue-600 text-white w-16 rounded">
                                    {request.blocked ? ' Unblock' : 'Block'}
                                </button>
                            </div>
                        </div>
                    )
                    )}
            </div>
        </>
    );
};

export default Organizers;
