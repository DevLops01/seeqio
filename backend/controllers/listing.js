const { User, clientSchema, freelancerSchema } = require("../models/User");
const Listing = require("../models/Listing");
const { v4: uuidv4 } = require("uuid");

// @route   POST api/listing/recent
// @desc    Show matching listings
// @access  Private
exports.recent = async (req, res) => {
  try {
    const resultsPerPage = 3;
    let page = req.body.page >= 1 ? req.body.page : 1;

    const listings = await Listing.find()
      .sort({ createdAt: "desc" })
      .limit(resultsPerPage * page);
    // .skip(resultsPerPage * page);

    res.status(200).send(listings);
  } catch (e) {
    console.log(e);
  }
};

// @route   GET api/listing/:id
// @desc    get single listings
// @access  Private
exports.listingById = async (req, res) => {
  try {
    const listing = await Listing.find({ uuid: req.params.id });

    if (listing) {
      return res.status(200).send(listing);
    }

    return res.status(404).send("Listing not found");
  } catch (e) {
    console.log(e);
    return res.status(404).send("Listing not found");
  }
};

// @route   GET api/listing/client/recent
// @desc    returns recent listings created by a client user
// @access  Private
exports.clientListings = async (req, res) => {
  try {
    const listings = await Listing.find({ creator: req.user.id });

    if (listings) {
      return res.status(200).send(listings);
    }

    return res.status(404).send("Listing not found");
  } catch (e) {
    console.log(e);
    return res.status(404).send("Listings not found");
  }
};

// @route   POST api/listing/create
// @desc    create new job listing
// @access  Private
exports.create = async (req, res) => {
  try {
    const {
      creator,
      title,
      clientRating,
      payType,
      payRate,
      description,
      proposals,
      experienceLevel,
      startDate,
      endDate,
      requiredSkills,
      jobDuration,
      tokensRequired,
      funded,
      openings,
      hires,
    } = req.body;

    const listing = await new Listing({
      creator,
      title,
      clientRating,
      payType,
      payRate,
      description,
      proposals,
      experienceLevel,
      startDate,
      endDate,
      requiredSkills,
      jobDuration,
      tokensRequired,
      funded,
      openings,
      hires,
      uuid: uuidv4(),
    });

    await listing.save();

    res.status(200).send("ping");
  } catch (e) {
    console.log(e);
    res.status(500).send("Error");
  }
};
