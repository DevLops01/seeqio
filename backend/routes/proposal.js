const express = require("express");
const router = new express.Router();
const multer = require("multer");
const { create, retrieveAll } = require("../controllers/proposal");
const auth = require("../middleware/auth");

const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "");
  },
});

const upload = multer({ storage }).array("file");

// @route   POST api/proposal/create
// @desc    creates proposal
// @access  Private
router.post("/create", auth, upload, create);

// @route   GET api/proposal/retrieve/
// @desc    returns all proposals related to a user
// @access  Private
router.get("/retrieve", auth, upload, retrieveAll);

// @route   GET api/proposal/retrieve/:id
// @desc    returns a single proposal related to a user
// @access  Private
router.get("/retrieve/:id", auth, upload, create);

module.exports = router;
