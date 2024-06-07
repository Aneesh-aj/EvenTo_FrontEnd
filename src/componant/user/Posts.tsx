import Nav from "../common/Nav";
import { SideBar } from "../common/SideBar";
import bg from "../../assets/FE.jpg";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllPost } from "../../api/user";
import image from "../../assets/9318688.jpg"
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";

export const Posts = () => {

    const [posts, setPosts] = useState([])
    const [liked, setLiked] = useState(true)
    const navigate = useNavigate()
    async function getPost() {
        const allposts = await getAllPost()
        console.log(" all posts ----------------", allposts)
        setPosts(allposts.posts)
    }

    useEffect(() => {
        getPost()
    }, [])

    return (
        <>
            <Nav />
            <div className="w-full flex gap-3 h-auto pt-12 ps-10 pe-10">
                <SideBar />
                <div className="w-[60%] h-auto bg-white mt-10 ps-6 pt-3 pe-6 rounded-md border-2 overflow-y-auto " style={{ maxHeight: '100vh' }}>

                    {
                        posts.length ? posts.map((ele: any) => {
                            return (
                                <>

                                    <div className="w-full h-auto p-4 flex flex-col gap-4">
                                        <div className="w-full h-14 flex items-center ">
                                            <div className="w-[50%] h-full flex items-center gap-4" onClick={()=>navigate(`/user/organizerProfile/${ele.organizerId._id}`)}>
                                                <div className="w-14 h-14 bg-yellow-300 rounded-full">
                                                    <img src={ele?.organizerId.profileImage} className="h-full w-full rounded-full" alt="" />
                                                </div>
                                                <h1 className="font-bold text-lg">{ele.organizerId?.name}</h1>
                                            </div>
                                            <div className="w-[50%] h-full flex gap-3 justify-end ">

                                            </div>
                                        </div>
                                        <div className="w-full p-2">
                                            <p className="font-serif pe-8">{ele?.description}</p>
                                        </div>
                                        <div className="w-full h-[21rem] bg-blue-100">
                                            <img src={ele?.postImage} className="w-full h-full rounded-md" alt="" />
                                        </div>
                                        <div className="w-full h-10 flex gap-4">
                                            <FavoriteIcon sx={{ stroke: 'black', color: `${liked ? 'red' : 'white'}`, boxShadow: '3px', width: '2rem', height: '100%' }} />
                                            {/* <CommentIcon  sx={{stroke:'black',color:"black",boxShadow:'3px',width:'2rem',height:'100%'}} /> */}
                                            <ShareIcon sx={{ stroke: 'black', color: "black", boxShadow: '3px', width: '2rem', height: '100%' }} />
                                        </div>
                                    </div>
                                    <Divider variant="middle" />
                                </>
                            )
                        }) :
                            (
                                <div className="w-full h-[400px] flex justify-center">
                                    <div className="w-[50%] h-[100%]">
                                        <img src={image} className="w-full h-full" alt="" />
                                    </div>
                                </div>
                            )
                    }

                </div>
                <div className="w-[20%] pt-10">
                    <div className="w-full bg-white rounded-md border-2 shadow-sm p-2">
                        <h1 className="font-bold">suggetions</h1>
                    </div>
                    <div className="w-full bg-white mt-3 p-3 rounded-md border-2 shadow-md">
                        <div className="rounded-md w-full h-[6rem] flex justify-center">
                            <img src={bg} className="w-full h-full object-cover rounded-md" alt="" />
                        </div>
                        <div className="p-2 w-full">
                            <h1 className="font-bold">random</h1>
                        </div>
                        <div className="w-full p-2 h-[5rem]">
                            <p className="h-full text-sm break-words overflow-hidden">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates magnam reprehenderit delectus repudiandae, necessitatibus voluptate, voluptatum reiciendis soluta libero illo molestias nemo culpa amet voluptatibus fuga a impedit dolores quasi.
                            </p>
                        </div>
                        <div className="w-full p-2 flex justify-center">
                            <button
                                // onClick={()=>navigate(`/organizer/eventPostDetails/${ele._id}`)}
                                className="w-8/12 h-[2rem] text-sm rounded-2xl text-white bg-violet-600"
                            >
                                more...
                            </button>
                        </div>
                    </div>
                    <div className="w-full bg-white mt-3 p-3 rounded-md border-2 shadow-md">
                        <div className="rounded-md w-full h-[6rem] flex justify-center">
                            <img src={bg} className="w-full h-full object-cover rounded-md" alt="" />
                        </div>
                        <div className="p-2 w-full">
                            <h1 className="font-bold">random</h1>
                        </div>
                        <div className="w-full p-2 h-[5rem]">
                            <p className="h-full text-sm break-words overflow-hidden">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates magnam reprehenderit delectus repudiandae, necessitatibus voluptate, voluptatum reiciendis soluta libero illo molestias nemo culpa amet voluptatibus fuga a impedit dolores quasi.
                            </p>
                        </div>
                        <div className="w-full p-2 flex justify-center">
                            <button
                                // onClick={()=>navigate(`/organizer/eventPostDetails/${ele._id}`)}
                                className="w-8/12 h-[2rem] text-sm rounded-2xl text-white bg-violet-600"
                            >
                                more...
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
