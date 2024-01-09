const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String
    },
    courseDescription: {
        type: String
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    whatYouWillLearn: {
        type: String,
    },
    price: {
        type: Number,

    },
    thumbnail: {
        type: String,
    },
    tag: {
        type: [String],
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        },
    ],
    studentsEnroled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Course',courseSchema)