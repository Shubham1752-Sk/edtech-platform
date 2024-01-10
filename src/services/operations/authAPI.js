import { apiConnector } from "../apiConnector"
import { setLoading, setToken, } from "../../slices/AuthSlice";
import { authEndpoints } from "../api"
import { ToastContainer, toast} from "react-toastify"
import { setUser } from "../../slices/ProfileSlice";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
} = authEndpoints ;

export function sendotp({email, navigate}){
    
    return async (dispatch) =>{
        const toastId = toast.loading("loading...")
        dispatch(setLoading(true))
        try {
            console.log(`Send Otp Base url is ${SENDOTP_API}`)
            const response = await apiConnector("POST",SENDOTP_API,{
                email,
                checkUserPresent: true
            })
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("OTP sent successfully")
            navigate('/verify-email')

        } catch (error) {
            console.log("SENDOTP API error ",error)
            toast.error("Could not send OTP")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function signUp(
    firstName,
    lastName,
    email,
    accountType,
    mobileNumber,
    password,
    confirmPassword,
    otp,
    navigate
  ) {
    return async (dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        console.log("signup API :",SIGNUP_API)
        try {
            const response = await apiConnector("POST",SIGNUP_API,{
                firstName,
                lastName,
                email,
                accountType,
                mobileNumber,
                password,
                confirmPassword,
                otp,
            })
            console.log("SIGNUP API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Signup Successful")
            navigate(`/login`)
        } catch (error) {
           console.log("Error in SIGNUP API :", error)
           console.log("Signup Failed!!")
           navigate('/signup') 
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email, password, navigate){
    return async(dispatch)=>{
        const toastId = toast.loading('Loading...')
        dispatch(setLoading(true));
        try {
            const result = await apiConnector('POST', LOGIN_API,{
                email, 
                password
            })
            console.log('LOGIN API RESPONSE ......... ', (result))
            toast.success("Login Succcessfull ")
            // const token = JSON.stringify(result.data.token)
            const {user} = result.data

            console.log(user)
            dispatch(setToken(result.data.token))
            localStorage.setItem("token",JSON.stringify(result.data.token))
            const userImage = result.data?.user?.profilePhoto
            ? result.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${result.data.user.firstName} ${result.data.user.lastName}`
            // dispatch(setUser({ ...result.data.user, profilePhoto: userImage }))
            dispatch(setUser({ ...result.data.user}))
            // localStorage.setItem("token",JSON.stringify(result.data.token))
            navigate("/dashboard-myprofile")
        } catch (error) {
          console.log("LOGIN API ERROR............", error)
          toast.error("Login Failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

//   export function logout(navigate) {
//     return (dispatch) => {
//     //   dispatch(setToken(null))
//     //   dispatch(setUser(null))
//     //   dispatch(resetCart())
//       localStorage.setItem("token","")
//       localStorage.setItem("user","")
//       toast.success("Logged Out")
//       navigate("/")
//     }
//   }

export function logout(navigate){
    return async (dispatch)=>{
        dispatch(setToken(null))
        dispatch(setUser(null))
        localStorage.setItem("token",null)
        localStorage.setItem("token",null)
        alert("Logged out !!")
        navigate("/")
    }
}