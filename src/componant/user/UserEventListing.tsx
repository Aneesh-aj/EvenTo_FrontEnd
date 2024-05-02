import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import bg from "../../assets/360_F_120282530_gMCruc8XX2mwf5YtODLV2O1TGHzu4CAb.jpg"
import { motion } from "framer-motion"
// import { Hidden } from '@mui/material';

export const UserEventListing = () => {

    const events = [1, 2, 3, 4, 5, 6, 7, 8, 9]


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
                className='w-full flex flex-wrap justify-center h-auto gap-3'
            >
                {
                    events && events.map((ele: any) => {
                        return (

                            <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} >
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={bg}
                                        title="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Lizard
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000
                                            species, ranging across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Share</Button>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>

                            </motion.div>
                        )
                    })
                }
            </motion.section>
        </div>

    )
}