import './index.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

// pages
import Home from "./pages/Home"
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from "./pages/Dashboard"

// Components
import OpenRoute from "./components/core/Auth/OpenRoute"
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import MyProfile from './components/core/Dashboard/MyProfile';
import AddCourse from './components/core/Dashboard/AddCourse';
import { getUserDetails } from './services/operations/ProfileApi';

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state)=>state.profile)
  const {token}=useSelector((state)=>state.auth)

  useEffect(()=>{
    if(token){
      // alert('im having a token')
      dispatch(getUserDetails(token,navigate))
    }
  },[])

  return (
    <div className='h-screen w-screen ' >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          {/* links for all users */}
          <Route path='/dashboard/my-profile' element={<MyProfile />} />
          <Route path='/dashboard/add-course' element={<AddCourse />} />
          
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
