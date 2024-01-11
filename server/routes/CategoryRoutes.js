const express = require("express")
const { auth, isAdmin } = require("../middleware/auth") 
const { 
    createCategory,
    showAllCategories
} = require("../controllers/CategoryControllers")

const router = express.Router()

router.post('/createcategory',auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)

module.exports = router