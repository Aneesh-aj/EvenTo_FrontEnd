import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import bg from "../../assets/360_F_120282530_gMCruc8XX2mwf5YtODLV2O1TGHzu4CAb.jpg"
import { motion } from "framer-motion"
import { useEffect, useState } from 'react';
import { getAlleventPost } from '../../api/organizer';
// import { Hidden } from '@mui/material';

export const UserEventListing = () => {

    // const events = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    const [events, setEvents] = useState([])

    useEffect(() => {
        async function fetchingPosts() {
            const response = await getAlleventPost()
            setEvents(response.posts)
        }
        fetchingPosts()
    }, [])

    return (
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
                                <Card
                                    sx={{
                                        width: 345,
                                        bgcolor: "#FFFBF5",
                                        border: "1px solid #CCCCCC",
                                        borderRadius: "10px",
                                        transition: "transform 0.3s",
                                        "&:hover": {
                                            transform: "scale(1.03)",
                                        }
                                    }} >
                                    <CardMedia
                                        sx={{ height: 180, objectFit: "contain" }}
                                        image={ele?.image}
                                        title="green iguana"
                                    />
                                    <CardContent sx={{ borderTop: "1px solid #CCCCCC", bgcolor: "white", borderRadius: "10px", transform: "translateY(-8px)" }}>
                                        <Typography gutterBottom variant="h5" sx={{ fontSize: "23px", fontWeight: "bold" }} component="div">
                                            {ele?.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ padding: "10px", height: '80px', overflow: 'hidden', overflowWrap: 'break-word', wordWrap: 'break-word' }} color="text.secondary">
                                            {ele?.about}
                                        </Typography>
                                        <CardActions>
                                            <Button size="small">Share</Button>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </CardContent>
                                </Card>

                            </motion.div>
                        )
                    })
                }
            </motion.section>
        </div>

    )
}