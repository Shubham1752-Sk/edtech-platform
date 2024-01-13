import { apiConnector } from "../apiConnector";
import { categoryEndpoints } from "../api";

const {
    CREATE_CATEGORY,
    GET_COURSE_CATEGORIES_API
} = categoryEndpoints

export function createCategory(setLoading, token, name, description) {
    setLoading(true);
    return async (dispatch) => {
        console.log(name)
        console.log(description)
        try {
            const response = await apiConnector('POST', CREATE_CATEGORY, {
                name,
                description
            }, {
                Authorization: `Bearer ${token}`
            })
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            console.log("Result of Create Category API ....", response)
            alert("Category Created Successfully")
        } catch (error) {
            console.log(`Error n Create Category API..... ${error}`)
        }
        finally {
            setLoading(false)
        }
    }
}

export const fetchCourseCategories = async () => {
    let result = []
    try {
        const response = await apiConnector("GET", GET_COURSE_CATEGORIES_API)
        console.log("COURSE_CATEGORIES_API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Course Categories")
        }
        result = response?.data?.data
        // console.log("Result of Fetch Category API ....", response.data)
    } catch (error) {
        console.log("COURSE_CATEGORY_API API ERROR............", error)
        // toast.error(error.message)
    }
    return result
}