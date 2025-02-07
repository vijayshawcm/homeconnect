// Bcrypt for password hashing
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const AWS = require("aws-sdk");
require("dotenv").config();

// Set AWS Region
AWS.config.update({region: "ap-southeast-1"});

// Function to generate random integer
function randInt(min, max) {
  return Math.floor(Math.random() * (max-min) + min);
}

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
  res.clearCookie("JWTAuth");
  res.cookie("JWTAuth", token, { httpOnly: true });
}

// Send OTP
const sendOTP = async (req, res) => {
  var otp = randInt(100000,999999);
  console.log("New OTP generated: " + otp);

  var params = {
    Message: "Your HomeConnect verification code is: " + otp,
    PhoneNumber: req.body.phoneNum
  }

  try {
    await new AWS.SNS({apiVersion: '2010-03-31'})
      .publish(params)
      .promise()

    console.log("otp sent successfully")

    // Store OTP in cookies to be validated (probably wanna hash this)
    res.clearCookie("OTP");
    res.cookie("OTP", otp, { maxAge: 300000, httpOnly: true });
    console.log("new otp stored in cookie");

    return res
    .status(200)
    .send("otp sent!");

  } catch (err) {
    return res
      .status(500)
      .send(err);
  }
}

const verifyOTP = async (req, res) => {
  if(req.body.OTP == req.cookies["OTP"]) {

    res.clearCookie("OTP")
    console.log("otp gone");

    return res
    .status(200)
    .send("otp verified!");
  } 

  return res
    .status(401)
    .send("invalid otp");
}

const secretPage = async (req, res) => {
  const token = req.cookies["JWTAuth"];
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

module.exports = { secretPage, registerUser, loginUser, logoutUser, sendOTP, verifyOTP };