const mongoose = require("mongoose")

exports.connectToDB = async() =>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Connection to database Successfull !!")
    })
    .catch((error)=>{
        console.log(`Error while connecting to the database : ${error}`)
    })
}