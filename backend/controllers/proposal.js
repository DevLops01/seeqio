const { User } = require("../models/User");
const Proposal = require("../models/Proposal");
const Listing = require("../models/Listing");
const Milestone = require("../models/Milestone");
const { v4: uuidv4 } = require("uuid");

exports.create = async (req, res) => {
  try {
    const milestones = req.body.milestones;

    const files = [];

    req.files.forEach((file) => {
      let mimeType = file.originalname.split(".");

      mimeType = mimeType[mimeType.length - 1];

      if (mimeType === "exe") return false;

      file.id = `${uuidv4()}.${mimeType}`;

      files.push(file);
    });

    if (Array.isArray(milestones)) {
      milestones.map(async (entry) => {
        console.log(JSON.parse(entry));
        // const milestone = await new Milestone({
        // });
      });
    } else {
      console.log(milestones);
    }

    const listing = await Listing.findOne({ uuid: req.body.listing });

    if (!listing) {
      return res.status(404).send("Listing not found");
    }

    if (listing.proposals.includes(req.body.creator)) {
      console.log("already proposed");
      return res
        .status(500)
        .send("Proposal already submitted for this listing.");
    }

    listing.proposals.push(req.body.creator);
    await listing.save();

    const proposal = await new Proposal({
      creator: req.body.creator,
      coverLetter: req.body.coverLetter,
    });

    return res.status(200).send("Created");
  } catch (e) {
    console.log(e);
    return res.status(404).send("Listing not found");
  }
};
