const createHttpError = require("http-errors");

const errorHandler = {
  handleBadRequest: (message) => {
    throw new createHttpError.BadRequest(message);
  },

  handleInternalServerError: (message) => {
    throw new createHttpError.InternalServerError(message);
  },

  handleNotFound: (message, data) => {
    const status = 404;
    throw new createHttpError.NotFound({
      message,
      status,
      data,
    });
  },

  handleClientError: (message, status, data) => {
    throw new createHttpError(status, {
      message,
      status,
      data,
    });
  },
};

module.exports = errorHandler;
