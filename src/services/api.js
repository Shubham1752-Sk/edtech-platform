// import { configDotenv } from "dotenv"

// configDotenv()

const BASE_URL = process.env.REACT_APP_BASE_URL

export const authEndpoints = {
    SENDOTP_API: BASE_URL + "/api/v1/auth/sendotp",
    SIGNUP_API: BASE_URL + "/api/v1/auth/signup",
    LOGIN_API: BASE_URL + "/api/v1/auth/login"
}

export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/api/v1/profile/getuserdetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/api/v1/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/api/v1/profile/instructorDashboard",
}

export const categoryEndpoints = {
    CREATE_CATEGORY: BASE_URL + '/api/v1/category/createcategory',
    GET_COURSE_CATEGORIES_API: BASE_URL + '/api/v1/category/showAllCategories'
}

export const courseEndpoints = {
    ADD_NEW_COURSE: BASE_URL + "/api/v1/course/addcourse"
}