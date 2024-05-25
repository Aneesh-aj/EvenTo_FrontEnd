import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { currentUser } from "../@types/allTypes";
import Nav from "../componant/common/Nav";
import asset3 from "../assets/decorated-banquet-hall-with-flowers.jpg"
import asset2 from "../assets/luxurious-dinner-hall-with-large-crystal-chandelier.jpg"
import asset from "../assets/FE.jpg"
import banner1 from "../assets/weddomg.jpg"
import banner2 from "../assets/pexels-teddy-yang-2263436.jpg"
import banner3 from "../assets/FE.jpg"
import userBanner from "../assets/360_F_120282530_gMCruc8XX2mwf5YtODLV2O1TGHzu4CAb.jpg"
import organizerBanner from "../assets/header-image.jpg"
// import { clearUser } from "../utils/clearUser";

const Home: React.FC = () => {
  const currentUser = useSelector((state: currentUser) => state)
  // const dispatch = useDispatch()
  console.log(" redux  ", currentUser)
  // clearUser(dispatch)


  return (
    <>
     <Nav/>
      <section className="hero_section pb-[50px] bg-white w-full  pt-[60px]">
        <div className="containe">
          <div className="flex flex-col lg:flex-row  m-[3%] justify-center">
            <div className="flex items-center  sm:w-full  md:mt-[-90px] justify-center ">
              <div className="lg:w-[570px]  sm:w-full">
                <h1 className="text-[26px] pb-4 pt-4 xl:text-[46px]  leading-[46px] text-slate-900 font-[800] md:leading-[70px]">
                  We help you live your best life.
                </h1>
                <p className=" pb-6">

                  Our platform connects you with Event managment professionals,
                  ensuring that you receive the latest updates of Events standard .
                  Your well-being is our priority, and we're here to support you on your journey to optimal health

                </p>
                {/* <Link to='/doctors'><button className="btn">Request an Appointment</button></Link> */}
                
              </div>
            </div>

            <div className="flex w-full gap-x-4  ">
              <div className="flex h-80  w-full gap-1 object-contain md:ps-12  content-center">
                <img className="h-[95%] w-[60%] md:w-[40%]  rounded-md " src={asset} alt="" />
                <div className="w-full gap-y-1 flex flex-col">
                  <img className="h-[48%] sm:w-[50%] md:[60%] mt-3  rounded-md" src={asset2} alt="" />

                  <img className=" h-[40%] w-[70%] md:w-[40%]  rounded-md" src={asset3} height={100} alt="" />

                </div>
              </div>

            </div>

          </div>

          <div className="doctor_Card w-100 flex flex-col items-center justify-center">
            <h1 className="font-semibold text-black text-xl">We Providing the best medical services.</h1>

            <div className="flex w-full  p-2 xl:flex-wrap justify-center items-center gap-1 xl:gap-3  my-12">
              <div className="card flex justify-center items-end pb-5 w-full sm:w-30 md:w-96 lg:w-44 xl:w-48 h-48 xl:h-56 bg-slate-500 rounded-md" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${banner1})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
                <h1 className="text-white font-semibold text-sm md:text-base ">Wedding</h1>
              </div>
              <div className="card flex justify-center items-end pb-5 w-full sm:w-30 md:w-44 lg:w-44 xl:w-48 h-56 xl:h-64 bg-slate-500 rounded-md" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${banner2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <h1 className="text-white font-semibold  text-[13px] md:text-base ">public Fest</h1>
              </div>
              <div
                className="card flex justify-center items-end pb-5 w-full sm:w-30 md:w-44 lg:w-44 xl:w-48 h-48 xl:h-56 rounded-md"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${banner3})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <h1 className="text-white font-semibold  text-sm md:text-base">Private Party</h1>
              </div>
            </div>


            <div className="text-center w-full sm:w-1/2 p-2 ">
              Our dedicated team strives to ensure a superior and personalized healthcare experience,
              leveraging the latest technology to facilitate virtual consultations with skilled doctors.
              With a steadfast focus on patient well-being, we aim to redefine the landscape of healthcare delivery
              by combining expertise, convenience, and innovation. Trust us for your medical needs, and experience
              the future of healthcare, where quality meets convenience.
            </div>


            <div className="flex flex-col items-center sm:flex-row  md:flex-row  justify-center mt-9 gap-x-10 w-full">

              <div className="w-[80%]  sm:w-1/3 patient_bg bg-slate-600 rounded-md h-52 flex justify-center  items-end"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${userBanner})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <Link to='/auth/userSignup'><button className="bg-blue-500 rounded-full p-1 px-2 font-semibold mb-2 text-white">Join as user</button></Link>
              </div>

              <div className="w-[80%] mt-1 sm:w-1/3 doctor_bg bg-slate-600 rounded-md h-52 flex justify-center items-end"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${organizerBanner})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >

                <Link to='/auth/organizerRegister'>
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