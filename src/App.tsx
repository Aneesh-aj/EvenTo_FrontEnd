
import { BrowserRouter } from 'react-router-dom'
import Nav from './componant/Nav'
import Home from './page/Home'
import Signup from './page/users/UserSignup'


function App() {


  return (
    <>
        <BrowserRouter>

       <Nav></Nav>
       {/* <Home></Home> */}
       <Signup></Signup>
       </BrowserRouter>
    </>
  )
}

export default App
