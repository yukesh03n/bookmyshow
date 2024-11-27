const Theatre = require("../models/theatreModel");

const addTheatre = async (req, res) => {
    try {
        const theatre = new Theatre(req.body);
        await theatre.save();
        res.send({ success: true, message: "New theatre has been added"});
    } catch (e) {
        console.log(e);
        res.send({ success: false, message: e.message});
    }
};

const updateTheatre = async (req, res) => {
    try {
        await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
        res.send({ success: true, message: "Theatre has been updated"});
    } catch (e) {
        console.log(e);
        res.send({ success: false, message: e.message});
    }
};

const deleteTheatre = async (req, res) => {
    try {
        await Theatre.findByIdAndDelete(req.params.theatreId);
        res.send({ success: true, message: "Theatre has been deleted"});
    } catch (e) {
        console.log(e);
        res.send({ success: false, message: e.message});
    }
};

const getAllTheatres = async (req, res) => {
    try {
        const allTheatre =  await Theatre.find().populate("owner");
        res.send({ success: true, message: "All theatre are fetched", data:allTheatre});
    } catch (e) {
        console.log(e);
        res.send({ success: false, message: e.message});
    }
};

const getAllTheatresByOwner = async (req, res) => {
    try {
        const allTheatre =  await Theatre.find({owner:req.params.ownerId});
        res.send({ success: true, message: "All theatre are fetched", data:allTheatre});
    } catch (e) {
        console.log(e);
        res.send({ success: false, message: e.message});
    }
};

module.exports = { addTheatre, updateTheatre, deleteTheatre, getAllTheatres, getAllTheatresByOwner};