const { Home } = require("../models");

const createHome = async (req, res) => {
  const home = req.body;

  const newHome = new Home(home);

  try {
    await newHome.save();
    res.status(201).json({ success: true, data: newHome });
  } catch (error) {
    console.error("Error in creating home: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  createHome,
};
