import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { validateEmail, validatePassword } from '../../utils/validation';
import { login } from '../../api/user';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { currentUser } from '../../@types/allTypes';
import  '../../index.css'
import image from '../../assets/business-management-illustration-set-characters-planning-work-tasks-managing-inbox-emails_566886-5785.jpg'


const Login: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    useSelector((state: currentUser) => state)
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm()
    const handleFormSubmit = async (data: any) => {
        setLoading(true)
        const user = {
            email: data.email || "",
            password: data.password || ""
        }
        const result = await login(user)
        setLoading(false)
        localStorage.setItem("accessToken",result.accessToken)
        localStorage.setItem("refreshToken",result.refreshToken)
        localStorage.setItem("role",result.role)
        if (result.user) {
            toast.success(result.message)
            dispatch(setUser({
                role: result.role,
                name: result.user.name,
                email: result.user.email,
                id: result.user._id,
                blocked:result.user.blocked 
            }))
            navigate("/")
        } else {
            toast.error(result.response.data.message)
        }
    }

    return (
        <div className='h-screen overflow-y-scroll bg-white p-5 w-full xl:flex justify-center custom-scrollbar'>
            <div className='xl:w-7/12 hidden xl:visible xl:flex   justify-center items-center'>
                <div className="bg-red xl:w-full h-[600px] flex object-contain">
                    <img src={image} alt="" className='xl:w-full h-full' />
                </div>
            </div>
            <div className='xl:w-5/12 '>
                <div className="w-full m-2 xl:w-10/12 mx-auto  bg-white p-8 rounded-xl custom-box-shadow ">
                    <Toaster position="top-right"
                        reverseOrder={false} />
                    <div className='flex  justify-center '>
                        <h1 className="text-4xl font-medium pb-4">Login</h1>
                    </div>
                    <div className='flex  justify-center '>
                        <p className="text-slate-500">Hi, Welcome back 👋</p>
                    </div>
                    {/* <div className="my-5">
                        <button className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" /> <span>Login with Google</span>
                        </button>
                    </div> */}

                    <form action="" onSubmit={handleSubmit(handleFormSubmit)} className="my-10">
                        <div className="flex flex-col space-y-5">
                            <label htmlFor="email">
                                <p className="font-medium text-slate-700 pb-2">Email address</p>
                                <InputText keyfilter="email" id="email" {...register("email", { required: "Email is required ", validate: { validEmail: (value) => validateEmail(value) } })} className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" />
                            </label>
                            <span className="text-xs text-red-700">
                                {typeof errors?.email?.message === 'string' && errors?.email?.message}
                            </span>
                            <label htmlFor="password">
                                <p className="font-medium text-slate-700 pb-2">Password</p>
                                <input
                                    id="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        validate: {
                                            requireSixCharacters: (val: string) => validatePassword(val),
                                            containAtleastOneDigit: (val: string) => validatePassword(val),
                                            containAtleastOneAlphabet: (val: string) => validatePassword(val),
                                            containAtleastOneSpecialCharacter: (val: string) =>
                                                validatePassword(val),
                                            noSpace: (val: string) => validatePassword(val),
                                        },
                                    })}
                                    type="password"
                                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                    placeholder="Enter your password"
                                />
                            </label>

                            <span className="text-xs text-red-700">
                                {typeof errors?.password?.message === 'string' && errors?.password?.message}
                            </span>

                            <div className="flex flex-row justify-between">
                                <div>
                                </div>
                                <div>
                                    <a href="#" className="font-medium text-indigo-600">Forgot Password?</a>
                                </div>
                            </div>
                            <button type='submit' disabled={loading} className={loading ? "w-full py-3 font-medium text-white bg-indigo-400 hover:bg-indigo-300 rounded-lg border-indigo-300 hover:shadow inline-flex space-x-2 items-center justify-center" : "w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                <span>{loading ? 'Loading' : 'Login'}</span>
                            </button>

                            <p className="text-center">Not registered yet? <a href="#" className="text-indigo-600 font-medium inline-flex space-x-1 items-center">
                                <Link to='/auth/userSignup'>
                                    <span>Signup now </span>
                                </Link>
                                <span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg></span></a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login