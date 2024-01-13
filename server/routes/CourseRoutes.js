const express = require('express')
const { auth, isInstructor } = require('../middleware/auth')
const {
    createCourse,
    editCourse,
    deleteCourse,
    getInstructorCourses,
    getCourseDetails
} = require('../controllers/CourseControllers')

const {
    createSection,
    updateSection,
    deleteSection
} = require('../controllers/SectionControllers')

const {
    createSubSection,
    updateSubSection,
    deleteSubSection
} = require('../controllers/SubSectionControllers')

const router = express.Router()


router.post('/addcourse', auth, isInstructor, createCourse)
router.post("/editcourse", auth, isInstructor, editCourse)
router.post('/deletecourse',auth, isInstructor, deleteCourse)
//Add a Section to a Course
router.post("/addsection", auth, isInstructor, createSection)
// Update a Section
router.post("/updatesection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deletesection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updatesubsection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deletesubsection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addsubsection", auth, isInstructor, createSubSection)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)

router.post("/getCourseDetails", getCourseDetails)

module.exports = router