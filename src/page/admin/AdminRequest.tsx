import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../componant/common/Nav";
import toast, { Toaster } from "react-hot-toast";
import { allRequests } from "../../api/admin";
import { clearUser } from "../../utils/clearUser";
import { useDispatch } from "react-redux";
const AdminRequest: React.FC = () => {
  const [requests, setRequests] = useState<any[] | null>(null);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await allRequests()
        console.log(" the response======================================================= from the user", response)
        if (response.success === false) {
          toast.error(response.message)
          clearUser(dispatch);
          navigate("/auth/adminLogin")
        }
        setRequests(response.result);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchData();
  }, []);

  function pending() {
    setIsAccepted(false);
    console.log("calling ", isAccepted);
  }

  function accepted() {
    setIsAccepted(true);
    console.log("calling", isAccepted);
  }

  return (
    <>
      <Nav />

      <div className="w-full h-96 p-4 pt-[5rem] flex flex-col items-center">
        < div className="rounded-md p-3 bg-white shadow-md w-full h-11 flex flex-row items-center">
          <h2 className="font-sans font-bold ps-5">Organization Request</h2>
          <Toaster position="top-right"
            reverseOrder={false} />
        </div>
        <div className="rounded-md p-3 mt-1 w-11/12 h-11 flex items-center">
          <div className={`w-6/12 flex justify-center ${isAccepted ? '' : 'underline'}`}>
            <h3 className="font-bold" onClick={pending}>Pending</h3>
          </div>
          <div className={`w-6/12 flex justify-center ${isAccepted ? 'underline ' : ''}`}>
            <h3 className="font-bold" onClick={accepted}>Accept</h3>
          </div>
        </div>

        <div className="rounded-md bg-white mb-1 shadow-md mt-1 w-11/12 h-9 flex border p-4 items-center">
          <div className="w-4/12 flex justify-center">Owner name</div>
          <div className="w-4/12 flex justify-center">Email</div>
          <div className="w-4/12 flex justify-center">phoneNumber</div>
          <div className="w-4/12 flex justify-center"></div>
        </div>
        {requests &&
          requests.map((request) => (
            (isAccepted ? request.approved : !request.approved) ? (
              <div
                key={request._id}
                className="rounded-md bg- p-5 h-[5rem] bg-white border-2 shadow-md mt-2 w-11/12  flex flex-row items-center"
              >
                <div className="w-4/12 flex justify-center">{request.name}</div>
                <div className="w-4/12 flex justify-center">{request.email}</div>
                <div className="w-4/12 flex justify-center">{request.phoneNumber}</div>
                <div className="w-4/12 flex justify-center">
                  <Link to={`/admin/requestDetails/${request._id}`}>
                    <button className="bg-blue-600 text-white w-16 rounded">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            ) : null
          ))}
      </div>
    </>
  );
};

export default AdminRequest;
