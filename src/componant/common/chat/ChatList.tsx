import React, { useEffect, useState } from 'react';
import useGetUser from '../../../hook/useGetUser';
import { getChatUsers } from '../../../api/organizer';
import { useLocation, useNavigate } from 'react-router-dom';
import bg from "../../../assets/9318688.jpg"

function ChatList() {
   const currentUser = useGetUser();
   const [conversations, setConversations] = useState([]);
   const navigate = useNavigate();
   const location = useLocation();
   const currentPath = location.pathname;

   useEffect(() => {
      async function getUser() {
         const users = await getChatUsers(currentUser.id);
         console.log("the users ______", users);
         setConversations(users.userList);
      }
      getUser();
   }, [currentUser.id]);

   return (
      <div className="w-1/3 bg-white h-screen text-gray-800 shadow-xl border">
         <div className="p-4 border-b border-gray-200">
            <input
               type="text"
               placeholder="Search"
               className="w-full p-2 rounded bg-gray-100 text-gray-800"
            />
         </div>
         <div className="overflow-y-auto h-auto">
            {conversations.length > 0 ? (
               conversations.map((convo:any) => (
                  <div
                     key={convo?.id}
                     className="p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                     onClick={() => {
                        let basePath = currentPath;
                        console.log("the base path ", basePath);
                        if (basePath !== "/organizer/message" && basePath !== "/user/message") {
                           basePath = currentPath.replace(/\/[^\/]*$/, '');
                        }
                        const newUrl = `${basePath}/${convo.participantDetails[0]._id}`;
                        navigate(newUrl);
                     }}
                  >
                     <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                           <img src={convo.participantDetails[0].profileImage} alt="" className='w-full h-full object-cover' />
                        </div>
                        <div>
                           <div className="font-bold">{convo?.participantDetails[0].name}</div>
                           <div className="text-gray-500 text-sm truncate">
                              {convo.messageDetails[convo.messageDetails.length - 1].message}
                           </div>
                        </div>
                     </div>
                  </div>
               ))
            ) : (
               <div className='w-full h-[400px]'>
                    <img src={bg} alt="" />
                 </div>
            )}
         </div>
      </div>
   );
}

export default ChatList;
