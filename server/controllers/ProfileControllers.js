const Profile = require("../models/ProfileModel")
const Course = require("../models/CourseModel")
const User = require("../models/UserModel")

exports.getUserDetails = async (req, res) => {
    try {
    //   const {token} = req.params;
    //   console.log("req.user is: ",req.user)
      const id = req.user.id
      const userDetails = await User.findById(id).populate("additionalInfo")
        
      console.log(userDetails)
      res.status(200).json({
        success: true,
        message: "User Data fetched successfully",
        data: userDetails,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }