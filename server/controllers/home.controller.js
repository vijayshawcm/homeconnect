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

const getHomes = async (req, res) => {
  try {
    const homes = await Home.find({});
    res.status(200).json({ success: true, data: homes });
  } catch (error) {
    console.log("Error in fetching homes:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }    
};

const getHomesByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const ownedHomes = await Home.find({ owner: id });
    const dwelledHomes = await Home.find({ "dwellers.user": id });
    res.status(200).json({
      success: true,
      data: {
        ownedHomes,
        dwelledHomes,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.log(error.message);
  }
};

const addDweller = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
    }

    // Find the home and update it with the new dweller
    const home = await Home.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          dwellers: { user: userId },
        },
      },
      { new: true }
    ).populate("dwellers.user");

    if (!home) {
      return res.status(404).json({ message: "Home not found" });
    }

    res.status(200).json({ success: true, data: home });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createHome,
  getHomes,
  getHomesByUserId,
  addDweller,
};
