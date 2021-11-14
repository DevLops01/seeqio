const { User, clientSchema, freelancerSchema } = require("../models/User");
const Skill = require("../models/Skill");
const Category = require("../models/Category");
const { v4: uuidv4 } = require("uuid");

exports.createSkill = async (req, res) => {
  try {
    const skill = new Skill({
      title: req.body.title,
      category: req.body.category,
      uuid: uuidv4(),
    });

    await skill.save();

    res.status(200).send(skill);
  } catch (e) {
    console.log(e);
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = new Category({
      title: req.body.title,
      uuid: uuidv4(),
    });

    await category.save();

    res.status(200).send(category);
  } catch (e) {
    console.log(e);
  }
};
