const express = require("express");
const auth = require("../middleware/authMiddleware");
const { registerUser, loginUser, getCurrentUser, forgetpassword, resetpassword } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/get-current-user", auth, getCurrentUser);

userRouter.patch("/forgetpassword", forgetpassword);

userRouter.patch("/resetpassword/:email", resetpassword);

module.exports = userRouter;