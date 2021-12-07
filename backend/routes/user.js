const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const {
  register,
  login,
  logout,
  user,
  userById,
} = require("../controllers/user");

// @route   POST api/user/
// @desc    returns the logged in user
// @access  Private
router.post("/", auth, user);

// @route   GET api/user/:id
// @desc    returns the specified user
// @access  Private
router.get("/:id", userById);

// @route   POST api/user/register
// @desc    Creates new user
// @access  Public
router.post("/register", register);

// @route   POST api/user/login
// @desc    Login user
// @access  Public
router.post("/login", login);

// @route   POST api/user/logout
// @desc    Logout user
// @access  Private
router.post("/logout", auth, logout);

module.exports = router;
