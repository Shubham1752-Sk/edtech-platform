const express = require("express")
const { auth, isAdmin } = require("../middleware/auth") 
const { 
    createCategory,
    showAllCategories,
    categoryPageDetails
} = require("../controllers/CategoryControllers")

const router = express.Router()

router.post('/createcategory',auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

module.exports = router