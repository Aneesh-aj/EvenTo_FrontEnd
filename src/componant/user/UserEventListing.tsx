import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { motion } from "framer-motion";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getAlleventPost } from '../../api/organizer';
import { getAllcategory } from "../../api/user";
import image from '../../assets/9318688.jpg';

const splitDate = (dateString: string) => {
    const dateParts = dateString.split(' ');
    const day = dateParts[0];
    const month = dateParts[1];
    const date = dateParts[2];
    const year = dateParts[3];
    return `${month} ${date} ${day} ${year}`;
};

export const UserEventListing = () => {
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [searchEvent, setSearchEvent] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState([]);
    const [filterOption, setFilterOption] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(false);
            try {
                const response = await getAlleventPost();
                console.log(" --------from backend", response)
                const allcategory = await getAllcategory();
                setCategory(allcategory.category);
                setEvents(response.posts);
                setSearchEvent(response.posts);
            } catch (error) {
                console.error('Error fetching event posts:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleSearch = (query: string) => {
        if (!query) return setSearchEvent(events);

        const filteredEvents = searchEvent.filter((event: any) =>
            event.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchEvent(filteredEvents);
    };

    const handleInputChange = (e: any) => {
        const query = e.target.value;
        setSearchQuery(query);
        handleSearch(query);
    };

    const handleFilterChange = async (option: any) => {
        setFilterOption(option);

        const filteredEvents = events.filter((event: any) => event?.categoryId === option);
        option === "all" ? setSearchEvent(events) : setSearchEvent(filteredEvents);
    };

    return (
        <>
            <div className='w-full h-[4rem] flex flex-col xl:flex-row gap-3 bg-white justify-between items-center'>
                <div className='w-full xl:w-[30%] flex justify-between p-2'>
                    <h1 className="font-bold">Events</h1>
                    <div className='w-[13rem] flex gap-5'>
                        <h1 className='font-bold'>Filter</h1>
                        <select value={filterOption} className='border-2 border-black rounded-md' onChange={(e) => handleFilterChange(e.target.value)}>
                            <option value="all">All</option>
                            {category && category.map((ele: any) => (
                                <option key={ele._id} value={ele._id}>{ele.category}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='h-[2rem] flex gap-2'>
                    <input type="text" className='rounded-md h-[2rem] ps-2 border-2 border-black' value={searchQuery} onChange={handleInputChange} />
                    <button className='bg-blue-400 h-[2rem] rounded-md w-[5rem] text-white' onClick={() => handleSearch(searchQuery)}>Search</button>
                </div>
            </div>
            <div className="w-full xl:m-2 p-2 h-auto mb-16">
                {loading ? (
                    <div className="grid gap-3 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {[...Array(8)].map((_, index) => (
                            <Card key={index} className='shadow-md' sx={{ width: '100%', height: 'auto', border: 'none', boxShadow: 'none', borderRadius: '10px' }}>
                                <Skeleton height={330} />
                                <CardContent sx={{ bgcolor: 'transparent', display: 'flex', flexDirection: 'column', gap: 1, borderRadius: '10px', margin: 0, padding: 0 }}>
                                    <Skeleton width="80%" height={30} />
                                    <Skeleton width="60%" height={20} />
                                    <Skeleton width="40%" height={20} />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : error ? (
                    <section className="w-full flex object-cover justify-center h-[500px]">
                        <img src={image} alt="Error" />
                    </section>
                ) : searchEvent.length > 0 ? (
                    <motion.section
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.25,
                                },
                            },
                        }}
                        initial="hidden"
                        animate="show"
                        className="grid gap-3 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                    >
                        {searchEvent.map((ele: any) => (
                            <motion.div key={ele._id} variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="flex justify-center">
                                <Card
                                    onClick={() => {
                                        navigate(`/user/postDetails/${ele._id}`);
                                    }}
                                    className='shadow-md relative'
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        border: 'none',
                                        boxShadow: 'none',
                                        borderRadius: '10px',
                                        transition: 'transform 0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.03)',
                                        },
                                    }}
                                >
                                    <CardMedia
                                        sx={{ height: 330, objectFit: 'contain', borderRadius: '10px' }}
                                        image={ele?.image}
                                        title="Event Image"
                                    />
                                    {new Date(ele.event.date) < new Date() && (
                                        <div className="absolute top-0 right-0 w-full bg-red-500 text-white text-md font-bold xl:ps-14 shadow-gray-500 text-shadow-xl  shadow-sm px-2 py-1 transform rotate-45 translate-x-12 text-center ps-10 translate-y-4">
                                            Expired
                                        </div>
                                    )}
                                    <div className="-translate-y-6 rounded-b-lg w-full h-30 bg-black text-center">
                                        <h1 className="text-white">{splitDate(ele.event.date)}</h1>
                                    </div>
                                    <CardContent
                                        sx={{
                                            bgcolor: 'transparent',
                                            display: 'flex',
                                            height: 'auto',
                                            flexDirection: 'column',
                                            gap: 1,
                                            borderRadius: '10px',
                                            margin: 0,
                                            padding: 0,
                                        }}
                                    >
                                        <Typography gutterBottom variant="h5" sx={{ fontSize: '23px', fontWeight: 'bold' }} component="div">
                                            {ele?.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ height: 'auto', overflow: 'hidden', overflowWrap: 'break-word', wordWrap: 'break-word' }}
                                            color="text.secondary"
                                        >
                                            {ele && ele.about.length > 30 ? ele.about.slice(0, 30) + '...' : ele.about}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ height: '30px', overflow: 'hidden', overflowWrap: 'break-word', wordWrap: 'break-word' }}
                                            color="text.secondary"
                                        >
                                            Rs.{ele.event.paymentAmount}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.section>
                ) : (
                    <section className="w-full flex object-cover justify-center h-[500px]">
                        <img src={image} alt="No events found" />
                    </section>
                )}
            </div>
        </>
    );
};
