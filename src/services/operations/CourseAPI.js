import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../api";

const {
    ADD_NEW_COURSE
} = courseEndpoints

export const addCourseDetails = async (data, token) => {
    let result = null
    // const toastId = toast.loading("Loading...")
    console.log(data)
    try {
      const response = await apiConnector("POST", ADD_NEW_COURSE, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add Course Details")
      }
      console.log("Course Details Added Successfully")
      result = response?.data?.data
    } catch (error) {
      console.log("CREATE COURSE API ERROR............", error)
      console.log(error.message)
    }
    // toast.dismiss(toastId)
    return result
  }

