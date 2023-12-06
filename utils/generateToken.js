const JWT = require('jsonwebtoken');

const generateToken = (id) => {
  const payload = {
    user: {
      id,
    },
  };

  return JWT.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = generateToken;
