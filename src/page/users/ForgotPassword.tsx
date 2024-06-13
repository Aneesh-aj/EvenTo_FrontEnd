import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { validateEmail, validatePassword } from '../../utils/validation';
import {  verifyOtp } from '../../api/organizer';
import toast, { Toaster } from 'react-hot-toast';
import '../../index.css';
import image from '../../assets/business-management-illustration-set-characters-planning-work-tasks-managing-inbox-emails_566886-5785.jpg';
import { otpSenting, updatePassword } from '../../api/user';


const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [emailPart, setEmailPart] = useState<boolean>(true);
    const [otpPart, setOtpPart] = useState<boolean>(false);
    const [passwordPart, setPasswordPart] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();
  

    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const handleEmailSubmit = async (data: any) => {
        setLoading(true);
        setEmail(data.email);
        try {
           const otpcreation =   await otpSenting(data.email, "user");
           if(otpcreation.success){

               toast.success("OTP sent successfully!");
               setEmailPart(false);
               setOtpPart(true);
           }else{
              toast.error("Error while creating otp")
           }
        } catch (error) {
            console.error("Failed to send OTP:", error);
            toast.error("Failed to send OTP. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (data: any) => {
        setLoading(true);
        try {
          const resposne =   await verifyOtp(email, data.otp);
          if(resposne.success){
            toast.success("OTP verified successfully!");
            setOtpPart(false);
            setPasswordPart(true);
          }else{
             console.log("  -----",resposne)
             if(resposne.message){
                toast.error(resposne.message)
             }else{
                toast.error(resposne.response.data.message)
             }
          }
           
        } catch (error) {
            console.error("Failed to verify OTP:", error);
            toast.error("Failed to verify OTP. Please check the OTP and try again.");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (data: any) => {
        setLoading(true);
        const user = {
            email: email,
            password: data.password,
            confirmPassword: data.confirmPassword
        };
        try {
            const response = await updatePassword(user);
            if(response.success){
                toast.success("Password updated successfully!");
                navigate('/auth/userLogin');
            }else{
                toast.error("error while updating password")
            }
            
        } catch (error) {
            console.error("Failed to update password:", error);
            toast.error("Failed to update password. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='h-screen overflow-y-scroll bg-white p-5 w-full xl:flex justify-center custom-scrollbar'>
            <div className='xl:w-7/12 hidden xl:visible xl:flex justify-center items-center'>
                <div className="bg-red xl:w-full h-[600px] flex object-contain">
                    <img src={image} alt="Illustration" className='xl:w-full h-full' />
                </div>
            </div>
            <div className='xl:w-5/12'>
                <div className="w-full m-2 xl:w-10/12 mx-auto bg-white p-8 rounded-xl custom-box-shadow">
                    <Toaster position="top-right" reverseOrder={false} />
                    <div className='flex justify-center'>
                        <h1 className="text-4xl font-medium pb-4">Forgot Password</h1>
                    </div>

                    <form onSubmit={handleSubmit(emailPart ? handleEmailSubmit : otpPart ? handleOtpSubmit : handlePasswordSubmit)} className="my-10">
                        {emailPart && (
                            <div className="flex flex-col space-y-5">
                                <label htmlFor="email">
                                    <p className="font-medium text-slate-700 pb-2">Email address</p>
                                    <InputText
                                        keyfilter="email"
                                        id="email"
                                        {...register("email", { required: "Email is required", validate: validateEmail })}
                                        className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                        placeholder="Enter email address"
                                        aria-invalid={errors.email ? "true" : "false"}
                                        aria-describedby="emailError"
                                    />
                                </label>
                                {errors.email?.message && (
                                    <span id="emailError" className="text-xs text-red-700">
                                        {String(errors.email.message)}
                                    </span>
                                )}
                                <button
                                    type='submit'
                                    disabled={loading}
                                    className={`w-full py-3 font-medium text-white rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center ${loading ? "bg-indigo-400 hover:bg-indigo-300 border-indigo-300" : "bg-indigo-600 hover:bg-indigo-500 border-indigo-500"}`}
                                >
                                    {loading ? 'Loading' : 'Verify'}
                                </button>
                            </div>
                        )}
                        {otpPart && (
                            <div className="flex flex-col space-y-5">
                                <label htmlFor="otp">
                                    <p className="font-medium text-slate-700 pb-2">OTP</p>
                                    <InputText
                                        id="otp"
                                        {...register("otp", { required: "OTP is required" })}
                                        className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                        placeholder="Enter OTP"
                                        type="number"
                                        aria-invalid={errors.otp ? "true" : "false"}
                                        aria-describedby="otpError"
                                    />
                                </label>
                                {errors.otp?.message && (
                                    <span id="otpError" className="text-xs text-red-700">
                                        {String(errors.otp.message)}
                                    </span>
                                )}
                                <button
                                    type='submit'
                                    disabled={loading}
                                    className={`w-full py-3 font-medium text-white rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center ${loading ? "bg-indigo-400 hover:bg-indigo-300 border-indigo-300" : "bg-indigo-600 hover:bg-indigo-500 border-indigo-500"}`}
                                >
                                    {loading ? 'Loading' : 'Verify OTP'}
                                </button>
                            </div>
                        )}
                        {passwordPart && (
                            <div className="flex flex-col space-y-5">
                                <label htmlFor="password">
                                    <p className="font-medium text-slate-700 pb-2">New Password</p>
                                    <InputText
                                        id="password"
                                        type="password"
                                        {...register("password", { required: "Password is required", validate: validatePassword })}
                                        className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                        placeholder="Enter new password"
                                        aria-invalid={errors.password ? "true" : "false"}
                                        aria-describedby="passwordError"
                                    />
                                </label>
                                {errors.password?.message && (
                                    <span id="passwordError" className="text-xs text-red-700">
                                        {String(errors.password.message)}
                                    </span>
                                )}
                                <label htmlFor="confirmPassword">
                                    <p className="font-medium text-slate-700 pb-2">Confirm Password</p>
                                    <InputText
                                        id="confirmPassword"
                                        type="password"
                                        {...register("confirmPassword", {
                                            required: "Confirm password is required",
                                            validate: (value) => value === watch("password") || "Passwords do not match"
                                        })}
                                        className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                        placeholder="Confirm new password"
                                        aria-invalid={errors.confirmPassword ? "true" : "false"}
                                        aria-describedby="confirmPasswordError"
                                    />
                                </label>
                                {errors.confirmPassword?.message && (
                                    <span id="confirmPasswordError" className="text-xs text-red-700">
                                        {String(errors.confirmPassword.message)}
                                    </span>
                                )}
                                <button
                                    type='submit'
                                    disabled={loading}
                                    className={`w-full py-3 font-medium text-white rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center ${loading ? "bg-indigo-400 hover:bg-indigo-300 border-indigo-300" : "bg-indigo-600 hover:bg-indigo-500 border-indigo-500"}`}
                                >
                                    {loading ? 'Loading' : 'Update Password'}
                                </button>
                            </div>
                        )}
                    </form>

                    <p className="text-center">Not registered yet? <Link to='/auth/userSignup' className="text-indigo-600 font-medium inline-flex space-x-1 items-center">
                        <span>Signup now</span>
                        <span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg></span>
                    </Link></p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
