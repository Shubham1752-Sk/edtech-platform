const express = require("express")
const {auth} = require("../middleware/auth")
const {
    getUserDetails
} = require("../controllers/ProfileControllers")

const router = express.Router()

router.get('/getuserdetails',auth, getUserDetails)

module.exports = router