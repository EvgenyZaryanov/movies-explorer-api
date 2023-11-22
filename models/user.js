const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const isEmail = require("validator/lib/isEmail");

const UnauthorizedError = require("../errors/UnauthorizedError");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => isEmail(email),
        message: "Некорректный адрес эл.почты",
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  {
    toJSON: { useProjection: true },
    toObject: { useProjection: true },
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function findOne(email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError("Неверные почта или пароль"),
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError("Неверные почта или пароль"),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
