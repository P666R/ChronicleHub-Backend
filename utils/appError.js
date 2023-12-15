class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'Fail' : 'Error';
    this.isOperational = true;

    //* Create stack property on the object
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
