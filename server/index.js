const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const {connectToDB} = require("./config/database")

// routes
const AuthRoutes = require("./routes/AuthRoutes")
const ProfileRoutes = require("./routes/ProfileRoutes")

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors({
    origin: "*",
    methods: ['GET','POST']
}))
app.use('/api/v1/auth',AuthRoutes)
app.use('/api/v1/profile',ProfileRoutes)

// connections
connectToDB()

app.get('/',(req,res)=>{
    res.send(`<h1>Server is Running </h1>`)
})

app.listen(PORT, (req, res)=>{
    console.log(`Server is running on port ${PORT}`)
})