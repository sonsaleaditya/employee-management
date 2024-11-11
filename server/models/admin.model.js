const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
   username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:["user","admin"],
        default:"admin"
    }

}, { timestamps: true })


module.exports = mongoose.model('admin',adminSchema);