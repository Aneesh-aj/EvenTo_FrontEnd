import React, { useEffect, useState } from "react";
import Api from "../../survices/axios";
import { Link } from "react-router-dom";
import Nav from "../../componant/common/Nav";

const AdminRequest: React.FC = () => {
  const [requests, setRequests] = useState<any[] | null>(null);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get('/admin/Requests');
        setRequests(response.data.result);
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

      <div className="w-full h-96 p-4 flex flex-col items-center">
        <div className="rounded-md bg-white shadow-md w-full h-11 flex flex-row items-center">
          <h2 className="font-sans font-bold ps-5">Organization Request</h2>
        </div>
        <div className="rounded-md mt-1 w-11/12 h-11 flex items-center">
          <div className={`w-6/12 flex justify-center ${isAccepted ? '' : 'underline'}`}>
            <h3 onClick={pending}>Pending</h3>
          </div>
          <div className={`w-6/12 flex justify-center ${isAccepted ? 'underline ' : ''}`}>
            <h3 onClick={accepted}>Accept</h3>
          </div>
        </div>

        <div className="rounded-md bg-white mb-1 shadow-md mt-1 w-11/12 h-9 flex border items-center">
          <div className="w-4/12 flex justify-center">Owner name</div>
          <div className="w-4/12 flex justify-center">Email</div>
          <div className="w-4/12 flex justify-center">id</div>
          <div className="w-4/12 flex justify-center"></div>
        </div>
        {requests &&
          requests.map((request) => (
            (isAccepted ? request.approved : !request.approved) ? (
              <div
                key={request._id}
                className="rounded-md bg-white shadow-md mt-2 w-11/12 h-12 flex flex-row items-center"
              >
                <div className="w-4/12 flex justify-center">{request.name}</div>
                <div className="w-4/12 flex justify-center">{request.email}</div>
                <div className="w-4/12 flex justify-center">{request._id}</div>
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
