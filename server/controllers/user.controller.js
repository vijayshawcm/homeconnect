// Bcrypt for password hashing
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Set up email transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: "homeconnect.hwu@gmail.com",
      pass: process.env.EMAIL_PASSWORD
  }
});

// Function to generate random integer
function randInt(min, max) {
  return Math.floor(Math.random() * (max-min) + min);
}

// JSON Web Token functions
const jwtSecret = process.env.JWT_SECRET;
async function generateJWT(res, user) {
  let data = {
    user,
    login: true,
  };

  // Create JWT
  const token = jwt.sign(data, jwtSecret);
  console.log("New json token was created.");

  // Save JWT in browser cookies
  res.clearCookie("JWTAuth");
  res.cookie("JWTAuth", token, { httpOnly: true });
}

// Send OTP to provided email
const sendOTP = async (req, res) => {
  var otp = randInt(100000,999999);
  console.log("New OTP generated: " + otp);

  const mailOptions = {
    from: {
      name: "HomeConnect",
      address: "homeconnect.hwu@gmail.com",
    },

    to: req.body.email,
    subject: "HomeConnect Email Verification",
    text: "Your HomeConnect verification code is: " + otp,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
      return res
      .status(500)
      .send(err);
    } else {
      console.log("Email sent: ", info.response);
    }
  });

  // Store OTP in cookies to be validated (probably wanna hash this)
  res.clearCookie("OTP");
  res.cookie("OTP", otp, { maxAge: 300000, httpOnly: true });
  console.log("new otp stored in cookie");

  return res
  .status(200)
  .send("otp sent!");
}

// TODO: hash with bcrypt in abit im kinda lazy rn
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

// Check if a user is currently authenticated to the system
const loginStatus = async (req, res) => {
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
    return res.status(200).send("Authenticated to system");
  }

  return res
    .status(401)
    .send(
      "Unauthorised access, please create or sign in to an existing account."
    );
};

// Registers user
const registerUser = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      passwordHash: req.body.password,
    });

    generateJWT(res, user); // Generate JWT for user and save in cookie
    return res.status(200).send("Account created");
  } catch (err) {
    return res.status(500).send("Internal Server Error.");
  }
};

// TODO: make sign ins work with email too
const loginUser = async (req, res) => {
  // Check if user exists
  const validUser = await User.findOne({ username: req.body.usernameOrEmail });
  if (!validUser) {
    return res.status(401).json("Invalid credentials!");
  }

  // Check if password hash matches
  const validPassword = await bcrypt.compare(
    req.body.password,
    validUser.passwordHash
  );
  if (!validPassword) {
    return res.status(401).json("Invalid credentials!");
  }

  generateJWT(res, validUser); // Generate JWT for user and save in cookie
  return res.status(200).json({username: validUser.username});
};

const logoutUser = (req, res) => {
  res.clearCookie("JWT");
  res.send("Logout successful");
};

module.exports = { loginStatus, registerUser, loginUser, logoutUser, sendOTP, verifyOTP };