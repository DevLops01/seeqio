const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    //  check for token
    if (!token) {
      res.clearCookie("token");
      return res.status(504).send({ authError: "Access denied" });
    }

    //  Verify token
    req.user = jwt.verify(token, process.env.jwtsecret);

    if (req.user) {
      // Send a new Token
      jwt.sign(
        {
          // set the payload as user's uuid
          id: req.user.id,
        },
        process.env.jwtsecret,
        //  set expiration to 1 hour
        { expiresIn: "12h" },
        (err, token) => {
          if (err) {
            return res.status(400).send({ error: "Invalid Credentials" });
          }
          // send user data and token to client
          res.cookie("token", token);
        }
      );
    }
    // Continue to next middleware
    next();
  } catch (e) {
    res.clearCookie("token");
    return res.status(504).send({ authError: "Access denied" });
  }
};

module.exports = auth;
