import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice";
import profileReducer from "../slices/ProfileSlice"
import courseReducer from "../slices/CourseSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    course: courseReducer
})

export default rootReducer