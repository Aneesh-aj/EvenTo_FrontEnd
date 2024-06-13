import React, { useEffect, useState } from "react";
import Api from "../../survices/axios";
import Pagination from "@mui/material/Pagination";
import defaultProfileImage from "../../assets/3156814.jpg"; // Import your default profile image

const Users: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        // Fetch initial data to get all users and total pages for pagination
        const fetchData = async () => {
            try {
                const response = await Api.get("/admin/users");
                setUsers(response.data.result);
                setFilteredUsers(response.data.result); // Initially set filtered users to all users
                setTotalPages(Math.ceil(response.data.result.length / 10)); // Assuming 10 users per page
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Update filtered users when searchQuery changes
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
        setTotalPages(Math.ceil(filtered.length / 10)); // Recalculate total pages for pagination
        setPage(1); // Reset page number when search query changes
    }, [searchQuery, users]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    // Function to render profile image or default image
    const renderProfileImage = (imageUrl: string | null | undefined) => {
        if (imageUrl) {
            return (
                <div className="h-10 w-10 rounded-full">
                    <img src={imageUrl} className="rounded-full h-full w-full" alt="" />
                </div>
            );
        } else {
            return (
                <div className="h-10 w-10 rounded-full">
                    <img src={defaultProfileImage} className="rounded-full h-full w-full" alt="Default Profile" />
                </div>
            );
        }
    };

    // Paginated users based on current page
    const paginatedUsers = filteredUsers.slice((page - 1) * 10, page * 10);

    return (
        <div className="w-full h-96 p-4 flex flex-col items-center">
            <div className="rounded-md bg-white shadow-md w-full h-14 p-5 border-2 flex flex-row items-center">
                <h2 className="font-sans font-bold ps-5"> All Users</h2>
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="ml-4 px-2 py-1 border rounded-md"
                />
            </div>

            <div className="rounded-md bg-white mb-1 shadow-md mt-2 w-11/12 h-9 p-5 flex border items-center">
                <div className="w-4/12 flex justify-center">Profile</div>
                <div className="w-4/12 flex justify-center">Owner name</div>
                <div className="w-4/12 flex justify-center">Email</div>
                <div className="w-4/12 flex justify-center">ID</div>
                <div className="w-4/12 flex justify-center"></div>
            </div>
            
            {paginatedUsers &&
                paginatedUsers.map((user) => (
                    <div
                        key={user._id}
                        className="rounded-md bg-white shadow-md border mt-2 w-11/12 h-12 p-8 flex flex-row items-center"
                    >
                        <div className="w-4/12 flex justify-center">
                            {renderProfileImage(user.profileImage)}
                        </div>
                        <div className="w-4/12 flex justify-center">{user.name}</div>
                        <div className="w-4/12 flex justify-center">{user.email}</div>
                        <div className="w-4/12 flex justify-center">{user._id}</div>
                        <div className="w-4/12 flex justify-center">
                            {/* <button onClick={(e) => access(user._id)} className="bg-blue-600 text-white w-16 rounded">
                                {user.blocked ? ' Unblock' : 'Block'}
                            </button> */}
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
