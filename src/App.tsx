
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './componant/Nav'
// import Home from './page/Home'
import Signup from './page/users/UserSignup'
import Login from './page/users/UserLogin'
import OrganizerRegistration from './page/organizer/OrganizerSignup'
import OtpForm from './page/users/Otp'

function App() {


  return (
    <>
        <BrowserRouter>

       <Nav></Nav>
       {/* <Home></Home> */}
         <Routes>
         <Route path='/signup' element={<Signup/>} />
       {/* <OrganizerRegistration></OrganizerRegistration> */}
       {/* <Login/> */}
       <Route path='/otp' element={<OtpForm/>} ></Route>
         </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
