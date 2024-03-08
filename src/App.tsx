
import { BrowserRouter } from 'react-router-dom'
import Nav from './componant/Nav'
// import Home from './page/Home'
import Signup from './page/users/UserSignup'
import Login from './page/users/UserLogin'
import OrganizerRegistration from './page/organizer/OrganizerSignup'

function App() {


  return (
    <>
        <BrowserRouter>

       <Nav></Nav>
       {/* <Home></Home> */}
       <Signup></Signup>
       {/* <OrganizerRegistration></OrganizerRegistration> */}
       {/* <Login/> */}
       </BrowserRouter>
    </>
  )
}

export default App
