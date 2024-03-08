import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { validateEmail, validatePassword, validateUsername } from '../../utils/validation';
import { signup } from '../../api/user';

type User = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const Signup: React.FC = () => {

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const check = async(user:User) => {
    let res =  await signup(user).then((res)=>console.log("successsss",res.message))
    console.log(res)
  }

  const handleFormSubmit = async (data : any) => {
    try {
      const user = {
        name: data.name || '',
        email: data.email || '',
        password: data.password || '',
        confirm_password: data.confirm_password || '',
      };
      check(user)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-auto overflow-y-scroll bg-[#f0f2f0] w-full flex justify-center custom-scrollbar">
      <div className="w-5/12 mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <div className="flex justify-center ">
          <h1 className="text-4xl font-medium pb-4">Signup</h1>
        </div>

        <div className="my-5">
          <button className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" />{' '}
            <span>Login with Google</span>
          </button>
        </div>

        <form className="my-10" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col space-y-5">

            <label htmlFor="name">
              <p className="font-medium text-slate-700 pb-2">Name</p>
              <input
                id="name"
                type="text"
                {...register('name', { validate: { validUsername: (value) => validateUsername(value) } })}
                placeholder="Enter your name"
                className={`w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow ${errors?.name?.message}`}
              />
              <span className="text-xs text-red-700">
                {typeof errors?.name?.message === 'string' && errors?.name?.message}
              </span>
            </label>

            <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2">Email address</p>
              <InputText
                id="email"
                keyfilter="email"
                {...register('email', {
                  required: 'Email is a required field',
                  validate: { validEmail: (value) => validateEmail(value) },
                })}
                placeholder="Enter email address"
                className={`w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow ${errors?.email?.message}`}

              />
              <span className="text-xs text-red-700">
                {typeof errors?.email?.message === 'string' && errors?.email?.message}
              </span>
            </label>

            <label htmlFor="password">
              <p className="font-medium text-slate-700 pb-2">Password</p>
              <input
                id="password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  validate: { validatePassword: (value) => validatePassword(value) },
                })}
                className={`w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow ${errors?.password?.message}`}

                placeholder="Enter your password"
              />
              <span className="text-xs text-red-700">
                {typeof errors?.password?.message === 'string' && errors?.password?.message}
              </span>
            </label>

            <label htmlFor="Cpassword">
              <p className="font-medium text-slate-700 pb-2">Confirm Password</p>
              <input
                id="Cpassword"
                type="password"
                {...register('confirm_password', {
                  required: 'Confirm password is required',
                  validate: (val) => {
                    if (val !== watch('password')) return 'Confirmation password should match password.';
                  },
                })}
                className={`w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow ${errors?.confirm_password?.message}`}

                placeholder="Enter your password"
              />
              <span className="text-xs text-red-700">
                {typeof errors?.confirm_password?.message === 'string' && errors?.confirm_password?.message}
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span>signup</span>
            </button>

            <p className="text-center">
              Already a user?{' '}
              <Link to="/userLogin" className="text-indigo-600 font-medium inline-flex space-x-1 items-center">
                <span>Login </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </Link>
            </p>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
