import React, { useEffect, useState } from "react";
import api from "../../survices/axios";

const Users: React.FC = () => {
    const [requests, setRequests] = useState<any[] | null>(null);

    const access = async (id: any) => {
        try {
            
            console.log("Attempting to toggle block for user with ID:", id);

            const response = await api.post(`/admin/user/block/${id}`);
            console.log("API Response:", response);

            fetchData();
        } catch (error) {
            console.error('Error toggling block status:', error);
            console.log(error)
        }
    };
  

    useEffect(() => {
        var fetchData = async () => {
            try {
                console.log("ca;;omg")
                const response = await api.get('/admin/users');
                console.log("after fetchig")
                setRequests(response.data.result);
                
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

       

        fetchData();
    }, []);
   
    


  
    return (
        <div className="w-full h-96 p-4 flex flex-col items-center">
            <div className="rounded-md bg-white shadow-md w-full h-11 flex flex-row items-center">
                <h2 className="font-sans font-bold ps-5"> All Users</h2>
            </div>
           

            <div className="rounded-md bg-white mb-1 shadow-md mt-2 w-11/12 h-9 flex border items-center">
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
                                    <button onClick={(e)=>access(request._id)} className="bg-blue-600 text-white w-16 rounded">
                                        {request.blocked?' Unblock':'Block'}
                                    </button>
                                    
                                
                            </div>
                        </div>
                   
                ))}
        </div>
    );
};

export default Users;
function fetchData() {
    throw new Error("Function not implemented.");
}

