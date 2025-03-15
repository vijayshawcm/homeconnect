// Bcrypt for password hashing
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const nodemailer = require("nodemailer");
const { jwtDecode } = require("jwt-decode");
require("dotenv").config();

// Set up email transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "homeconnect.hwu@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to generate random integer
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// JSON Web Token functions
const jwtSecret = process.env.JWT_SECRET;
async function generateJWT(res, user) {
  let data = {
    username: user.username,
    loggedIn: true,
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
  var otp = randInt(100000, 999999);
  console.log("New OTP generated: " + otp);

  // Set up mail information
  const mailOptions = {
    from: {
      name: "HomeConnect",
      address: "homeconnect.hwu@gmail.com",
    },

    to: req.body.email,
    subject: "HomeConnect Email Verification",
    text: "Your HomeConnect verification code is: " + otp,
  };

  // Send mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
      return res.status(500).json(err);
    } else {
      console.log("Email sent: ", info.response);
    }
  });

  // Store OTP in cookies to be validated
  const otpHash = await bcrypt.hash(otp.toString(), 10);
  res.clearCookie("OTP");
  res.cookie("OTP", otpHash, { maxAge: 300000, httpOnly: true });
  console.log("new otp stored in cookie");

  return res.status(200).json("otp sent!");
};

// Verify OTP
const verifyOTP = async (req, res) => {
  try {
    const validOTP = await bcrypt.compare(req.body.OTP, req.cookies["OTP"]);

    if (validOTP) {
      res.clearCookie("OTP");
      console.log("otp gone");

      return res.status(200).json("otp verified!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }

  return res.status(401).json("invalid otp");
};

// Check if a user is currently authenticated to the system
// TODO: maybe check database for existence of user too
const loginStatus = async (req, res) => {
  const token = req.cookies["JWTAuth"];
  console.log(token);

  if (!token) {
    return res
      .status(401)
      .json(
        "Unauthorised access, please create or sign in to an existing account."
      );
  }

  try {
    const verifyToken = jwt.verify(token, jwtSecret);

    if (verifyToken) {
      const decodedToken = jwtDecode(token);
      const user = await User.findOne({ username: decodedToken.username}); // Query user again to prevent storing sensitive data in jwt.
      const response = {
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        aboutMe: user.aboutMe,
        location: user.location,
        loggedIn: true
      }
      return res.status(200).json(response);
    }
  } catch (err) {
    return res.status(401).json(err.message);
  }

  return res
    .status(401)
    .json(
      "Unauthorised access, please create or sign in t an existing account."
    );
};

// Change user password
const modifyPassword = async (req, res) => {
  const validUser = await User.findOneAndUpdate({ email: req.body.email }, { passwordHash: req.body.password });

  if(!validUser) {
    return res.status(500).json("How did you even get past OTP verification?");
  }
  
  return res.status(200).json("Password updated successfully.");
};

// Registers user
const registerUser = async (req, res) => {
  /* 
  TODO: Probably should check for this before proceeding to otp page i guess 
  I know this is super spaghetti rn just bear with me here
  It'll work for now
  */
  if(await User.findOne({ email: req.body.email }) || await User.findOne({ username: req.body.username })) {
    return res.status(409).json("Account or Email has already been registered!") // Woah 409 code!
  }

  try {
    const user = await User.create({
      username: req.body.username,
      displayName: req.body.displayName,
      email: req.body.email,
      passwordHash: req.body.password,
    });

    generateJWT(res, user); // Generate JWT for user and save in cookie
    return res.status(200).json("Account created");
  } catch (err) {
    return res.status(500).json("Internal Server Error.");
  }
};

// TODO: make sign ins work with email too
const loginUser = async (req, res) => {
  // Check if user exists
  const validUser = await User.findOne({
    username_lower: req.body.usernameOrEmail.toLowerCase(),
  });
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
  return res.status(200).json("Authenticated to system");
};

const logoutUser = (req, res) => {
  res.clearCookie("JWTAuth");
  res.json("Logout successful");
};

module.exports = { loginStatus, registerUser, loginUser, logoutUser, sendOTP, verifyOTP, modifyPassword };