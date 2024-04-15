import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthRoute from './routes/AuthRoute';
import UserRoute from './routes/UserRoute';
import AdminRoutes from './routes/AdminRoute';
import OrganizerRoutes from './routes/OrganizerRoute';
import useGetUser from './hook/useGetUser';
import Home from './page/Home';
import ErrorPage from './componant/ErrorPage';
// import OrganizerLogin from './page/organizer/OrganizerLogin';

function App() {
  const user = useGetUser().role;
  console.log("the user is ", user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route  path="/auth/organizerLogin" element={user === "requestPending" ? <OrganizerLogin /> : <AuthRoute />} /> */}
          <Route path="/auth/*"
            element={
              user === "user" || user === "organizer" || user === "admin" ? (
                <Navigate to={"/"} />
              ) : (
                <AuthRoute />
              )
            }
          />
          <Route path="/user/*" element={user === "user" ? <UserRoute /> : <Navigate to={"/"} />}  />
          <Route path="/admin/*" element={user === "admin" ? <AdminRoutes /> : <Navigate to={"/auth/adminlogin"} />}  />
          <Route  path="/organizer/*" element={  user === "organizer" || user === "requestPending" ? (<OrganizerRoutes />) : (<Navigate to={"/wrondor"} />
              )
            }
          />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
