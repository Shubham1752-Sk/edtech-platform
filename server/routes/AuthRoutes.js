const express = require("express")
const { sendotp } = require("../controllers/AuthControllers")

const router = express.Router()

router.post('/sendotp',sendotp)

module.exports = router