const { User } = require("../models/User");
const Proposal = require("../models/Proposal");
const Listing = require("../models/Listing");
const Milestone = require("../models/Milestone");
const { v4: uuidv4 } = require("uuid");

exports.create = async (req, res) => {
  try {
    const {
      creator,
      listing,
      isByMilestone,
      payType,
      proposalRate,
      coverLetter,
    } = req.body;

    const milestones = req.body.milestones;

    if (Array.isArray(milestones)) {
      milestones.map(async (entry) => {
        console.log(JSON.parse(entry));
        // const milestone = await new Milestone({
        // });
      });
    } else {
      console.log(milestones);
    }

    const proposal = await new Listing({
      creator,
      listing,
    });

    res.status(200).send("Created");
  } catch (e) {
    console.log(e);
  }
};
