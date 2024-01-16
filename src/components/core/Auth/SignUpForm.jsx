import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { sendotp } from "../../../services/operations/AuthAPI"
import { setSignupData } from "../../../slices/AuthSlice"
import Tab from '../../common/Tab';
import { ACCOUNT_TYPE } from '../../../utils/constants';

const SignupForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    accountType:"",
    mobileNumber:"",
    confirmPassword: "",
  })

  const handleFormData=(e)=>{
    setFormData((prev)=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
    // console.log(formData)
  }

  const SignupHandler = (e) =>{
    
    e.preventDefault();

    if( formData.password !== formData.confirmPassword ){
      toast.error("Passwords do not Match")
      console.log("returning");
      return
    }

    // console.log(formData)

    const signupData = { ...formData, accountType:accountType };
    console.log(signupData)

    // console.log(`Signnup data is: ${JSON.stringify(signupData)}`,)
    // console.log(`formdata is: ${JSON.stringify(formData) }`,formData)

    dispatch(setSignupData(signupData));
    const email = formData.email;

    const sendotpPayload = {
      email,
      navigate
    }
    dispatch(sendotp(sendotpPayload))

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber:"",
      password: "",
      confirmPassword: "",
    })

    setAccountType(ACCOUNT_TYPE.STUDENT)

  }

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
    
  ]

  return (
    <div className=''>
      <form onSubmit={SignupHandler}>
      <div className=' h-full flex flex-col justify-center p-6 md:px-14 outline-1 text-gray-300 outline-white outline-double rounded-tl-lg rounded-bl-lg '>
      <span className='mt-2 text-4xl md:text-3xl font-bold'>Welcome</span>
      <span className='font-light text-gray-400 mb-8'>Please Enter Your details</span>
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <div className='flex w-full space-x-4'>
        <div className='py-2 w-1/2'>
          <span className='mb-2 text-md'>First Name <span className=' text-orange-2'>*</span></span>
          <input required type='text' onChange={handleFormData} className=' w-full p-2 text-black border border-gray-300 rounded-md placeholder:font-light ' name='firstName' id="fname" value={formData.firstName} />
        </div>
        <div className='py-2 w-1/2'>
          <span className='mb-2 text-md'>Last Name</span>
          <input type='text' onChange={handleFormData} className=' w-full p-2 border text-black border-gray-300 rounded-md placeholder:font-light ' name='lastName' id="lastName" value={formData.lastName} />
        </div>
      </div>
      <div className='flex w-full space-x-4'>
        <div className='py-2 w-1/2'>
          <span className='mb-2 text-md'>E-mail <span className=' text-orange-2'>*</span></span>
          <input required type='text' onChange={handleFormData} className=' w-full p-2 text-black border border-gray-300 rounded-md placeholder:font-light ' name='email' id="email" value={formData.email} />
        </div>
        <div className='py-2 w-1/2'>
          <span className='mb-2 text-md'>Mobile No.</span>
          <input type='text' onChange={handleFormData} className=' w-full p-2 border text-black border-gray-300 rounded-md placeholder:font-light ' name='mobileNumber' id="mobileNumber" value={formData.mobileNumber} />
        </div>
      </div>
      <div className=' py-2'>
        <span className='mb-2 text-md'>Password <span className=' text-orange-2'>*</span></span>
        <input required type="password" onChange={handleFormData} name="password" id="pass" value={formData.password} className=' w-full p-2 border text-black border-gray-300 rounded-md placeholder:font-light ' />
      </div>
      <div className=' py-2'>
        <span className='mb-2 text-md'>Confirm Password <span className=' text-orange-2'>*</span></span>
        <input required type="password" onChange={handleFormData} name="confirmPassword" id="cpass" value={formData.confirmPassword} className=' w-full p-2 text-black border border-gray-300 rounded-md placeholder:font-light ' />
      </div>
      {/* <div className='flex justify-between w-full py-4'>
                                        <div className=" mr-24">
                                            <input type="checkbox" name="ch" id="ch" className='mr-2' />
                                            <span className=' text-md'>Remember for 30 days</span>
                                        </div>
                                        <span className=' font-bold text-md'>forgot password</span>
                                    </div> */}
      <button className=' w-full bg-black text-white p-2 rounded-lg mb-6 mt-4 hover:bg-white hover:text-black hover:border hover:border-gray-300' type='submit' >Sign Up</button>
      <button className=' w-full border border-gray-300 text-base p-2 rounded-lg mb-6 hover:bg-black hover:text-white inline' onClick={() => SignupHandler()}> Sign Up with Google</button>
      <div className=' text-center text-pure-greys-400 '>
        Already have an Account
        <span className='font-bold text-white hover:underline hover:cursor-pointer ml-4'>Login to Continue</span>
      </div>
    </div>
    </form>
    </div>
  )
}

export default SignupForm