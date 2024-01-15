const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const {connectToDB} = require("./config/database")
const { cloudinaryConnect } = require('./config/cloudinary')

// routes
const AuthRoutes = require("./routes/AuthRoutes")
const ProfileRoutes = require("./routes/ProfileRoutes")
const CategoryRoutes = require("./routes/CategoryRoutes")
const CourseRoutes = require("./routes/CourseRoutes")
const PaymentRoutes = require("./routes/PaymentsRoutes")

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({
    limit: '150mb'
}))
app.use(cors({
    origin: "*",
    methods: ['GET','POST']
}))
app.use('/api/v1/auth',AuthRoutes)
app.use('/api/v1/profile',ProfileRoutes)
app.use('/api/v1/category',CategoryRoutes)
app.use('/api/v1/course',CourseRoutes)
app.use('/api/v1/payment',PaymentRoutes)

// connections
connectToDB()
cloudinaryConnect()

app.get('/',(req,res)=>{
    res.send(`<h1>Server is Running </h1>`)
})

app.listen(PORT, (req, res)=>{
    console.log(`Server is running on port ${PORT}`)
})