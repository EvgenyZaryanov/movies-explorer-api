const mongoose = require("mongoose");
const isUrl = require("validator/lib/isURL");

const movieCardSchema = new mongoose.Schema(
  {
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (link) => isUrl(link, { protocols: ["http", "https"], require_protocol: true }),
        message: "Некорректный адрес URL",
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (link) => isUrl(link, { protocols: ["http", "https"], require_protocol: true }),
        message: "Некорректный адрес URL",
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (link) => isUrl(link, { protocols: ["http", "https"], require_protocol: true }),
        message: "Некорректный адрес URL",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model("movie", movieCardSchema);
