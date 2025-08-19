const bookingRouter = require("express").Router();
const { bookShow, makePayment, getAllBooking } = require("../controllers/bookingController");
const auth = require("../middleware/authMiddleware");

bookingRouter.post("/make-payment", auth, makePayment);
bookingRouter.post("/book-show", auth, bookShow);
bookingRouter.get("/get-all-bookings", auth, getAllBooking);

module.exports = bookingRouter;