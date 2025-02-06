const { User } = require("../models");

const createUser = async (req, res) => {
  const user = req.body;

  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error("Error in creating user: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  createUser,
};
