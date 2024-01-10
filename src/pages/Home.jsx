import React from 'react'
import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  return (
    <div className='w-full h-full text-4xl flex justify-center items-center'>
    Home
      {/* <button className='bg-black font-bold p-2 text=xl text-white' onClick={dispatch(logout(navigate))}>Logout</button> */}
    </div>
  )
}

export default Home