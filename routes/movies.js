const router = require("express").Router();
const {
  createMovieCard,
  getMovieCards,
  deleteMovieCardById,
} = require("../controllers/movies");

const {
  movieCardDataValidator,
  movieCardIdValidator,
} = require("../middlewares/validators/movieCardValidator");

router.get("/", getMovieCards);
router.post("/", movieCardDataValidator, createMovieCard);
router.delete("/:movieId", movieCardIdValidator, deleteMovieCardById);

module.exports = router;
