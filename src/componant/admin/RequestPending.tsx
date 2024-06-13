import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { allRequestsPending } from "../../api/admin";
import { clearUser } from "../../utils/clearUser";
import { useDispatch } from "react-redux";
import image from "../../assets/3156814.jpg";
import { Pagination } from "@mui/lab";
import { Box } from "@mui/material";

export const RequestPending: React.FC = () => {
  const [requests, setRequests] = useState<any[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const defaultAvatarUrl = "https://via.placeholder.com/150";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await allRequestsPending();
        const result = response.result.filter((ele:any)=>ele.approved ==false)

        if (response.success === false) {
          toast.error(response.message);
          clearUser(dispatch);
          navigate("/auth/adminLogin");
          return;
        }

        setRequests(result);
        setTotalPages(Math.ceil(result.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const paginatedRequests = requests
    ? requests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  return (
    <>
      <div className="w-full h-96 p-4 flex flex-col items-center">
        <div className="rounded-md bg-white mb-1 shadow-md mt-1 w-full h-9 flex border p-6 items-center">
          <div className="w-3/12 flex justify-center">Profile</div>
          <div className="w-2/12 flex justify-center">Owner name</div>
          <div className="w-4/12 flex justify-center">Email</div>
          <div className="w-3/12 flex justify-center">Phone number</div>
          <div className="w-4/12 flex justify-center"></div>
        </div>
        {paginatedRequests.length ? (
          paginatedRequests.map((request) => (
            <div
              key={request._id}
              className="rounded-md bg- p-5 h-[5rem] bg-white border-2 shadow-md mt-2 w-11/12 flex flex-row items-center"
            >
              <div className="w-1/12 flex justify-center">
                <img src={request.profileImage || defaultAvatarUrl} className="h-12 w-12 rounded-full" alt="" />
              </div>
              <div className="w-4/12 flex justify-center">{request.name}</div>
              <div className="w-4/12 flex justify-center">{request.email}</div>
              <div className="w-3/12 flex justify-center">{request.phoneNumber}</div>
              <div className="w-4/12 flex justify-center">
                <Link to={`/admin/requestDetails/${request._id}`}>
                  <button className="bg-blue-600 text-white w-16 rounded">View</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-auto">
            <div className="w-[50%] h-[400px] flex justify-center">
              <img src={image} className="w-full h-full" alt="" />
            </div>
          </div>
        )}
        <Box mt={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </Box>
      </div>
    </>
  );
};
