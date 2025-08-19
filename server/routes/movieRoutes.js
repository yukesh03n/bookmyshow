const express = require("express");
const { addMovie, getAllMovies, updateMovie, deleteMovie, getMovieById } = require("../controllers/movieController");
const auth = require("../middleware/authMiddleware");

const movieRouter = express.Router();

movieRouter.post("/add-movie", auth, addMovie);
movieRouter.get("/get-all-movies", auth, getAllMovies);
movieRouter.put("/update-movie", auth, updateMovie);
movieRouter.put("/delete-movie", auth, deleteMovie);
movieRouter.get("/movie/:id", auth, getMovieById);


module.exports = movieRouter;