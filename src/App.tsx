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

function App() {
  const user = useGetUser().role;
  const currentUser = useGetUser()
  console.log("the user is ", user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/*" element={ user&& user !=="requestPending" ? (<Navigate to={"/"} />) : (<AuthRoute />)} />
          <Route path="/admin/*" element={user === "admin" ? <AdminRoutes /> : <Navigate to={"/auth/adminlogin"} />} />
          <Route path='/pending' element={user ==="requestPending" ? <WaitingPage/> : <Navigate to={"/"}/> }  /> 
          {
            currentUser && currentUser.blocked === false && <>
              <Route path="/user/*" element={user === "user" ? <UserRoute /> : <Navigate to={"/"} />} />
              <Route path="/organizer/*" element={user === "organizer" || user === "requestPending" ? (<OrganizerRoutes />) : (<Navigate to={"/wrondor"} />)} />
            </>
          }
          {
            currentUser && currentUser.blocked === true && <>
              <Route path='/*' element={<Blocked />}></Route>
            </>
          }
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
