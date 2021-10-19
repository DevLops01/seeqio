const express = require("express");
const router = new express.Router();
const multer = require("multer");
const { create } = require("../controllers/proposal");
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
router.post("/create", upload, create);

module.exports = router;
