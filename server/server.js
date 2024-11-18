const express = require("express");
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
require("dotenv").config();

const userRouter = require("./routes/userRoutes");

const connectDb = require("./config/db");
const movieRouter = require("./routes/movieRoutes");
connectDb();

app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);

app.listen(1997, () => {
    console.log("Server is up and running on port 1997");
});