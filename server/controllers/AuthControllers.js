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
        contactNumber,
        otp,
      } = req.body
    //   check if user already exsist
      if (!firstName || !email || !password || !confirmPassword ||  !contactNumber || !otp ){
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
        else if (otp !== response.otpCode) {
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
            contactNumber: contactNumber,
            about: null,
        })
        console.log(profileDetails)
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            additionalInfo: profileDetails._id
        })
        
        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
          })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Internal server error while signing UP ${error}`
        })
    }
}