const adminModel = require("../models/admin.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const adminSignUp = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                msg: "all fields are mandatory!!"
            })
        }

        const existUser = await adminModel.findOne({ username: username });

        if (existUser) {
            return res.status(400).json({
                success: false,
                msg: "user already exist!!"
            })
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const savedUser = await adminModel.create({ username, password: hashedPass });
        return res.status(200).json({
            success: true,
            msg: "user saved succsfully!!",
            user: savedUser
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "error occured during saving user!!"
        })
    }
}


const adminSignIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                msg: "all fields are mandatory!!"
            })
        }

        const existUser = await adminModel.findOne({ username: username });

        if (!existUser) {
            return res.status(400).json({
                success: false,
                msg: "user not exist!!"
            })
        }

        if (!(bcrypt.compare(password, existUser.password))) {
            return res.status(400).json({
                success: false,
                msg: "invalid credentials !!"
            })
        }

        const paylod = {
            username: existUser.username,
            role: existUser.role
        }

        const token = await jwt.sign(paylod, process.env.JWT_SECRET);
        existUser.password = null;
        existUser.token = token;

        const options={
            httpOnly : true,
            expiredIn:"1d"
        }


        return res.cookie("token",token,options).status(200).json({
            success: true,
            msg: "admin logged in succsfully!!",
            user: existUser,
            token:token
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "error occured during saving user!!"
        })
    }
}

const fetchByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        if (!username) {
            return res.status(400).json({
                success: false,
                msg: "Username not provided"
            });
        }

        const user = await adminModel.findOne({ username: username }).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            msg: "Data fetched successfully!",
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error occurred while fetching data!"
        });
    }
};



module.exports = { adminSignIn, adminSignUp , fetchByUsername};