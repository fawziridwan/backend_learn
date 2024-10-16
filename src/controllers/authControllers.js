const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { handleError, handleSuccess, handleResourceNotFound } = require('../utils/utils');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
        data: userExists,
      });
    }

    const user = new User({
      username,
      email,
      password,
    });

    await user.save();
    return handleSuccess(res, 'User created successfully', user, 201);
  } catch (error) {
    return handleError(res, 500, 'Failed to create user', error);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!req.body.email || !req.body.password) return handleError(res, 400, 'Email or Password are Required')

    if (!user) return handleError(res, 404, 'User not Found')

    const isMatch = await user.matchPassword(password);

    if (!isMatch) return handleError(res, 400, 'Email or Password is Incorrect')

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return handleSuccess(res, 'User logged in successfully', {
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return handleResourceNotFound(res, 'Failed to Login', error);
  }
};

exports.logoutUser = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie('jwt');
        return handleSuccess(res, 'Logged out successfully', null, 200);
      }
    });
  } catch (err) {
    return handleSuccess(res, 'Failed to log out', null, 500);
  }
};

exports.getDashboard = async (req, res) => {
  return handleSuccess(res, 'Welcome User', req.user, 200);
};