const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @desc    Get all users
// @url     GET /api/v1/users
// @access  Admin

exports.getUsers = async (req, res, next) => {
  try {
    // Make sure user is authorised to access route
    if (req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to access this route`, 401));
    }

    const users = await User.find().populate('decks');

    res.status(200).json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single user
// @url     GET /api/v1/users/:id
// @access  Admin

exports.getSingleUser = async (req, res, next) => {
  try {
    // Make sure user is authorised to access route
    if (req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to access this route`, 401));
    }

    const user = await User.findById(req.params.id);

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user
// @url     PUT /api/v1/users/:id
// @access  Admin

exports.updateUser = async (req, res, next) => {
  try {
    // Make sure user is authorised to access route
    if (req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to access this route`, 401));
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete user
// @url     DELETE /api/v1/users/:id
// @access  Admin

exports.deleteUser = async (req, res, next) => {
  try {
    // Make sure user is authorised to access route
    if (req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to access this route`, 401));
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: [] });
  } catch (err) {
    next(err);
  }
};

// @desc    Create user
// @url     POST /api/v1/users/
// @access  Admin

exports.createUser = async (req, res, next) => {
  try {
    // Make sure user is authorised to access route
    if (req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to access this route`, 401));
    }

    const user = await User.create(req.body);

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
