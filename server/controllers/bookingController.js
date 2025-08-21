const stripe = require("stripe")(process.env.STRIPE_KEY);
const Booking = require("../models/bookingModel");
const Shows = require("../models/showModal");
const EmailHelper = require("../utils/emailHelper");

const makePayment = async (req, res) => {
    try {
        const { token, amount } = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            customer: customer.id,
            payment_method_types: ["card"],
            receipt_email: token.email,
            description: "Token has been assigned to the movie!",
        });
        const transactionId = paymentIntent.id;
        res.send({
            success: true,
            message: "Payment processing. You will receive a confirmation once the payment is complete", data: transactionId,
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
};

const bookShow = async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        const show = await Shows.findById(req.body.show).populate("movie");
        const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
        await Shows.findByIdAndUpdate(req.body.show, {
            bookedSeats: updatedBookedSeats,
        });

        const populatedBooking = await Booking.findById(newBooking._id)
            .populate("user")
            .populate("show")
            .populate({
                path: "show",
                populate: {
                    path: "movie",
                    model: "movies",
                },
            })
            .populate({
                path: "show",
                populate: {
                    path: "theatre",
                    model: "theatre",
                },
            });
        console.log("this is populated Booking", populatedBooking);
        // console.log(populatedBooking.user.email);
        await EmailHelper("ticketTemplate.html", populatedBooking.user.email, {
            name: populatedBooking.user.name,
            movie: populatedBooking.show.movie.title,
            theatre: populatedBooking.show.theatre.name,
            date: populatedBooking.show.date,
            time: populatedBooking.show.time,
            seats: populatedBooking.seats,
            amount: populatedBooking.seats.length * populatedBooking.show.ticketPrice,
            transactionId: populatedBooking.transactionId,
        });

    res.send({
        success: true,
        message: "New Booking done!",
        data: newBooking,
    });
} catch (err) {
    res.send({
        success: false,
        message: err.message,
    });
}
};

const getAllBooking = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.body.userId })
            .populate("user")
            .populate("show")
            .populate({
                path: "show",
                populate: {
                    path: "movie",
                    model: "movies",
                },
            })
            .populate({
                path: "show",
                populate: {
                    path: "theatre",
                    model: "theatre",
                },
            });
        res.send({
            success: true,
            message: "Bookings fetched!",
            data: bookings,
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
};

module.exports = { makePayment, bookShow, getAllBooking };