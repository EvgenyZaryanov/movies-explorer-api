const { celebrate, Joi } = require("celebrate");

const movieCardDataValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/https?:\/\/w{0,3}\.?[\w0-9-]{1,10}\.\w{2,3}[\w\d\-._~:/?#[\]@!$&'()*+,;=]{0,}/m),
    trailerLink: Joi.string().required().pattern(/https?:\/\/w{0,3}\.?[\w0-9-]{1,10}\.\w{2,3}[\w\d\-._~:/?#[\]@!$&'()*+,;=]{0,}/m),
    thumbnail: Joi.string().required().pattern(/https?:\/\/w{0,3}\.?[\w0-9-]{1,10}\.\w{2,3}[\w\d\-._~:/?#[\]@!$&'()*+,;=]{0,}/m),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieCardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  movieCardDataValidator,
  movieCardIdValidator,
};
