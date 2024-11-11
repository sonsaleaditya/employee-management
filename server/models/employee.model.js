const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true // Ensures no duplicate emails
    },
    mobile: {
        type: Number,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    image: {
        type: String,
         // URL to store image
    },
    createdate: {
        type: Date,
        default: Date.now
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
