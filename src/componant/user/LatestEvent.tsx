import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import TrendingFlatTwoToneIcon from '@mui/icons-material/TrendingFlatTwoTone';
import { Box } from '@mui/material';
import { getAlleventPost } from '../../api/organizer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



export const LatestEvent: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate()


    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(false);
            try {
                const response = await getAlleventPost();
                console.log(" getAllpostss", response)
                setEvents(response.posts);
            } catch (error) {
                console.error('Error fetching event posts:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);
    return (
        <>
            <div className="w-full">
                {
                    events.map((ele: any) => {
                        return (
                            <Box className="w-full bg-white border-2 rounded-md items-center mb-2 p-3 shadow-lg" onClick={() => navigate(`/user/postDetails/${ele._id}`)}>
                                <div className='w-full h-[6rem] flex items-center gap-2 mb-3 '>
                                    <img src={ele.image} alt="" className='w-full h-full rounded-md' />
                                </div>
                                <Divider variant='middle' className='' />
                                <div className=''>
                                    <p className='p-2'>
                                        {ele.about}
                                    </p>
                                    <div className='p-2 w-full flex justify-center items-center'>
                                        <TrendingFlatTwoToneIcon />
                                    </div>
                                </div>
                            </Box>
                        )
                    })
                }
            </div>

        </>
    )
}