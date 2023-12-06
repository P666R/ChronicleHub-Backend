const express = require('express');
const userController = require('../controllers/userController');
const isloggedin = require('../middlewares/isLoggedin');

const router = express.Router();

router.route('/register').post(userController.register);
router.route('/login').post(userController.login);

router.route('/profile').get(isloggedin, userController.getProfile);

module.exports = router;
