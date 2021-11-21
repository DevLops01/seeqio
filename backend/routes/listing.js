const express = require("express");
const router = new express.Router();
const multer = require("multer");
const auth = require("../middleware/auth");
const {
  recent,
  create,
  listingById,
  clientListings,
  draft,
  getDraft,
} = require("../controllers/listing");

const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "");
  },
});

const upload = multer({ storage }).array("file");

// @route   POST api/listing/recent
// @desc    Show matching listings
// @access  Private
router.post("/recent", auth, recent);

// @route   GET api/listing/:id
// @desc    get single listings
// @access  Private
router.get("/:id", auth, listingById);

// @route   POST api/listing/draft
// @desc    save draft
// @access  Private
router.post("/draft", auth, upload, draft);

// @route   GET api/listing/draft/:id
// @desc    get draft
// @access  Private
router.get("/draft/:id", auth, getDraft);

// @route   POST api/listing/create
// @desc    create new job listing
// @access  Private
router.post("/create", auth, upload, create);

// @route   POST api/listing/edit/:id
// @desc    Edit job listing
// @access  Private
router.post("/edit/:id", auth, upload, create);

// @route   GET api/listing/client/recent
// @desc    returns recent listings created by a client user
// @access  Private
router.get("/client/recent", auth, clientListings);

module.exports = router;
