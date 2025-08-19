const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const EmailHelper = require("../utils/emailHelper");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.send({ success: false, message: "User already exist" })
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = new User({
            ...req.body,
            password: hashedPassword, // Store the hashed password
        });

        await newUser.save();

        res.send({ success: true, message: "Registration successful, Please login" });
    } catch (e) {
        res.send(400).json({ success: false, message: e.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({ success: false, message: "User not found" })
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.send({
                success: false,
                message: "Invalid Credentials",
            });
        }


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie('authorization', token, {
            httpOnly: true,       // Prevent JavaScript access (helps mitigate XSS attacks)
            secure: true,         // Ensures cookie is sent over HTTPS (use in production)
            maxAge: 24 * 60 * 60 * 1000, // Cookie expiration: 1 day
            sameSite: 'lax'       // Helps protect against CSRF attacks
        });

        res.send({ success: true, message: "Login successul", token: token });
    } catch (e) {
        res.status(400).json({ success: false, message: e.message });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId).select("-password");
        res.send({ success: true, data: user });

    } catch (e) {
        console.log(e);
        res.send(400).json({ success: false, message: e.message });
    }
};

const otpGenerator = function () {
    return Math.floor(100000 + Math.random() * 900000);
};

const forgetpassword = async function (req, res) {
    try {
        /****
        * 1. You can ask for email
        * 2. check if email is present or not
        * * if email is not present -> send a response to the user(user not found)
        * 3. if email is present -> create basic otp -> and send to the email
        * 4. also store that otp -> in the userModel
        *
        * ***/
        if (req.body.email == undefined) {
            return res.status(401).json({
                status: "failure",
                message: "Please enter the email for forget Password",
            });
        }
        // find the user -> going db -> getting it for the server
        let user = await User.findOne({ email: req.body.email });
        if (user == null) {
            return res.status(404).json({
                status: "failure",
                message: "user not found for this email",
            });
        }
        // got the user -> on your server
        const otp = otpGenerator();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        // those updates will be send to the db
        await user.save();
        await EmailHelper("otp.html", user.email, {
            name: user.name,
            otp: otp,
        });
        res.status(200).json({
            status: "success",
            message: "otp sent to your email",
        });
        // send the mail to there email -> otp
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure",
        });
    }
    // email
};

const resetpassword = async function (req, res) {
    // -> otp
    // newPassword and newConfirmPassword
    // -> params -> id
    try {
        let resetDetails = req.body;
        // required fields are there or not
        if (!resetDetails.password || !resetDetails.otp) {
            return res.status(401).json({
                status: "failure",
                message: "invalid request",
            });
        }
        // it will serach with the id -> user
        const user = await User.findOne({ email: req.params.email });
        // if user is not present
        if (user == null) {
            return res.status(404).json({
                status: "failure",
                message: "user not found",
            });
        }
        // if otp is expired
        if (Date.now() > user.otpExpiry) {
            return res.status(401).json({
                status: "failure",
                message: "otp expired",
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        user.password = hashedPassword;
        // remove the otp from the user
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        res.status(200).json({
            status: "success",
            message: "password reset successfully",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure",
        });
    }
};

module.exports = { registerUser, loginUser, getCurrentUser, forgetpassword, resetpassword };