import Nav from "../../componant/Nav"
import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
import LoopSharpIcon from '@mui/icons-material/LoopSharp';
import TrendingFlatTwoToneIcon from '@mui/icons-material/TrendingFlatTwoTone';
import { LatestEvent } from "../../componant/LatestEvent";
export const ProfilePage: React.FC = () => {
    return (

        <>
            <Nav />
            <div className="w-full flex flex-col xl:flex-row    justify-center h-auto  bg-gray-300-600">
                <div className="w-full  xl:w-6/12   p-2 flex flex-col mt-20   gap-2 rounded-xl">
                    <div className="w-full h-auto p-6  gap-3 flex flex-col   xl:pt-6 bg-white rounded-md  justify-center items-center   xl:justify-start  xl:items-start xl:ps-10 ">
                       <div className=" w-full flex items-center justify-center xl:justify-start gap-3 flex-col xl:flex-row">
                         <Avatar className="relative" alt="Remy Sharp" sx={{ width: 130, height: 130 }} src="/static/images/avatar/1.jpg" />
                        <h1 className="font-bold text-xl xl:text-3xl">Aneesh</h1>
                        </div>
                        <button className="w-[6rem] h-[2rem] xl:ms-5 rounded-md bg-blue-500 text-white ">change
                            <span><LoopSharpIcon sx={{ width: 18, height: 15 }} /></span>
                        </button>
                    </div>

                    <div className="w-full h-80 bg-white rounded-md  ">
                        <div className="w-full p-3 flex justify-end">
                            <button className="w-[5rem] h-[2rem] rounded-md bg-blue-500 text-white">Edit</button>
                        </div>
                        <ul className="p-6 flex flex-col gap-3">

                            <li>
                                <div className="w-full flex">
                                    <div className="w-32  ">email</div>
                                    <span>:</span>
                                    <div className="w-40  ps-2"> tuser@gmail.com</div>
                                </div>
                            </li>
                            <li>
                                <div className="w-full flex">
                                    <div className="w-32 ">age</div>
                                    <span>:</span>
                                    <div className="w-40 ps-2"> 12</div>
                                </div>
                            </li>
                            <li>
                                <div className="w-full flex">
                                    <div className="w-32 ">phone number</div>
                                    <span>:</span>
                                    <div className="w-40 ps-2"> aneesh</div>
                                </div>
                            </li>
                            <li>
                                <div className="w-full flex">
                                    <div className="w-32 ">State</div>
                                    <span>:</span>
                                    <div className="w-40 ps-2"> kerala</div>
                                </div>
                            </li>
                            <li>
                                <div className="w-full flex">
                                    <div className="w-32  ">District</div>
                                    <span>:</span>
                                    <div className="w-40 ps-2"> malappuram</div>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="xl:w-3/12 mt-0 xl:mt-20  p-2">
                     <div className="w-full mb-4 bg-white rounded-md h-[2.5rem] flex justify-center items-center">
                        latest Events 
                        <TrendingFlatTwoToneIcon/>
                     </div>
                     <LatestEvent/>
                     
                </div>
            </div>
        </>
    )
}