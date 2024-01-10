const bcrypt = require("bcrypt")
const User = require("../models/UserModel")
const OTP = require("../models/OTPModel")
const jwt = require("jsonwebtoken")
const otpGenerator = require("otp-generator")
const Profile = require("../models/ProfileModel")
const mailSender = require("../utils/mailSender")
const emailVerificationTemplate = require("../mailTemplates/emailVerification")
require('dotenv').config()

exports.sendotp = async (req, res, next) =>{
    try{
        console.log(req.body);
        const { email } = req.body;
        
        const checkIfUserAlreadyPresent = await User.findOne({ email })
        
        if( checkIfUserAlreadyPresent ){
            return res.status(409).json({ 
                success: false,
                message: "Email already registered" 
            });
        }
        
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })
        
        let result = await OTP.findOne({otp});
        
        while( result ){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets: false,
            })
            
            result = await OTP.findOne({otp});
        }
        console.log("opt is :",otp)
        const createdOtp = await OTP.create({
            otp: otp,
            email: email,
            createdAt: Date.now()
        })
        // console.log(email);
        console.log(`saved OTP is ${createdOtp}`)

        try{
            await mailSender(email,"E-mail Verification OTP",emailVerificationTemplate(createdOtp.otp));
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:"Internal Sevrer Error while sending Verification E-mail"
            })
        }
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp
        })
    }
    catch(error){
        console.log("Error in OTP sending Route ",error)
        res.status(500).json({
            success: false,
            errorMessage: `Internal Server Error while sending OTP ${error}`
        })
    }
}

exports.signUp = async(req, res, next)=>{
    console.log("In the signup function")
    try {
        // Destructure fields from the request body
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        mobileNumber,
        otp,
      } = req.body
    //   check if user already exsist
      if (!firstName || !email || !password || !confirmPassword ||  !mobileNumber || !otp ){
        return res.status(403).send({
            success: false,
            message: "All Fields are required",
          })
      }
    //   console.log("Requirements Matched!!")
    // Check if password and confirm password match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message:
                "Password and Confirm Password do not match. Please try again.",
            })
        }
        // console.log("passwords Matched!!")
    // Check if user already exists
        const existingUser = await User.findOne({ email })
        // console.log("Existing user ",existingUser)
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue.",
            })
        } 
        
        // console.log("No existing user found!!")
    // find the most recent otp for this email
        const response = await OTP.findOne({email}).sort({ createdAt: -1}).limit(1)
        
        if (response.length === 0) {
    // OTP not found for the email
        return res.status(400).json({
            success: false,
            message: "OTP not found",
        })
        }
    // Invalid 
        else if (otp !== response.otp) {
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            })
        }
        // console.log("hasing Passwords")
    // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

    // Create the Additional Profile For User
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            mobileNumber: mobileNumber,
            about: null,
        })
        console.log(profileDetails)
        const user = await User.create({
            firstName,
            lastName,
            email,
            accountType,
            password: hashedPassword,
            additionalInfo: profileDetails._id
        })
        
        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
          })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: `Internal server error while signing UP ${error}`
        })
    }
}

exports.login = async (req, res) => {
    try {
      // Get email and password from request body
      const { email, password } = req.body
  
      // Check if email or password is missing
      if (!email || !password) {
        // Return 400 Bad Request status code with error message
        return res.status(400).json({
          success: false,
          message: `Please Fill up All the Required Fields`,
        })
      }
  
      // Find user with provided email
      const user = await User.findOne({ email }).populate("additionalInfo")
  
      // If user not found with provided email
      if (!user) {
        // Return 401 Unauthorized status code with error message
        return res.status(401).json({
          success: false,
          message: `User is not Registered with Us Please SignUp to Continue`,
        })
      }
  
      // Generate JWT token and Compare Password
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { email: user.email, id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        )
  
        // Save token to user document in database
        user.token = token
        user.password = undefined
        // Set cookie for token and return success response
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        }
        res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          user,
          message: `User Login Success`,
        })
      } else {
        return res.status(401).json({
          success: false,
          message: `Password is incorrect`,
        })
      }
    } catch (error) {
      console.error(error)
      // Return 500 Internal Server Error status code with error message
      return res.status(500).json({
        success: false,
        message: `Login Failure Please Try Again`,
      })
    }
  }