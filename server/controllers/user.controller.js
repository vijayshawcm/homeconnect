// Bcrypt for password hashing
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

// JSON Web Token functions
const jwtSecret = process.env.JWT_SECRET;
async function generateJWT(res, user) {
  let data = {
    time: Date(),
    userId: user._id,
    username: user.username,
  };

  // Create JWT
  const token = jwt.sign(data, jwtSecret);
  console.log("New json token was created.");

  // Save JWT in browser cookies
  // TODO: add cookie kill time probably
  res.clearCookie("JWT");
  res.cookie("JWT", token);
}

const secretPage = async (req, res) => {
  const token = req.cookies["JWT"];
  console.log(token);

  if (!token) {
    return res
      .status(401)
      .send(
        "Unauthorised access, please create or sign in to an existing account."
      );
  }

  const verifyToken = jwt.verify(token, jwtSecret);

  if (verifyToken) {
    return res.send("Authenticated to system");
  }

  return res
    .status(401)
    .send(
      "Unauthorised access, please create or sign in to an existing account."
    );
};

const registerUser = async (req, res) => {
  const passwordHash = await bcrypt.hash(req.body.passwordHash, 10);

  try {
    const user = await User.create({
      username: req.body.username,
      passwordHash: passwordHash,
    });

    generateJWT(res, user); // Generate JWT for user and save in cookie
    return res.status(200).redirect("/server/users/secret");
  } catch (err) {
    return res.status(500).send("Internal Server Error.");
  }
};

//! Note that this passes a message to the ejs part so we might want to handle it differently in the front end
const loginUser = async (req, res) => {
  // Check if user exists
  const validUser = await User.findOne({ username: req.body.username });
  if (!validUser) {
    return res.render("./login", { message: "Invalid username or password!" });
  }

  // Check if password hash matches
  const validPassword = await bcrypt.compare(
    req.body.password,
    validUser.passwordHash
  );
  if (!validPassword) {
    return res.render("./login", { message: "Invalid username or password!" });
  }

  generateJWT(res, validUser); // Generate JWT for user and save in cookie
  return res.redirect("/secret");
};

const logoutUser = (req, res) => {
  res.clearCookie("JWT");
  res.send("Logout successful");
};

module.exports = { secretPage, registerUser, loginUser, logoutUser };
