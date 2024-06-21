import React, { useRef, useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { otpVerify, resendOtp } from '../../api/user';
import { useNavigate, useParams } from 'react-router-dom';
import asset from "../../assets/two-factor-authentication-concept-illustration_114360-5488.avif";

const OtpForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(300); // 5 minutes timer (300 seconds)
    const [canResend, setCanResend] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);
    const inputsRef = useRef<Array<React.RefObject<HTMLInputElement>>>(Array.from({ length: 4 }, () => useRef<HTMLInputElement>(null)));
    const { email } = useParams<{ email: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer(prev => {
                if (prev > 0) {
                    return prev - 1;
                } else {
                    setCanResend(true);
                    clearInterval(countdown);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        let otp = inputsRef.current.map((input) => input.current?.value).join('');
        if (!otp) {
            toast.error("enter otp");
            setLoading(false);
            return;
        }
        console.log(" the otp", otp);

        const response = await otpVerify(otp, email as string);
        setLoading(false);
        if (response.email) {
            toast.success(response.message);
            navigate("/auth/userLogin");
        } else if (response.response.data.status === 400) {
            toast.error(response.response.data.message);
        } else {
            toast.error(response.response.data.message);
        }
    };

    const resendOtpHandler = async () => {
        console.log(email, " emailllllll");
        if (email) {
            await resendOtp(email);
            toast.success(" otp sent to your mail");
            setTimer(300); // Reset timer to 5 minutes
            setCanResend(false);
        } else {
            toast.error('invalid email address');
        }
    };

    return (
        <div className="relative font-inter antialiased" style={{ backgroundColor: 'white' }}>
            <main className="relative min-h-screen flex flex-col justify-center overflow-hidden">
                <div className="w-full flex max-w-6xl mx-auto px-4 md:px-6 py-24 gap-3">
                    <div className="object-contain h-96 w-full hidden xl:block text-center px-4 sm:px-8">
                        <img className='w-full h-full' src={asset} alt="" />
                    </div>
                    <div className="flex justify-center">
                        <div className="max-w-4xl mx-auto max-h-svh text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow-2xl">
                            <Toaster position="top-right" reverseOrder={false} />
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
                                            className="w-14 h-14 border border-black text-center text-2xl font-extrabold text-slate-900 bg-blue-100 hover:border-slate-300 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                            pattern="\d*"
                                            maxLength={1}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            onInput={(e: any) => handleInput(e, index)}
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
                                        onClick={(e: any) => {
                                            handleSubmit(e);
                                        }}
                                    >
                                        {loading ? 'Verifying...' : 'Verify Account'}
                                    </button>
                                </div>
                            </form>
                            <div className="text-sm text-slate-500 mt-4">Didn't receive code? {canResend ? (
                                <p className="font-medium text-indigo-500 hover:text-indigo-600 cursor-pointer" onClick={resendOtpHandler}>Resend</p>
                            ) : (
                                <p className="text-slate-400">Resend available in {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}</p>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OtpForm;
