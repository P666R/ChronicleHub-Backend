//* User registration
exports.register = async (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      message: 'User registered successfully',
    },
  });
};
