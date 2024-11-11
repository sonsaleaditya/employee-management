const mongoose = require('mongoose');
require('dotenv').config()
function dbConnect(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("db connected succesfully!");
    })
    .catch((e)=>{
        console.log("error occured while connecting to db !!")
    })
}

module.exports = dbConnect;