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

//* User login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    //! check if username and password are in the request
    if (!username || !password) {
      throw new Error('Please provide username and password 400');
    }

    //! check if user exists and password is correct in db
    const user = await User.findOne({ username }).select('+password');

    //! calling instance method correctPassword to validate password
    if (!user || !(await user.correctPassword(password))) {
      throw new Error('Invalid login credentials 401');
    }

    //! calling instance method updateLastLogin to update last login
    await user.updateLastLogin();

    res.status(200).json({
      status: 'success',
      data: {
        message: 'User logged in successfully',
        user,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: error?.message,
    });
  }
};
