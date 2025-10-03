const express = require("express");
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitize = require("express-mongo-sanitize");
const path = require('path');
const clientBuildPath = path.join(__dirname, "../client/build");
const cors = require('cors');

const app = express();
app.use(helmet());
app.disable("x-powered-by");
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "https://checkout.stripe.com",
        "https://js.stripe.com"
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",                 // needed for Ant Design + Stripe styles
        "https://fonts.googleapis.com",
        "https://checkout.stripe.com"
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com"
      ],
      imgSrc: [
        "'self'",
        "data:",
        "https://q.stripe.com"             // Stripe analytics pixel
      ],
      connectSrc: [
        "'self'",
        "https://api.stripe.com"           // Stripe API calls
      ],
      frameSrc: [
        "'self'",
        "https://checkout.stripe.com"      // Stripe Checkout iframe
      ],
      objectSrc: ["'none'"],

app.use(mongoSanitize());
app.use(express.json());
app.use(cookieParser());
// app.use(
app.use(
    cors({
        origin: "https://bookmyshow-3oi0.onrender.com",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.set('trust proxy', 1);

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

app.use(express.static(clientBuildPath));
app.get("*", (req, res) => {    
    res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.listen(1997, () => {
    console.log("Server is up and running on port 1997");
});