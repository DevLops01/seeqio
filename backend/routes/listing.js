const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const {
  recent,
  create,
  listingById,
  clientListings,
} = require("../controllers/listing");

// @route   POST api/listing/recent
// @desc    Show matching listings
// @access  Private
router.post("/recent", auth, recent);

// @route   GET api/listing/:id
// @desc    get single listings
// @access  Private
router.get("/:id", auth, listingById);

// @route   POST api/listing/create
// @desc    create new job listing
// @access  Private
router.post("/create", auth, create);

// @route   GET api/listing/client/recent
// @desc    returns recent listings created by a client user
// @access  Private
router.get("/client/recent", auth, clientListings);

module.exports = router;
