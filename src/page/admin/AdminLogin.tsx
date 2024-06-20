import { useState } from 'react';
import React from 'react';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../@types/allTypes';
import { setUser } from '../../redux/userSlice';
import { adminLogin } from '../../api/admin';
import toast, { Toaster } from 'react-hot-toast';
const AdminLogin: React.FC = () => {


  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useSelector((state:currentUser)=>state)

  async function handler(e: React.FormEvent) {

    try {
      console.log("entring")
      e.preventDefault()
      const data = await adminLogin(email as string,password as string)

      console.log(data, "from the frontend !!!fffffffffffffffsssssss",data);
          localStorage.setItem("accessToken",data.accessToken)
        localStorage.setItem("refreshToken",data.refreshToken)
        localStorage.setItem("role",data.role)
       if(data.success){
         if (data) {
           toast.success(data.message)
           setTimeout( async()=>{
             dispatch(setUser({
               role:data?.admin.role,
               name:"admin",
               email:data?.admin.email,
               id:data?.admin._id
              }))
             navigate("/admin/Requests")
           },2000)
         }
       }else{
          toast.error(data.message)
       }
    } catch (error) {
      console.log("ERror: ", error);

    }
  }


  return (
    <div className='h-screen overflow-y-scroll bg-[#f0f2f0] w-full flex justify-center custom-scrollbar'>

      <div className=" w-8/12 xl:w-5/12 mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <div className='flex  justify-center '>
          <h1 className="text-4xl font-medium pb-4">Login</h1>
        </div>
        <div className='flex  justify-center '>
          <p className="text-slate-500">Hi, Welcome back 👋</p>
        </div>
        <div className="my-5">
         
        </div>

        <form action="" onSubmit={handler} className="my-10">
          <Toaster></Toaster>
          <div className="flex flex-col space-y-5">
            <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2">Email address</p>
              <InputText keyfilter="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" />
            </label>

            <label htmlFor="password">
              <p className="font-medium text-slate-700 pb-2">Password</p>
              <input id="password" name="password" onChange={(e) => setPassword(e.target.value)} type="password" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your password" />
            </label>

            <div className="flex flex-row justify-between">
              <div>
              </div>
              <div>
                <a href="#" className="font-medium text-indigo-600">Forgot Password?</a>
              </div>
            </div>
            <button type='submit' className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Login</span>
            </button>


          </div>
        </form>
      </div>
    </div>
  );
};


export default AdminLogin;
