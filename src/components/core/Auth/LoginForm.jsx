import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';

// import { login } from '../../../services/operations/authAPI'
// import { getUserInfo } from '../../../services/operations/UserAPI'

const LoginForm = () => {

//   const dispatch = useDispatch();
  const navigate = useNavigate()

  const [ formData, setFormData ] = useState({
    email:"",
    password:""
  })

  function handleFormData(e){
    setFormData((prev)=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const {token} = useSelector((state)=>state.auth)

  useEffect(()=>{
    // console.log(token)
    if(token){
      
      navigate("/")
    }
    else{
        toast.info("No Token Found")
    }
  })

  const loginHandler = (e) =>{
    e.preventDefault();

    console.log(formData)

    // dispatch(login(formData.email, formData.password, navigate))
  }

  return (
    <form onSubmit={loginHandler}>
      <div className=' h-full flex flex-col justify-center p-6 md:p-14 outline-1 text-gray-300 outline-white outline-double rounded-tl-lg rounded-bl-lg '>
      <span className='mb-3 text-4xl font-bold'>Welcome Again!!</span>
      <span className='font-light text-gray-300 mb-8'>Please Enter Your details</span>
      <div className='py-4 '>
        <span className='mb-10 text-md'>E-mail</span>
        <input name="email" value={formData.email} onChange={handleFormData} type='email' className=' w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500' id="email" />
      </div>
      <div className=' py-4'>
        <span className='mb-2 text-md'>Password</span>
        <input name="password" value={formData.password} onChange={handleFormData} type="password" nme="pass" id="pass" className=' w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500' />
      </div>
      <div className='flex justify-between w-full py-4'>
        <div className=" mr-24">
          <input type="checkbox" name="ch" id="ch" className='mr-2' />
          <span className=' text-md'>Remember for 30 days</span>
        </div>
        <span className=' font-bold text-md'>forgot password ?</span>
      </div>
      <button className=' w-full bg-black text-white p-2 rounded-lg mb-6 duration-100 ease-in-out hover:bg-white hover:text-black hover:border hover:border-gray-300' type="submit">Sign in</button>
      <button className=' w-full border border-gray-300 text-base p-2 rounded-lg mb-6 duration-100 ease-in-out hover:bg-black hover:text-white ' > Sign in with Google</button>
      <div className=' text-center text-pure-greys-400 '>
        Don't have an Account
        <span className='font-bold text-gray-500 ml-4 cursor-pointer' onClick={()=>navigate('/signup')} >Sign Up for Free</span>
      </div>
    </div>
    </form>
  )
}

export default LoginForm