import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, IconButton,
    List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Divider, Box, Skeleton
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Nav from "../common/Nav";
import { SideBar } from "../common/SideBar";
import bg from "../../assets/FE.jpg";
import image from "../../assets/9318688.jpg";
import { useNavigate } from "react-router-dom";
import { getAllPost } from "../../api/user";
import Api from '../../survices/axios';
import moment from 'moment';
import useGetUser from '../../hook/useGetUser';
import nocomment from "../../assets/7613.jpg";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import "../../index.css";
import { transform } from 'framer-motion';

export const Posts = () => {
    const currentUser = useGetUser();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPost, setCurrentPost] = useState();
    const [liked, setLiked] = useState(true);
    const [open, setOpen] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [currentImage, setImage] = useState();
    const [comments, setComments] = useState<any>([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const navigate = useNavigate();

    async function getPost() {
        const allposts = await getAllPost();
        console.log("All posts ----------------", allposts);
        setPosts(allposts.posts);
        setLoading(false);
    }

    useEffect(() => {
        getPost();
    }, []);

    const handleClickOpen = async (id: any, image: any) => {
        setImage(image);
        const response = await Api.get(`/comments/${id}`);
        console.log(" th respsonsss", response);

        const sortedComments = response.data.sort((a: any, b: any) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB.getTime() - dateA.getTime();
        });
        setCurrentPost(id);
        setComments(sortedComments);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddComment = async () => {
        console.log(" commingnngngngngnggnnggnngngn");
        const response = await Api.post("/comments", { text: newComment, userId: currentUser.id, postId: currentPost });

        const sortedComments = response.data.sort((a: any, b: any) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB.getTime() - dateA.getTime();
        });

        setComments(sortedComments);
        setNewComment('');
    };

    const handleEmojiSelect = (emoji: any) => {
        setNewComment((prevComment) => prevComment + emoji.native);
        setShowEmojiPicker(false);
    };

    const formatTime = (time: any) => {
        const now = moment();
        const commentTime = moment(time);
        const duration = moment.duration(now.diff(commentTime));

        if (duration.asSeconds() < 60) {
            return `${Math.floor(duration.asSeconds())}s ago`;
        } else if (duration.asMinutes() < 60) {
            return `${Math.floor(duration.asMinutes())}min ago`;
        } else if (duration.asHours() < 24) {
            return `${Math.floor(duration.asHours())}h ago`;
        } else if (duration.asDays() < 7) {
            return `${Math.floor(duration.asDays())}d ago`;
        } else if (duration.asWeeks() < 5) {
            return `${Math.floor(duration.asWeeks())}w ago`;
        } else if (duration.asMonths() < 12) {
            return `${Math.floor(duration.asMonths())}m ago`;
        } else {
            return `${Math.floor(duration.asYears())}y ago`;
        }
    };

    async function like(id: any) {
        try {
            const response = await Api.post('/comments/postlike', { postId: id, userId: currentUser.id });
            getPost();
        } catch (error) {
            throw error;
        }
    }

    return (
        <>
            <Nav />
            <div className="w-full flex gap-3 h-auto pt-12 absolute xl:ps-10 pe-2 xl:pe-10">
                <SideBar />
                <div className="x-full xl:w-[60%] h-auto mt-10 relative rounded-md overflow-y-auto custom-scroll" style={{ maxHeight: '100vh' }}>
                    {loading ? (
                        Array.from(new Array(3)).map((_, index) => (
                            <Box key={index} className="bg-white p-4 w-full rounded-md mb-4 shadow-md border">
                                <Box className="flex items-center mb-2 xl:mb-4">
                                    <Skeleton variant="circular" width="100%" height="56px" />
                                    <Box ml={2} flex="1">
                                        <Skeleton width="40%" height={20} />
                                        <Skeleton width="20%" height={15} />
                                    </Box>
                                </Box>
                                <Divider />
                                <Skeleton variant="rectangular" width="100%" height={20} sx={{ margin: '16px 0' }} />
                                <Skeleton variant="rectangular" width="100%" height={200} />
                                <Box className="flex items-center gap-4 mt-4">
                                    <Skeleton variant="circular" width="40px" height="40px" />
                                    <Skeleton variant="circular" width="40px" height="40px" />
                                    <Skeleton variant="circular" width="40px" height="40px" />
                                </Box>
                            </Box>
                        ))

                    ) : (
                        posts.length ? posts.map((ele: any) => (
                            <div key={ele._id} className="bg-white p-4 rounded-md mb-4 shadow-md border">
                                <div className="flex items-center mb-2 xl:mb-4">
                                    <div className="w-[60%] xl:w-[70%] flex items-center gap-4 " onClick={() => navigate(`/user/organizerProfile/${ele.organizerId._id}`)}>
                                        <div className=" w-[30%] xl:w-[9%]">
                                            <div className="w-14 h-14  rounded-full overflow-hidden">
                                                <img src={ele?.organizerId.profileImage} className="h-full w-full object-cover" alt="" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col w-full ">
                                            <h1 className="font-bold text-lg">{ele.organizerId?.name}</h1>
                                            <p className='text-gray-600'>{formatTime(ele.createdAt)}</p>
                                        </div>
                                    </div>
                                </div>
                                <Divider />
                                <p className="font-serif p-2 pt-3 pb-3">{ele?.description}</p>
                                <div className="h-[14rem] xl:h-[21rem] overflow-hidden rounded-md">
                                    <img src={ele?.postImage} className="w-full h-full object-cover" alt="" />
                                </div>
                                <div className="flex items-center gap-4 mt-4">
                                    <IconButton onClick={() => like(ele._id)}>
                                        <FavoriteIcon
                                            sx={{
                                                stroke: 'black',
                                                color: ele.likes.includes(currentUser.id as any) ? 'red' : 'white',
                                                boxShadow: '3px',
                                                width: '2rem',
                                                height: '100%'
                                            }}
                                        />
                                        <h1 className="font-bold text-lg">{ele.likes.length}</h1>
                                    </IconButton>
                                    <IconButton onClick={() => handleClickOpen(ele._id, ele.postImage)}>
                                        <CommentIcon sx={{ stroke: 'black', color: 'black', boxShadow: '3px', width: '2rem', height: '100%' }} />
                                    </IconButton>
                                    <IconButton>
                                        <ShareIcon sx={{ stroke: 'black', color: 'black', boxShadow: '3px', width: '2rem', height: '100%' }} />
                                    </IconButton>
                                </div>
                            </div>
                        )) : <div className="w-full h-[30rem] flex justify-center items-center font-bold text-4xl">No Post Available</div>
                    )}
                </div>
                <div className="w-[20%] pt-10 hidden xl:block">
                    <div className="w-full bg-white rounded-md border-2 shadow-sm p-2">
                        <h1 className="font-bold">Suggestions</h1>
                    </div>
                    <div className="w-full bg-white mt-3 p-3 rounded-md border-2 shadow-md">
                        <div className="rounded-md w-full h-[6rem] flex justify-center">
                            <img src={bg} className="w-full h-full object-cover rounded-md" alt="" />
                        </div>
                        <div className="p-2 w-full">
                            <h1 className="font-bold">Random</h1>
                        </div>
                        <div className="w-full p-2 h-[5rem]">
                            <p className="h-full text-sm break-words overflow-hidden">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates magnam reprehenderit delectus repudiandae, necessitatibus voluptate, voluptatum reiciendis soluta libero illo molestias nemo culpa amet voluptatibus fuga a impedit dolores quasi.
                            </p>
                        </div>
                        <div className="w-full p-2 flex justify-center">
                            <button className="w-8/12 h-[2rem] text-sm rounded-2xl text-white bg-violet-600">
                                More...
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comment Modal */}
            <Dialog open={open} onClose={handleClose} maxWidth="lg" className='bg-blue-100 m-0  w-full h-full ' >
                <DialogContent className='w-full h-full  flex items-center'>
                    <div style={{ flex: 1 }} className='hidden xl:block'>
                        <img src={currentImage} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }} alt="Post" />
                    </div>
                    <div style={{ flex: 1 }} className='w-full '>
                        <DialogTitle>
                            Comments
                            <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent dividers sx={{ maxHeight: '600px' }} className='overflow-y-auto custom-scroll'>
                            <List className={`${comments.length > 0 ? 'h-[400px] max-[auto]:' : 'h-[400px] '}`}>
                                {comments.length > 0 ? comments.map((comment: any, index: any) => (
                                    <ListItem key={index} alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt={comment.user.name} src={comment.user.profileImage} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Box component="span" display="flex" alignItems="center">
                                                    <Typography variant="body1" color="textPrimary" component="span" fontWeight="bold" sx={{ marginRight: '8px' }}>
                                                        {comment.user.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="span">
                                                        {comment.text}
                                                    </Typography>
                                                </Box>
                                            }
                                            secondary={
                                                <Typography variant="body2" color="textSecondary" component="span" sx={{ fontSize: 'smaller' }}>
                                                    {formatTime(comment.createdAt)}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                )) : (
                                    <ListItem className='h-[800px] w-full '>
                                        <div className="w-full h-full  flex">
                                            <div className="w-full h-[50%] object-contain ">
                                                <img src={nocomment} className='w-full h-full ' alt="No comment" />
                                            </div>
                                        </div>
                                    </ListItem>
                                )}
                            </List>

                        </DialogContent>
                        <Box sx={{ width: "100%", padding: '2%', display: 'flex', alignItems: 'center', position: 'relative' }}>
                            <TextField
                                variant="outlined"
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                margin="dense"
                                sx={{
                                    borderRadius: '30px',
                                    width: '80%',
                                    border: '1px solid',
                                    height: '100%', // Adjust the height as desired
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '30px',
                                        '& fieldset': {
                                            border: 'none',
                                        },
                                    },
                                }}
                            />
                            <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                                😊
                            </IconButton>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <DialogActions>
                                    <Button onClick={handleAddComment} color="primary">Post</Button>
                                </DialogActions>
                            </Box>
                        </Box>
                        {showEmojiPicker && (
                            <div style={{ position: 'absolute', bottom: '80px', right: '20px', transform: 'translateY(-30px)' }}>
                                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
