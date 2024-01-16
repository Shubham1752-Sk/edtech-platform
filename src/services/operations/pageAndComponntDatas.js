import { toast } from "react-hot-toast"

import { apiConnector } from "../apiConnector"
import { categoryEndpoints } from "../api"

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    console.log("in the middleware")
    console.log(categoryEndpoints.CATALOG_PAGE_DATA_API)
    const response = await apiConnector(
      "POST",
      categoryEndpoints.CATALOG_PAGE_DATA_API,
      {
        categoryId: categoryId,
      }
    )
    console.log("CATALOG PAGE DATA_API API Response............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Catagory page data.")
    }
    result = response?.data
  } catch (error) {
    console.log("CATALOG PAGE DATA_API API ERROR............", error)
    toast.error(error.message)
    result = error.response?.data
  }
  toast.dismiss(toastId)
  return result
}
