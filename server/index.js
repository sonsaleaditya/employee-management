const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const cloudinaryConnect = require('./config/cloudinary.js');

const adminRoute = require('./routes/Adminroutes.js')


app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))
require('./config/db.js')();
app.use(express.json());
app.use(cookieParser())
app.use(cors());




cloudinaryConnect();

app.use('/api/v1/admin',adminRoute);



app.get('/health', (req, res) => {
    return res.status(200).json({
        msg: "health is good!!"
    })
})


app.listen(port, () => {
    console.log(`server is listening to port : https://localhost:${port}/`)
});