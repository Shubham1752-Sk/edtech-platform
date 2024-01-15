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
import AddCategory from "./components/core/Dashboard/AddCategory"
import MyCourses from "./components/core/Dashboard/MyCourses"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses"
import Cart from "./components/core/Dashboard/Cart"
import Catalog from "./pages/Catalog"
import ViewCourse from './pages/ViewCourse';
import VideoDetails from './components/core/ViewCourse/VideoDetails';
// import Contact from "./pages/Contact"
import CourseDetails from "./pages/CourseDetails"

import { getUserDetails } from './services/operations/ProfileAPI';
import { ACCOUNT_TYPE } from './utils/constants';
import Navbar from './components/common/Navbar';

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
    <div className="flex min-h-screen w-screen flex-col bg-[#10133a] text-white font-inter">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
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
            <OpenRoute user={user}>
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
          
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
            </>
          )}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route path="/dashboard/cart" element={<Cart />} />
              
            </>
          )}
          { user?.accountType === ACCOUNT_TYPE.ADMIN &&(
            <>
              <Route path='dashboard/add-category' element={<AddCategory />} />
            </>
          )}
          
        </Route>

        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>

        
      </Routes>
    </div>
  );
}

export default App;
