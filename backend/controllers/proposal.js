const { User } = require("../models/User");
const Proposal = require("../models/Proposal");
const Listing = require("../models/Listing");
const Attachment = require("../models/Attachment");
const Milestone = require("../models/Milestone");
const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
  region: process.env.AWS_REGION,
});

// s3.getSignedUrl(
//   "getObject",
//   {
//     Bucket: process.env.AWS_BUCKET,
//     Key: file.id,
//     Expires: 60 * 24 * 7,
//   },
//   (err, data) => {
//     console.log(data);
//   }
// );

// @route   POST api/proposal/create
// @desc    creates proposal
// @access  Private
exports.create = async (req, res) => {
  try {
    const listing = await Listing.findOne({ uuid: req.body.listing });
    const user = await User.findOne({ uuid: req.user.id });

    if (!user) {
      return res.status(401).send("You must be logged in.");
    }

    if (!listing) {
      return res.status(404).send("Listing not found.");
    }

    const alreadySubmitted = await Proposal.findOne({
      creator: req.user.id,
      listing: listing.uuid,
    });

    if (alreadySubmitted) {
      console.log("already submitted");
      return res
        .status(401)
        .send("Proposal already submitted for this listing.");
    }

    const proposal = await new Proposal({
      creator: req.body.creator,
      coverLetter: req.body.coverLetter,
      listing: listing.uuid,
      listingOwner: listing.creator,
      isByMilestone: req.body.isByMilestone,
      proposalRate: req.body.proposalRate,
      uuid: uuidv4(),
    });

    user.proposals.push({
      listingTitle: listing.title,
      listingId: listing.uuid,
      uuid: proposal.uuid,
    });

    await proposal.save();
    await user.save();

    if (!proposal) {
      console.log("Proposal error");
      return res.status(500).send("Error submitting proposal");
    }

    // If the submitted proposal is to be paid by milestone and not 'on completion'
    if (req.body.isByMilestone === true && listing.payType === "fixed") {
      try {
        let milestones = req.body.milestones;

        // Check if milestones are an array
        if (Array.isArray(milestones)) {
          // Convert each milestone in the array to an object and push to milestoneList
          await milestones.forEach((milestone) => {
            milestone = JSON.parse(milestone);

            const ms = new Milestone({
              creator: req.user.id,
              client: listing.creator,
              listing: listing.uuid,
              proposal: proposal.uuid,
              title: milestone.title,
              endDate: milestone.completionDate,
              amount: milestone.amount,
              uuid: uuidv4(),
            });
            ms.save();
          });
        } else {
          // If there's only a single milestone convert it to an ojbect and push to milestoneList
          milestones = JSON.parse(milestones);

          const ms = new Milestone({
            creator: req.user.id,
            client: listing.creator,
            listing: listing.uuid,
            proposal: proposal.uuid,
            title: milestones.title,
            endDate: milestones.completionDate,
            amount: milestones.amount,
            uuid: uuidv4(),
          });

          ms.save();
        }
      } catch (e) {
        console.log(e);
        return res.status(500).send("Milestones could not be added.");
      }
    }

    // Check files for mimetype and upload to aws if valid
    let attachments = [];

    await req.files.forEach((file) => {
      let mimeType = file.originalname.split(".");

      mimeType = mimeType[mimeType.length - 1];

      if (mimeType === "exe") return false;

      if (file.size > 26214400) return false;

      file.id = `${uuidv4()}.${mimeType}`;

      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: file.id,
        Body: file.buffer,
      };

      s3.upload(params, (err, data) => {
        if (err) return console.log(err);
      });

      const attach = new Attachment({
        originalName: file.originalname.replace(/\s/g, "_"),
        keyId: file.id,
        creator: req.user.id,
        listing: listing.uuid,
        uuid: uuidv4(),
      });

      attach.save();
    });

    listing.proposals.push({
      freelancer: req.user.id,
      proposalId: proposal.uuid,
    });

    await listing.save();
    return res.status(200).send();
  } catch (e) {
    console.log(e);
    return res.status(404).send("Listing not found");
  }
};

// @route   GET api/proposal/retrieve/
// @desc    returns all proposals related to a user
// @access  Private
exports.retrieveAll = async (req, res) => {
  try {
    const proposals = await Proposal.find({ creator: req.user.id });

    if (!proposals) {
      return res.status(404).send("No proposals found");
    }

    return res.status(200).send({ proposals });
  } catch (e) {
    console.log(e);
    return res.status(404).send("Proposal not found");
  }
};
