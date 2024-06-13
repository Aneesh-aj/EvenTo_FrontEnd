import React, { useEffect, useState } from "react";
import Api from "../../survices/axios";
import Nav from "../../componant/common/Nav";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Organizers: React.FC = () => {
    const [requests, setRequests] = useState<any[] | null>(null);
    const [filteredRequests, setFilteredRequests] = useState<any[] | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const itemsPerPage = 7;

    const fetchData = async () => {
        try {
            const response = await Api.get('/admin/organizers');
            const result = response.data.result;
            setRequests(result);
            setFilteredRequests(result);
            setTotalPages(Math.ceil(result.length / itemsPerPage));
            if (response.data.state === 400) {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = requests?.filter(request =>
            request.name.toLowerCase().includes(query) ||
            request.email.toLowerCase().includes(query) ||
            request.phoneNumber.toLowerCase().includes(query)
        ) || []; // Provide a default empty array if filtered is undefined
        setFilteredRequests(filtered);
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        setPage(1); // Reset to the first page when searching
    };

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const paginatedRequests = filteredRequests
        ? filteredRequests.slice((page - 1) * itemsPerPage, page * itemsPerPage)
        : [];

    async function access(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: any) {
        console.log("the calling id ", id);
        await Api.post(`/admin/organizer/block/${id}`);
        fetchData();
    }

    return (
        <>
            <Nav />
            <div className="w-full h-96 p-4 flex flex-col items-center pt-20">
                <div className="rounded-md bg-white shadow-md w-full h-14 p-4 border-2 flex flex-row items-center">
                    <h2 className="font-sans font-bold ps-5">All Organizers</h2>
                </div>
                <Toaster position="top-right" reverseOrder={false} />
                <div className="mt-3 w-11/12 flex justify-end">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search..."
                        className="border p-2 rounded"
                    />
                </div>
                <div className="rounded-md bg-white mb-1 shadow-md mt-3 w-11/12 h-12 p-3 flex border items-center">
                    <div className="w-4/12 flex justify-center">Owner name</div>
                    <div className="w-4/12 flex justify-center">Email</div>
                    <div className="w-4/12 flex justify-center">Phone</div>
                    <div className="w-4/12 flex justify-center"></div>
                </div>
                {paginatedRequests &&
                    paginatedRequests.map((request) => (
                        <div
                            key={request._id}
                            className="rounded-md bg-white shadow-md mt-2 w-11/12 h-20 p-5 flex flex-row items-center"
                        >
                            <div className="w-4/12 flex justify-center">{request.name}</div>
                            <div className="w-4/12 flex justify-center">{request.email}</div>
                            <div className="w-4/12 flex justify-center">{request.phoneNumber}</div>
                            <div className="w-4/12 flex justify-center">
                                <button onClick={(e) => access(e, request._id)} className="bg-blue-600 text-white w-16 rounded">
                                    {request.blocked ? 'Unblock' : 'Block'}
                                </button>
                            </div>
                        </div>
                    ))}
                <div className="mt-4">
                    <Stack spacing={2} direction="row" justifyContent="center">
                        <Pagination count={totalPages} page={page} onChange={handleChange} />
                    </Stack>
                </div>
            </div>
        </>
    );
};

export default Organizers;
