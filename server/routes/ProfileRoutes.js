const express = require("express")
const {auth} = require("../middleware/auth")
const {
    getUserDetails,
    getEnrolledCourses,
} = require("../controllers/ProfileControllers")

const router = express.Router()

router.get('/getuserdetails',auth, getUserDetails)
router.get("/getEnrolledCourses", auth, getEnrolledCourses)

module.exports = router