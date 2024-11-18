const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/authMiddleware");
const { registerUser, loginUser, getCurrentUser } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/get-current-user", auth, getCurrentUser);

module.exports = userRouter;