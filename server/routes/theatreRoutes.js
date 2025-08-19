const { addTheatre, updateTheatre, deleteTheatre, getAllTheatres, getAllTheatresByOwner } = require("../controllers/theatreController");
const express = require("express");
const auth = require("../middleware/authMiddleware");

const theatreRouter = express.Router();

theatreRouter.post("/add-theatre", auth, addTheatre);
theatreRouter.put("/update-theatre", auth, updateTheatre);
theatreRouter.delete("/delete-theatre/:theatreId", auth, deleteTheatre);
theatreRouter.get("/get-all-theatres", auth, getAllTheatres);
theatreRouter.get("/get-all-theatres-by-owner/:ownerId", auth, getAllTheatresByOwner);

module.exports = theatreRouter;