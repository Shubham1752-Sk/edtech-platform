import { Route, Routes } from 'react-router-dom';
import './index.css';

// pages
import Home from "./pages/Home"
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <div className='h-screen w-screen ' >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
