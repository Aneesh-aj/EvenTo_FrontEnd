import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthRoute from './routes/AuthRoute';
import UserRoute from './routes/UserRoute';
import AdminRoutes from './routes/AdminRoute';
import OrganizerRoutes from './routes/OrganizerRoute';
import useGetUser from './hook/useGetUser';
import Home from './page/Home';
import ErrorPage from './componant/common/ErrorPage';
import { Blocked } from './componant/common/Blocked';
import { WaitingPage } from './componant/organizer/WaitingPage';
import { findbyId } from './api/organizer';
import { currentUser } from './@types/allTypes';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/userSlice';
import toast from 'react-hot-toast';

function App() {
  const user = useGetUser().role;

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const role = localStorage.getItem('role');

  console.log(" the aceess",accessToken)
  console.log(" the refresh",refreshToken)
  console.log(" the role ",role)
  const currentUser = useGetUser()
  useSelector((state: currentUser) => state)
  const dispatch = useDispatch()
  console.log("the user is ", currentUser);

  if (user === "organizer" && !currentUser.blocked) {
      async function checkuser(){
        const result = await findbyId(currentUser.id)
        console.log(result,"_________________")
        if (result.organizer.blocked) {
          dispatch(setUser({
            role: "",
            name: "",
            email:"",
            id: "",
            blocked: "",
            approve: ""
          }))
          toast.error(" Your blocked by admin!!!")
        }
      }
      checkuser()
  }


  return (
    <>
      <BrowserRouter>
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/*" element={user && user !== "requestPending" ? (<Navigate to={"/"} />) : (<AuthRoute />)} />
          <Route path="/admin/*" element={user === "admin" ? <AdminRoutes /> : <Navigate to={"/auth/adminlogin"} />} />
          <Route path='/pending' element={user === "requestPending" ? <WaitingPage /> : <Navigate to={"/"} />} />
          {
            currentUser && currentUser.blocked === false && <>
              <Route path="/user/*" element={user === "user" ? <UserRoute /> : <Navigate to={"/"} />} />
              <Route path="/organizer/*" element={user === "organizer" || user === "requestPending" ? (<OrganizerRoutes />) : (<Navigate to={"/organizer/blocked"} />)} />
            </>
          }
          {
            currentUser && currentUser.blocked === true && <>
              <Route path='/oranizer/blocked' element={<Blocked />}></Route>
            </>
          }
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
