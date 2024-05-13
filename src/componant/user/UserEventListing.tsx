import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from "framer-motion"
import { useEffect, useState } from 'react';
import { getAlleventPost } from '../../api/organizer';
import { useNavigate } from 'react-router-dom';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { searchEventPost } from '../../api/user';
// import { Hidden } from '@mui/material';

export const UserEventListing = () => {
    const navigate = useNavigate()

    const [events, setEvents] = useState([])
    const [searchQuery, setSearchQuery] = useState('');

    

    useEffect(() => {
        async function fetchingPosts() {
            if (searchQuery.trim() === '') {
                const response = await getAlleventPost();
                  console.log(" the djkajhsd",response)
                setEvents(response.posts);
            } else {
                const response = await searchEventPost(searchQuery);
                setEvents(response.posts);
            }
        }
        fetchingPosts()
    }, [searchQuery])

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            const response = await getAlleventPost();
            setEvents(response.posts);
        } else {
            const response = await searchEventPost(searchQuery);
            setEvents(response.posts);
        }
    };
      
    const centerContent = (
        <IconField iconPosition="left"  className='border-2 rounded-md '>
            <InputIcon className="pi pi-search" />
            <InputText className='ps-3' placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </IconField>
    );

    return (
        <>
            {/* <div className=" h-14 w-full flex items-center gap-11 ps-5 bg-white">
                <h1 className="font-bold">All Events</h1>
                <div className="card">
                </div>
            </div> */}
            <div className="">
                < motion.section
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
                    {
                        events && events.map((ele: any) => {
                            return (

                                <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
                                    <Card onClick={() => { navigate(`/user/postDetails/${ele._id}`) }}
                                        sx={{
                                            width: 200,
                                            height:470,
                                            //  bgcolor: "#f5f5f5",

                                            bgcolor: "white",
                                            border:"none",
                                            boxShadow:'none',
                                            borderRadius: "10px",
                                            transition: "transform 0.3s",
                                            "&:hover": {
                                                transform: "scale(1.03)",
                                            }
                                        }} >
                                        <CardMedia
                                            sx={{ height: 330, objectFit: "contain",borderRadius:'10px' }}
                                            image={ele?.image}
                                            title="green iguana"
                                            
                                        />
                                        <div className=' -translate-y-6 rounded-b-lg w-full h-30 bg-black text-center'>
                                               <h1 className='text-white'>may 12 monday  2024</h1>
                                        </div>

                                        <CardContent sx={{ bgcolor:"transparent",display:"flex",flexDirection:"column", gap:1 ,  borderRadius: "10px",margin:0,padding:0 }}>
                                            <Typography gutterBottom variant="h5" sx={{ fontSize: "23px", fontWeight: "bold" }} component="div">
                                                {ele?.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{  height: 'px', overflow: 'hidden', overflowWrap: 'hidden'}} color="text.secondary">
                                                {ele && ele.about.length > 27? ele.about.slice(0,27)+"...": ele.about}
                                            </Typography>
                                            <Typography variant="body2" sx={{  height: '80px', overflow: 'hidden', overflowWrap: 'break-word', wordWrap: 'break-word' }} color="text.secondary">
                                                {/* {ele?.paymentAmound} */}
                                                $ 100
                                            </Typography>
                                           
                                        </CardContent>
                                    </Card>

                                </motion.div>
                            )
                        })
                    }
                </motion.section>
            </div>
        </>
    )
}