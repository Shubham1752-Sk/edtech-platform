const express = require("express")
const { 
    sendotp,
    signUp,
    login
 } = require("../controllers/AuthControllers")

const router = express.Router()

router.post('/sendotp',sendotp)
router.post('/signup',signUp)
router.post('/login',login)

module.exports = router