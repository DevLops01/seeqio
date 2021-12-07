const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, clientSchema, freelancerSchema } = require("../models/User");

// @route   POST api/user/register
// @desc    Creates new user
// @access  Public
exports.register = async (req, res) => {
  try {
    const { accountType, email, firstName, lastName, password } = req.body;

    switch (true) {
      case accountType === "isFreelancer":
        const freelancer = new freelancerSchema({
          email,
          firstName,
          lastName,
          password,
          uuid: uuidv4(),
        });

        await freelancer.save();
        return res.status(200).send({ message: "worked" });

      case accountType === "isClient":
        const client = new clientSchema({
          email,
          firstName,
          lastName,
          password,
          uuid: uuidv4(),
        });

        await client.save();
        return res.status(200).send({ message: "worked" });

      default:
        return res.status(500).send({ message: "Could not create account." });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e });
  }
};

// @route   POST api/user/login
// @desc    Login user
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Get user
    await User.findOne({
      email,
    }).then((user) => {
      // if user doesn't exist send error
      if (!user) return res.status(400).send({ error: "User does not exist" });

      // if user exist, check that password matches database
      bcrypt.compare(password, user.password).then((isMatch) => {
        // if password does not match send error
        if (!isMatch) {
          return res.status(400).send({ error: "InvalidCredentials" });
        }

        // if password matches sign a new JWT token
        jwt.sign(
          {
            // set the payload as user's uuid
            id: user.uuid,
          },
          process.env.jwtsecret,
          //  set expiration to 1 hour
          { expiresIn: "12h" },
          (err, token) => {
            if (err) {
              return res.status(400).send({ error: "InvalidCredentials" });
            }
            // send user data and token to client
            res.cookie("token", token);
            return res.status(200).send({
              token,
              user: {
                uuid: user.uuid,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                hourlyRate: user.hourlyRate,
                updatedAt: user.updatedAt,
                type: user.type,
              },
            });
          }
        );
      });
    });
  } catch (e) {
    return res.status(404).send({ error: "user not found" });
  }
};

// @route   POST api/user/logout
// @desc    Logout user
// @access  Private
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.end();
  } catch (e) {
    return res.status(404).send({ error: "user not found" });
  }
};

// @route   POST api/user/
// @desc    returns the logged in user
// @access  Private
exports.user = async (req, res) => {
  try {
    const user = await User.findOne(
      { uuid: req.user.id },
      { password: 0, _id: 0, __v: 0, createdAt: 0 }
    );

    if (user) {
      return res.status(200).send(user);
    }
  } catch (e) {
    return res.status(404).send({ error: "user not found" });
  }
};

// @route   GET api/user/:id
// @desc    returns the specified user
// @access  Private
exports.userById = async (req, res) => {
  try {
    const user = await User.findOne({ uuid: req.params.id });

    if (!user) {
      return res.status(404).send("user not found");
    }

    res.status(200).send(user);
  } catch (e) {
    return res.status(404).send({ error: "user not found" });
  }
};
