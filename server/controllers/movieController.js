const Movie = require("../models/movieModel");

const addMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.send({ success: true, message: "New Movie has been added" });
    } catch (e) {
        console.log(e);
        res.send({ success: false, message: e.message });
    }
};

const getAllMovies = async (req, res) => {
    try {
        const allMovies = await Movie.find();
        res.send({ success: true, message: "All movies are fetched", data: allMovies });
    } catch (e) {
        console.log(e);
        res.send({ success: false, message: e.message });
    }
};

const updateMovie = async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(req.body.movieId, req.body);
        res.send({ success: true, message: "Movie has been updated" });
    } catch (e) {
        console.log(e);
        res.send({ success: false, message: e.message });
    }
};

const deleteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.body.movieId);
        res.send({ success: true, message: "Movie has been deleted" });
    } catch (e) {
        console.log(e);
        res.send({ success: false, message: e.message });
    }
};

const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.send({
            success: true,
            message: "Movie fetched successfully!",
            data: movie,
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
};

module.exports = { addMovie, getAllMovies, updateMovie, deleteMovie, getMovieById };