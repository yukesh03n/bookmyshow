const express = require("express");
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitize = require("express-mongo-sanitize");

const app = express();
app.use(helmet());
app.disable("x-powered-by");
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "https://fonts.googleapis.com"],
            imgSrc: ["'self'", "data:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            objectSrc: ["'none'"],
        },
    })
);
app.use(mongoSanitize());
app.use(express.json());
app.use(cookieParser());
require("dotenv").config();

const rateLimit = require("express-rate-limit");


const userRouter = require("./routes/userRoutes");

const connectDb = require("./config/db");
const movieRouter = require("./routes/movieRoutes");
const theatreRouter = require("./routes/theatreRoutes");
const showRouter = require("./routes/showRoutes");
const bookingRouter = require("./routes/bookingRoutes");
connectDb();

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/api/", apiLimiter);

app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatre", theatreRouter);
app.use("/api/shows", showRouter);
app.use("/api/bookings", bookingRouter);

app.listen(1997, () => {
    console.log("Server is up and running on port 1997");
});