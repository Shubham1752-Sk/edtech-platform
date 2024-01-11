const express = require('express')
const { auth, isInstructor } = require('../middleware/auth')
const {
    createCourse
} = require('../controllers/CourseControllers')

const router = express.Router()

router.post('/addcourse', auth, isInstructor, createCourse)

module.exports = router