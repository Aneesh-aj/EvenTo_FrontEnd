import  { useEffect, useState } from 'react';
import useGetUser from '../../../hook/useGetUser';
import { getChatUsers } from '../../../api/organizer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import bg from "../../../assets/9318688.jpg";
import { BottumBar } from '../BottumBar';
import { OrganizerBottumBar } from '../OrganizerBottumBar';

function ChatList() {
    const currentUser = useGetUser();
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const currentPath = location.pathname;

    useEffect(() => {
        async function getUser() {
            const users = await getChatUsers(currentUser.id);
            setConversations(users.userList);
            setLoading(false); // Set loading to false once data is fetched
        }
        getUser();
    }, [currentUser.id]);

    const isHiddenOnMobile = id ? 'hidden md:hidden xl:block' : 'block xl:block';

    return (
        <div className={`xl:w-1/3 w-full bg-white h-screen text-gray-800 shadow-xl border ${isHiddenOnMobile}`}>
            <div className="p-4 border-b border-gray-200">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full p-2 rounded bg-gray-100 text-gray-800"
                />
            </div>
            <div className="overflow-y-auto h-auto">
                {loading ? (
                    // Skeleton loading state
                    Array(5).fill(0).map((_, index) => (
                        <div key={index} className="p-4 border-b border-gray-200 animate-pulse">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : conversations.length > 0 ? (
                    conversations.map((convo: any) => (
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
                                    <img src={convo.participantDetails[0]?.profileImage} alt="" className='w-full h-full object-cover' />
                                </div>
                                <div>
                                    <div className="font-bold">{convo?.participantDetails[0]?.name}</div>
                                    <div className="text-gray-500 text-sm truncate">
                                        {convo.messageDetails[convo.messageDetails.length - 1]?.message}
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
            {currentUser.role === "user" ? (
                <div className="w-full flex justify-center">
                    <BottumBar />
                </div>
            ) : currentUser.role === "organizer" ? (
                <div className="w-full bg-red-100 flex justify-center">
                    <OrganizerBottumBar />
                </div>
            ) : (
                <div className="w-full flex justify-center">
                    <div>Hello</div>
                </div>
            )}
        </div>
    );
}

export default ChatList;
