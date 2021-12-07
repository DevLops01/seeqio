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

    const listings = await Listing.find({ isDraft: false })
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
    const listing = await Listing.findOne({ uuid: req.params.id });

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
    const listings = await Listing.find({
      creator: req.user.id,
      isDraft: false,
    })
      .sort({
        createdAt: "desc",
      })
      .limit(parseInt(req.params.limit));

    if (listings) {
      return res.status(200).send(listings);
    }

    return res.status(404).send("Listing not found");
  } catch (e) {
    console.log(e);
    return res.status(404).send("Listings not found");
  }
};

// @route   GET api/listing/client/recent/drafts
// @desc    returns recent listings created by a client user
// @access  Private
exports.clientDraftListings = async (req, res) => {
  try {
    const listings = await Listing.find({ creator: req.user.id, isDraft: true })
      .sort({
        createdAt: "desc",
      })
      .limit(parseInt(req.params.limit));

    if (listings) {
      return res.status(200).send(listings);
    }

    return res.status(404).send("Listing not found");
  } catch (e) {
    console.log(e);
    return res.status(404).send("Listings not found");
  }
};

// @route   POST api/listing/draft
// @desc    save draft
// @access  Private
exports.draft = async (req, res) => {
  try {
    const user = await User.findOne({ uuid: req.user.id });

    if (!user) {
      return res
        .status(401)
        .send("You must be logged in to submit a job listing.");
    }

    if (user.type !== "client") {
      console.log(req.user);
      return res.status(401).send("Only client accounts can create listings");
    }

    const id = uuidv4();

    const skillList = req.body.skills;

    const getEach = skillList.split(",");

    const draft = new Listing({
      creator: req.body.creator,
      title: req.body.title,
      category: req.body.category,
      payType: req.body.payType.toLowerCase(),
      payRate: req.body.budget,
      description: req.body.description,
      experienceLevel: "expert",
      startDate: Date.now(), // change
      endDate: Date.now(), // change
      requiredSkills: getEach,
      jobDuration: "1-3 months",
      tokensRequired: 4,
      funded: true,
      openings: 1,
      isDraft: true,
      uuid: id,
    });

    await draft.save();

    return res.send({ id });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error");
  }
};

// @route   GET api/listing/draft/:id
// @desc    get single listings
// @access  Private
exports.getDraft = async (req, res) => {
  try {
    const listing = await Listing.findOne({
      uuid: req.params.id,
      creator: req.user.id,
    });

    if (listing) {
      return res.status(200).send(listing);
    }

    return res.status(404).send("Listing not found");
  } catch (e) {
    console.log(e);
    return res.status(404).send("Listing not found");
  }
};

// @route   POST api/listing/create
// @desc    create new job listing
// @access  Private
exports.create = async (req, res) => {
  try {
    const user = await User.findOne({ uuid: req.user.id });

    if (!user) {
      return res
        .status(401)
        .send("You must be logged in to submit a job listing.");
    }

    if (user.type !== "client") {
      console.log(req.user);
      return res.status(401).send("Only client accounts can create listings");
    }

    const allFieldsCompleted = Object.values(req.body).every(
      (field) => field.length > 0
    );

    if (!allFieldsCompleted) {
      return res.status(400).send("All fields are required");
    }

    const listing = await new Listing({
      creator: req.body.creator,
      title: req.body.title,
      category: req.body.category,
      payType: req.body.payType.toLowerCase(),
      payRate: req.body.budget,
      description: req.body.description,
      experienceLevel: req.body.experience.toLowerCase(),
      requiredSkills: req.body.skills.split(","),
      jobDuration: req.body.length,
      tokensRequired: 2,
      funded: true,
      openings: req.body.openings,
      uuid: uuidv4(),
      isDraft: false,
    });

    await listing.save();

    res.status(200).send("Listing posted");
  } catch (e) {
    console.log(e);
    res.status(500).send("Error");
  }
};
