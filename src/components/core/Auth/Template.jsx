import React from 'react'
// import { useSelector } from 'react-redux'

import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"

const Template = ({formType, title}) => {

    // const { loading } = useSelector((state)=> state.auth)

    return(
        <div className='login flex items-center justify-center min-h-screen text-puregray-25 text-pure-greys-50 bg-gradient-to-r from-gray-700 via-gray-900 to-black'>
        <div className='relative bg-white z-10 flex m-6 space-y-4 bg-black bg-opacity-10 backdrop-blur-sm shadow-2xl rounded-2xl md:flex-row md:space-y-2 '>
            {
                formType === 'signup' ? <SignUpForm/> : <LoginForm/>
            }
            <div className='relative z-10'>
                <img alt='bg-img' 
                    src="https://imgs.search.brave.com/4dPHWcg1CMS-etb2T0bIbmtIQBFzHIaWcUzdXZZwK24/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/cm9udC12aWV3LXN0/YWNrZWQtYm9va3Mt/Z3JhZHVhdGlvbi1j/YXAtZGlwbG9tYS1l/ZHVjYXRpb24tZGF5/XzIzLTIxNDkyNDEw/MTEuanBnP3NpemU9/NjI2JmV4dD1qcGc" 
                    className=" w-full h-full hidden rounded-r-2xl md:block object-contain " />
                <div className=' absolute hidden bottom-10 right-6 p-6 bg-black bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block '>
                    <span className='text-white text-xl'> We've been using untitle to kick <br /> start every new project and cant<br /> imagne working without it</span>
                </div>
            </div>
        </div>
    </div>
    )

}

export default Template