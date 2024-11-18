const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {type:String, required: true},
    description: {type:String, required: true},
    duration: {type:String, required: true},
    genre: {type:String, required: true},
    releaseDate: {type:String, required: true},
    language: {type:String, required: true},
    poster: {type:String, required: true},
});

const Movies = mongoose.model("movies", movieSchema);

module.exports = Movies;