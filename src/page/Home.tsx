import React from "react";
import { Link } from "react-router-dom";

const Home : React.FC=()=>{

  
  

    return(
      <>
      
        <section className="hero_section pb-[50px] bg-white  pt-[60px]">

              <div className="container">

                <div className="flex flex-col lg:flex-row  m-[3%] justify-">
                  <div className="flex items-center w-[180%]  md:mt-[-90px] ">
                    <div className="lg:w-[570px]">
                      <h1 className="text-[36px] leading-[46px] text-slate-900 font-[800] md:text-[60px] md:leading-[70px]">
                        We help you live your best life.
                      </h1>
                      <p className="text__para">
                        Our platform connects you with renowned healthcare professionals,
                        ensuring that you receive the highest standard of medical guidance.
                        Your well-being is our priority, and we're here to support you on your journey to optimal health

                      </p>
                      <Link to='/doctors'><button className="btn">Request an Appointment</button></Link>
                    </div>
                  </div>

                  <div className="flex w-full gap-x-4 justify-evenly">
                    <div className="flex h-80  w-ful gap-1">
                    <img className="h-[95%] w-[50%] rounded-md" src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" alt="" />
                      <div className="w-full gap-y-1 flex flex-col">
                      <img className="h-[48%] w-[60%] mt-3  rounded-md" src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" alt="" />

                      <img className=" h-[40%] w-[50%]  rounded-md" src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" height={100} alt="" />

                      </div>
                    </div>
                 
                  </div>

                </div>

                <div className="doctor_Card w-100 flex flex-col items-center justify-center">
                  <h1 className="font-semibold text-black text-xl">We Providing the best medical services.</h1>

                  <div className="flex flex-wrap justify-center items-center gap-3 my-12">
                    <div className="card flex justify-center items-end pb-5 w-40 sm:w-40 md:w-44 lg:w-44 xl:w-48 h-56 bg-slate-500 rounded-md" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
                      <h1 className="text-white font-semibold text-sm md:text-base ">Wedding</h1>
                    </div>
                    <div className="card flex justify-center items-end pb-5 w-40 sm:w-40 md:w-44 lg:w-44 xl:w-48 h-64 bg-slate-500 rounded-md" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <h1 className="text-white font-semibold  text-[13px] md:text-base ">public Fest</h1>
                    </div>
                    <div
                      className="card flex justify-center items-end pb-5 w-40 sm:w-40 md:w-44 lg:w-44 xl:w-48 h-56 rounded-md"
                      style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      <h1 className="text-white font-semibold  text-sm md:text-base">Private Party</h1>
                    </div>
                  </div>


                  <div className="text-center w-full sm:w-1/2 ">
                    Our dedicated team strives to ensure a superior and personalized healthcare experience,
                    leveraging the latest technology to facilitate virtual consultations with skilled doctors.
                    With a steadfast focus on patient well-being, we aim to redefine the landscape of healthcare delivery
                    by combining expertise, convenience, and innovation. Trust us for your medical needs, and experience
                    the future of healthcare, where quality meets convenience.
                  </div>


                  <div className="flex flex-col items-center sm:flex-row  md:flex-row  justify-center mt-9 gap-x-10 w-full">

                    <div className="w-[80%]  sm:w-1/3 patient_bg bg-slate-600 rounded-md h-52 flex justify-center  items-end"
                         style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                    >
                     <Link to='/userSignup'><button className="bg-blue-500 rounded-full p-1 px-2 font-semibold mb-2 text-white">Join as user</button></Link>
                    </div>

                    <div className="w-[80%] mt-1 sm:w-1/3 doctor_bg bg-slate-600 rounded-md h-52 flex justify-center items-end"
                          style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                    >
                  
                      <Link to='/organizerRegister'>
                        <button className="bg-blue-500 rounded-full p-1 px-2 font-semibold mb-2 text-white">Join as Organizer</button>
                      </Link>
                    </div>
                  </div>
                </div>

              </div>

            </section>
      </>
    )
}

export default Home