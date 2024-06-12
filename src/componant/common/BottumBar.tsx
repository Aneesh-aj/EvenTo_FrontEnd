// BottumBar.jsx or BottumBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import useGetUser from '../../hook/useGetUser';

export const BottumBar: React.FC = () => {
   const currentUser = useGetUser()

  return (
    <div className="fixed bottom-1 w-[96%] block xl:hidden bg-white  shadow-2xl rounded-3xl border-t border-gray-300 z-50 border-2">
      <div className="flex justify-around items-center py-2  ">
        <Link to="/" className="text-gray-600 hover:text-blue-500  w-1/5 flex flex-col justify-center items-center">
       
           <HomeOutlinedIcon/>
          <span className="block text-xs">Home</span>
        </Link>
        <Link to="/user/booking" className="text-gray-600 hover:text-blue-500 w-1/5 flex flex-col justify-center items-center">
          <BookOutlinedIcon/>
          <span className="block text-xs">Booking</span>
        </Link>
        <Link to="/user/events" className="text-gray-600 hover:text-blue-500  w-1/5 flex flex-col justify-center items-center">
           <CelebrationOutlinedIcon/>
          <span className="block text-xs">Event</span>
        </Link>
        <Link to="/user/message" className="text-gray-600 hover:text-blue-500  w-1/5 flex flex-col justify-center items-center">
           <MailOutlineOutlinedIcon/>
          <span className="block text-xs">Message</span>
        </Link>
        <Link to={`/user/posts`} className="text-gray-600 hover:text-blue-500  w-1/5 flex flex-col justify-center items-center">
          <DynamicFeedIcon/>
          <span className="block text-xs">Posts</span>
        </Link>
        <Link to={`/user/profile/${currentUser.id}`} className="text-gray-600 hover:text-blue-500  w-1/5 flex flex-col justify-center items-center">
          <Person2OutlinedIcon/>
          <span className="block text-xs">Profile</span>
        </Link>
      </div>
    </div>
  );
};
