const express = require("express");
const { addShow, deleteShow, updateShow, getAllShowsByTheatre, getAllTheatresByMovie, getShowById } = require("../controllers/showController");
const auth = require("../middleware/authMiddleware");

const showRouter = express.Router();

showRouter.post("/add-show", auth, addShow);
showRouter.post("/delete-show", auth, deleteShow);
showRouter.put("/update-show", auth, updateShow);
showRouter.post("/get-all-shows-by-theatre", auth, getAllShowsByTheatre);
showRouter.post("/get-all-theatres-by-movie", auth, getAllTheatresByMovie);
showRouter.post("/get-show-by-id", auth, getShowById);

module.exports = showRouter;