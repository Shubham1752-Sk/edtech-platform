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
    GET_COURSE_CATEGORIES_API: BASE_URL + '/api/v1/category/showAllCategories',
    CATALOG_PAGE_DATA_API: BASE_URL + "/api/v1/category/getCategoryPageDetails",
}

export const courseEndpoints = {
    CREATE_COURSE_API: BASE_URL + "/api/v1/course/addcourse",
    EDIT_COURSE_API: BASE_URL + "/api/v1/course/editcourse",
    CREATE_SECTION_API: BASE_URL + "/api/v1/course/addSection",
    CREATE_SUBSECTION_API: BASE_URL + "/api/v1/course/addsubsection",
    UPDATE_SECTION_API: BASE_URL + "/api/v1/course/updatesection",
    UPDATE_SUBSECTION_API: BASE_URL + "/api/v1/course/updatesubsection",
    DELETE_SECTION_API: BASE_URL + "/api/v1/course/deletesection",
    DELETE_SUBSECTION_API: BASE_URL + "/api/v1/course/deletesubsection",
    DELETE_COURSE_API: BASE_URL + "/api/v1/course/deletecourse",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/api/v1/course/getInstructorCourses",
    COURSE_DETAILS_API: BASE_URL + '/api/v1/course/getCourseDetails',
    CREATE_RATING_API: BASE_URL + '/api/v1/course/createRating',
    GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/api/v1/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/api/v1/course/updateCourseProgress",
}

export const ratingsEndpoints = {
    REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
}

export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/api/v1/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/api/v1/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/api/v1/payment/sendPaymentSuccessEmail",
}

export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/api/v1/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/api/v1/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/api/v1/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/api/v1/profile/deleteProfile",
}

export const catalogData = {
    
  }