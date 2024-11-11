const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = async (req, res, next) => {
    try {

        const token = req.cookies.token || req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(400).json({
                success: false,
                msg: "token expired please login again!!"
            })
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = payload;

        next();



    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "erro occured during authentication!!",
            err: error

        })
    }
}

const isAdmin = async (req, res, next) => {
    try {

        const paylod = req.user;

        if (!paylod) {
            return res.status(400).json({
                success: false,
                msg: "token expired please login again!!"
            })
        }



        if (paylod.role != "admin") {

            return res.status(500).json({
                success: false,
                msg: "you are not authorized as admin !!"
            })

        }

        next();




    } catch (error) {

        return res.status(500).json({
            success: false,
            msg: "error occured during authorizing as admin !!"
        })

    }
}
module.exports = { auth, isAdmin }