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
        await Shows.findByIdAndDelete(req.body.showId);
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
        const shows = await Shows.find({ theatre: req.body.theatreId }).populate("movie");
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
        
        let uniqueTheatres = [];
        shows.forEach((show) => {
            let isTheatre = uniqueTheatres.find(
                (theatre) => theatre._id === show.theatre._id
            );
            if (!isTheatre) {
                let showsOfThisTheatre = shows.filter(
                    (showObj) => showObj.theatre._id == show.theatre._id
                );
                uniqueTheatres.push({
                    ...show.theatre._doc,
                    shows: showsOfThisTheatre,
                });
            }
        });
        res.send({
            success: true,
            message: "All theatres fetched!",
            data: uniqueTheatres,
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
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