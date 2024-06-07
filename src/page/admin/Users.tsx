import React, { useEffect, useState } from "react";
import api from "../../survices/axios";
import Pagination from "@mui/material/Pagination";

const Users: React.FC = () => {
    const [requests, setRequests] = useState<any[] | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const access = async (id: any) => {
        try {
            console.log("Attempting to toggle block for user with ID:", id);

            const response = await api.post(`/admin/user/block/${id}`);
            console.log("API Response:", response);

            fetchData(page);
        } catch (error) {
            console.error('Error toggling block status:', error);
            console.log(error);
        }
    };

    const fetchData = async (page: number) => {
        try {
            console.log("calling");

            const response = await api.get(`/admin/users?page=${page}`);
            console.log("after fetching");
            setRequests(response.data.result);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div className="w-full h-96 p-4 flex flex-col items-center ">
            <div className="rounded-md bg-white shadow-md w-full h-14 p-5 border-2  flex flex-row items-center">
                <h2 className="font-sans font-bold ps-5"> All Users</h2>
            </div>

            <div className="rounded-md bg-white mb-1 shadow-md mt-2 w-11/12 h-9  p-5 flex border items-center">
                <div className="w-4/12 flex justify-center">Owner name</div>
                <div className="w-4/12 flex justify-center">Email</div>
                <div className="w-4/12 flex justify-center">id</div>
                <div className="w-4/12 flex justify-center"></div>
            </div>
            {requests &&
                requests.map((request) => (
                    <div
                        key={request._id}
                        className="rounded-md bg-white shadow-md border mt-2 w-11/12 h-12 p-8 flex flex-row items-center"
                    >
                        <div className="w-4/12 flex justify-center">{request.name}</div>
                        <div className="w-4/12 flex justify-center">{request.email}</div>
                        <div className="w-4/12 flex justify-center">{request._id}</div>
                        <div className="w-4/12 flex justify-center">
                            <button onClick={(e) => access(request._id)} className="bg-blue-600 text-white w-16 rounded">
                                {request.blocked ? ' Unblock' : 'Block'}
                            </button>
                        </div>
                    </div>
                ))}
            <div className="flex justify-center mt-4">
                <Pagination count={totalPages} page={page} onChange={handleChange} />
            </div>
        </div>
    );
};

export default Users;
