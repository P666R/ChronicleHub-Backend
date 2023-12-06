const JWT = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const isloggedin = catchAsync(async (req, res, next) => {
  //! get token from header
  const token =
    req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
      ? req.headers.authorization.split(' ')[1]
      : null;

  if (!token) {
    return next(new AppError('You are not logged in, please login', 401));
  }

  //! verify the token
  const decoded = await promisify(JWT.verify)(
    token,
    process.env.JWT_SECRET,
  ).catch(() => false);

  if (!decoded) {
    return next(new AppError('Invalid token, please login again', 401));
  }

  //! check if user exists
  const currentUser = await User.findById(decoded.user.id).select(
    'username email role _id',
  );

  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists', 401),
    );
  }

  //! save the user in the request object
  req.user = currentUser;

  //! call next middleware
  next();
});

module.exports = isloggedin;
