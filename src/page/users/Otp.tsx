import React, { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'
import { otpVerify } from '../../api/user';
import { useNavigate } from 'react-router-dom';


const OtpForm: React.FC = () => {
    const navigate = useNavigate()
    
    const [loading,setLoading] = useState <boolean>(false)
    const formRef = useRef<HTMLFormElement>(null);
    const inputsRef = useRef<Array<React.RefObject<HTMLInputElement>>>(Array.from({ length: 4 }, () => useRef<HTMLInputElement>(null)));

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (!/^[0-9]{1}$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && !e.metaKey) {
            e.preventDefault();
        }

        if (e.key === 'Delete' || e.key === 'Backspace') {
            if (index > 0 && inputsRef.current[index - 1].current) {
                inputsRef?.current[index - 1]?.current?.focus();
            }
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.target.value) {
            if (index < inputsRef.current.length - 1 && inputsRef.current[index + 1].current) {
                inputsRef?.current[index + 1]?.current?.focus();
            }
        }
    };

    const handleFocus = (index: number) => {
        if (inputsRef.current && inputsRef.current[index].current) {
            inputsRef.current[index].current?.select();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text');
        if (!/^[0-9]{4}$/.test(text)) {
            return;
        }
        const digits = text.split('');
        digits.forEach((digit, index) => {
            if (inputsRef.current && inputsRef.current[index]?.current) {
                inputsRef.current && (inputsRef.current[index].current!.value = digit);
            }

        });
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
         setLoading(true)
        let otp = inputsRef.current.map((input) => input.current?.value).join('');
        if(!otp){
            toast.error("enter otp")
            setLoading(false)
            return
        }
        console.log(" the otp", otp)
        
        const response = await otpVerify(otp )
        setLoading(false)
         if(response.email){
            toast.success(response.message)
            navigate("/login")
         }if(response.response.data.status ===400){
            toast.error(response.response.data.message)
         }else{
            toast.error(response.response.data.message)

        }
     
    };

    return (
        <div className="relative  font-inter antialiased">
         
            <main className="relative min-h-screen flex flex-col justify-center bg-slate-100 overflow-hidden">
                <div className="w-ful max-w-6xl mx-auto px-4 md:px-6 py-24">
                    <div className="flex justify-center">
               
                        <div className="max-w-4xl mx-auto max-h-svh text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
                        <Toaster position="top-right"
  reverseOrder={false} />
                            <header className="mb-8">
                                <h1 className="text-2xl font-bold mb-1">Email OTP Verification</h1>
                                <p className="text-[15px] text-slate-500">Enter the 4-digit verification code that was sent to your Email.</p>
                            </header>
                            <form ref={formRef} onSubmit={handleSubmit}>
                                <div className="flex items-center justify-center gap-3">
                                    {inputsRef.current.map((inputRef, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            className="w-14 h-14 border border-black  text-center text-2xl font-extrabold text-slate-900 bg-blue-100  hover:border-slate-300 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                            pattern="\d*"
                                            maxLength={1}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            onInput={(e:any) => handleInput(e, index)}
                                            onFocus={() => handleFocus(index)}
                                            onPaste={handlePaste}
                                            ref={inputRef}
                                        />
                                    ))}
                                </div>
                                <div className="max-w-[260px] mx-auto mt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                                        onClick={(e:any) => {
                                            handleSubmit(e)
                                        }}
                                    >
                                        Verify Account
                                    </button>

                                </div>
                            </form>
                            <div className="text-sm text-slate-500 mt-4">Didn't receive code? <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0">Resend</a></div>
                        </div>
                    </div>
                </div>
            </main>

            
        </div>
    );
};

export default OtpForm;
