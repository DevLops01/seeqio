const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const { categories, skills } = require("../controllers/static");

// @route   GET api/static/categories
// @desc    returns categories
// @access  Private
router.get("/categories", auth, categories);

// @route   GET api/static/skills
// @desc    returns skills
// @access  Private
router.get("/skills/:category", auth, skills);

module.exports = router;
