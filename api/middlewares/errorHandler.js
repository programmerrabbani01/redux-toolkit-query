/**
 * Custom error handler
 * @param {*} error
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

export const errorHandler = (error, req, res, next) => {
  // status code

  const status = res.statusCode ? res.statusCode : 500;

  // error message

  const message = error.message ? error.message : "unknown Error";

  // error response

  res.status(status).json({
    message: message,
    status: status,
    stack: error.stack,
  });
};
