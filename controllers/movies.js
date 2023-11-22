const movieCardModel = require("../models/movie");
const httpCode = require("../utils/httpCode");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");

const getMovieCards = (req, res, next) => {
  const owner = req.user._id;
  movieCardModel
    .find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovieCard = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  movieCardModel
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Невозможно создать карточку с фильмом"));
        return;
      }
      next(err);
    });
};

const deleteMovieCardById = (req, res, next) => {
  movieCardModel
    .findById(req.params.movieId)
    .orFail(() => new NotFoundError("Фильма с таким id не существует"))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenError("Нельзя удалить чужую карточку с фильмом"));
        return;
      }
      movieCardModel
        .deleteOne({ _id: movie._id })
        .then(() => res
          .status(httpCode.OK_REQUEST)
          .send({ message: "Карточка с фильмом удалена" }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Удаление фильма с неверным id"));
        return;
      }
      if (err.message === "NotFound") {
        next(new NotFoundError("Фильм с указанным id не найден"));
        return;
      }
      next(err);
    });
};

module.exports = {
  createMovieCard,
  getMovieCards,
  deleteMovieCardById,
};
