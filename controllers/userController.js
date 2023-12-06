const User = require('../models/userModel');

//* User registration
exports.register = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: error?.message,
    });
  }
};

exports.login = async (req, res) => [
  res.status(200).json({
    status: 'success',
    data: {
      message: 'User logged in successfully',
    },
  }),
];
