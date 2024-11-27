const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.send({ success: false, message: "User already exist" })
        }

        const newUser = new User(req.body);
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

        if (req.body.password !== user.password) {
            return res.send({ success: false, message: "Invalid Password" })
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

module.exports = { registerUser, loginUser, getCurrentUser };