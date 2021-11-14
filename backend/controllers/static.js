const Skill = require("../models/Skill");
const Category = require("../models/Category");

// @route   GET api/static/categories
// @desc    returns categories
// @access  Private
exports.categories = async (req, res) => {
  try {
    const categories = await Category.find({});
    console.log(categories);
    if (categories) res.status(200).send(categories);
  } catch (e) {
    console.log(e);
    res.status(404).send("Categories not found");
  }
};

// @route   GET api/static/skills/:category
// @desc    returns skills for specific category
// @access  Private
exports.skills = async (req, res) => {
  try {
    const category = req.params.category;
    const skills = await Skill.find({ category });
    console.log(skills);
    if (skills) res.status(200).send(skills);
  } catch (e) {
    res.status(404).send("Skills not found");
  }
};
