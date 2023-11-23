const { INTERNAL_SERVER_ERROR_500 } = require('../utils/constants');

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INTERNAL_SERVER_ERROR_500;
  }
}

module.exports = InternalServerError;
