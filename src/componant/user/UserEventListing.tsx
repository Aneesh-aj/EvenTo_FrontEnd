import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { motion } from "framer-motion";
import { getAlleventPost } from '../../api/organizer';
import {  getAllcategory } from "../../api/user";
import image from '../../assets/9318688.jpg';

export const UserEventListing = () => {
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [searchEvent, setSearchEvent] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState([])
    const [filterOption, setFilterOption] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getAlleventPost();
                const allcategory = await getAllcategory()
                console.log(" all categorys", allcategory,response)
                setCategory(allcategory.category)
                setEvents(response.posts);
                setSearchEvent(response.posts);
            } catch (error) {
                console.error('Error fetching event posts:', error);
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

    const handleFilterChange = async(option: any) => {
        setFilterOption(option);
     
        const filteredEvents = events.filter((event:any) => event?.categoryId === option); 
        setSearchEvent(filteredEvents);
    };

    return (
        <>
            <div className='w-full h-[4rem] flex justify-between items-center'>
                <div>
                    <h1 className="font-bold">Events</h1>
                </div>
                <div className='h-[2rem] flex gap-2'>
                    <input type="text" className='rounded-md h-[2rem] ps-2 border-2 border-black' value={searchQuery} onChange={handleInputChange} />
                    <button className='bg-blue-400 h-[2rem] rounded-md w-[5rem] text-white' onClick={() => handleSearch(searchQuery)}>Search</button>
                </div>
                <div className='w-[13rem] flex gap-5 '>
                    <h1 className='font-bold'>Filter</h1>
                    <select value={filterOption} onChange={(e) => handleFilterChange(e.target.value)}>
                        <option value="">All</option>
                        {category && category.map((ele: any) => (
                            <option key={ele._id} value={ele._id}>{ele.category}</option>
                        ))}
                    </select>

                </div>
            </div>
            <div className="w-full m-2 h-auto">
                {searchEvent.length > 0 ? (
                    <motion.section
                        variants={{
                            Hidden: { opacity: 0 }, show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.25,
                                }
                            }
                        }}
                        initial="hidden"
                        animate="show"
                        className='w-full flex flex-wrap -auto gap-3'
                    >
                        {searchEvent.map((ele: any) => (
                            <motion.div key={ele._id} variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
                                <Card onClick={() => { navigate(`/user/postDetails/${ele._id}`) }} sx={{
                                    width: 200,
                                    height: 470,
                                    bgcolor: "white",
                                    border: "none",
                                    boxShadow: 'none',
                                    borderRadius: "10px",
                                    transition: "transform 0.3s",
                                    "&:hover": {
                                        transform: "scale(1.03)",
                                    }
                                }}>
                                    <CardMedia
                                        sx={{ height: 330, objectFit: "contain", borderRadius: '10px' }}
                                        image={ele?.image}
                                        title="Event Image"
                                    />
                                    <div className=' -translate-y-6 rounded-b-lg w-full h-30 bg-black text-center'>
                                        <h1 className='text-white'>may 12 monday  2024</h1>
                                    </div>
                                    <CardContent sx={{ bgcolor: "transparent", display: "flex", flexDirection: "column", gap: 1, borderRadius: "10px", margin: 0, padding: 0 }}>
                                        <Typography gutterBottom variant="h5" sx={{ fontSize: "23px", fontWeight: "bold" }} component="div">
                                            {ele?.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ height: 'px', overflow: 'hidden', overflowWrap: 'hidden' }} color="text.secondary">
                                            {ele && ele.about.length > 27 ? ele.about.slice(0, 27) + "..." : ele.about}
                                        </Typography>
                                        <Typography variant="body2" sx={{ height: '80px', overflow: 'hidden', overflowWrap: 'break-word', wordWrap: 'break-word' }} color="text.secondary">
                                            $ 100
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.section>
                ) : (
                    <section className='w-full flex object-cover justify-center h-[500px]'>
                        <img src={image} alt="" />
                    </section>
                )}
            </div>
        </>
    );
};
