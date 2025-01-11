const Shows = require("../models/showModal");

const addShow = async (req, res) => {
    try {
        const show = new Shows(req.body);
        await show.save();
        res.send({ success: true, message: "New show has been added" });
    } catch (e) {
        console.log(e);
        res.send({ success: false, message: e.message });
    }
};

const deleteShow = async (req, res) => {
    try {
        await Shows.findByIdAndDelete(req.params.showId);
        res.send({ success: true, message: "Show has been deleted" });
    } catch (e) {
        console.log(e);
        res.send({ success: false, message: e.message });
    }
};

const updateShow = async (req, res) => {
    try {
        await Shows.findByIdAndUpdate(req.body.showId, req.body);
        res.send({ success: true, message: "Show has been updated" });
    } catch (e) {
        console.log(e);
        res.send({ success: false, message: e.message });
    }
};



const getAllShowsByTheatre = async (req, res) => {
    try {
        const shows = await Shows.find({ theatreId: req.params.theatreId }).populate("movie");
        res.send({ success: true, message: "All shows are fetched", data: shows });
    } catch (e) {
        console.log(e);
        res.send({ success: false, message: e.message });
    }
};

const getAllTheatresByMovie = async (req, res) => {

    try {
        const { movie, date } = req.body;
        const shows = await Shows.find({ movie, date }).populate("theatre");

        let uniqueTheatre = [];

        shows.forEach((show) => {

            let isTheatre = uniqueTheatre.find(
                (theatre) => theatre._id === show.theatre._id
            );

            if (!isTheatre) {

                let rv = show.find((obj) => obj.theatre._id === show.theatre._id);
                uniqueTheatre.push({
                    ...shows.theatre._doc,
                    shows: rv
                });
            }
        });

        res.send({ success: true, message: "All shows are fetched", data: uniqueTheatre });
    }
    catch (e) {
        res.send({ success: false, message: e.message });
    }
};

const getShowById = async (req, res) => {
    try {
        const show = await Shows.findById(req.body.showId)
            .populate("movie")
            .populate("theatre");
        res.send({
            success: true,
            message: "Show fetched!",
            data: show,
        });
    }
    catch (e) {
        res.send({ success: false, message: e.message });
    }
};

module.exports = {addShow, deleteShow, updateShow, getAllShowsByTheatre, getAllTheatresByMovie, getShowById};