const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const generateToken = require('../utils/generateToken');

//* User registration
exports.register = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  //! register new user
  const newUser = await User.create({
    username,
    email,
    password,
  });

  res.status(201).json({
    status: 'success',
    data: {
      message: 'User created successfully',
      _id: newUser?._id,
      username: newUser?.username,
      email: newUser?.email,
      role: newUser?.role,
    },
  });
});

//* User login
exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  //! check if username and password are in the request
  if (!username || !password) {
    return next(new AppError('Please provide username and password', 400));
  }

  //! check if user exists and password is correct in db
  const user = await User.findOne({ username }).select('+password');

  //? calling instance method correctPassword to validate password
  if (!user || !(await user.correctPassword(password))) {
    return next(new AppError('Invalid user credentials', 401));
  }

  //? calling instance method updateLastLogin to update last login
  await user.updateLastLogin();

  //! generate token
  const token = generateToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      message: 'User logged in successfully',
      _id: user?._id,
      username: user?.username,
      email: user?.email,
      role: user?.role,
    },
  });
});

//* User profile
exports.getProfile = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  const user = await User.findById(_id);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
