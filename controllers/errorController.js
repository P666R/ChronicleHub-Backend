//* Development mode error
const sendDevError = (err, res) => {
  //! Send response back with full error details
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

//* Production mode error
const sendProdError = (err, res) => {
  //! operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //! programming or other unknown error, dont leak to client
    //? 1) Log error
    console.error('Production error: ', err);

    //? 2) Send generic message
    res.status(500).json({
      status: 'Error',
      message: 'Something went wrong',
    });
  }
};

//* Error handling MW
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';

  if (process.env.NODE_ENV === 'development') {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendProdError(err, res);
  }
};
