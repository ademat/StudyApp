const express = require('express');
const {
  getUsers, getSingleUser, updateUser, deleteUser, createUser,
} = require('../controllers/users');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/').get(protect, getUsers).post(protect, createUser);
router.route('/:id').get(protect, getSingleUser).put(protect, updateUser).delete(protect, deleteUser);

module.exports = router;
