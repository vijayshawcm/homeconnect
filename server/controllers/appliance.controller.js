// I give up making this file shorter

const { checkPermission } = require("./permissions.controller.js");
const mongoose = require("mongoose");
const {
  Room,
  Fan,
  AirConditioner,
  Light,
  Sprinkler,
  Appliance,
  Home,
  User,
  EnergyProfile,
} = require("../models");

var interval;
// Start loop to poll home data every 10 seconds
async function pollHome(home) {
  try {
    const res = await fetch("http://localhost:9797/poll", {
      method: "GET"
    })

    if (res.ok) {
      interval = setInterval(async () => {
        try {
          const res = await fetch("http://localhost:9797/poll", {
            method: "GET",
          });

          console.log("Polled Home I/O");
          // Process the data format cuz Home I/O hates json for some reason
          const data = (await res.text())
            .split("\n")
            .reduce((acc, line) => {
              const part = line.split(" ")
              // Skip malformed lines
              if(part.length < 2) {
                return acc;
              }
              return Object.assign(acc, { [part[0]]: part[1] })
            }, {});

          // Pass polled data to execute schedule.
          executeSchedule(data, home);
          
        } catch (err) {
          console.log("Home I/O server is offline");
          clearInterval(interval);
        }
      }, 2000);
    }
  } catch (err) {
    console.log("Home I/O server is offline");
  }
}

async function executeSchedule(data, home) {
  console.log("executeSchedule called");

  const homeDate = new Date(`${data['year']}-${data['month']}-${data['day']} ${data['hour']}:${data['minute']}`);
  var day = homeDate.getDay();

  switch (day) {
    case 0:
      day = "sunday";
      break;
    case 1:
      day = "monday";
      break;
    case 2:
      day = "tuesday";
      break;
    case 3:
      day = "wednesday";
      break;
    case 4:
      day = "thursday";
      break;
    case 5:
      day = "friday";
      break;
    case 6:
      day = "saturday";
      break;
  }

  // Loop through rooms in house
  for(const r of home.rooms) {
    // console.log("room")
    const room = await Room.findById(r);
    if(!room) {
      continue;
    }

    // Loop through appliance in room
    for(const a of room.appliances) {
      // console.log("appliance")
      const appliance = await Appliance.findById(a).populate("energyProfile");
      if(!appliance) {
        continue;
      }
      
      // Loop through schedules in appliance
      for(const s of appliance.schedules) {
        // console.log("schedules")
        if(s.days.find(e => e == day)) {
          const startDate = new Date(`1970-01-01 ${s.startTime.hour}:${s.startTime.minute}`);
          const activationDate = new Date(`1970-01-01 ${homeDate.getHours()}:${homeDate.getMinutes()}`);
          const endDate = new Date(`1970-01-01 ${s.endTime.hour}:${s.endTime.minute}`);

          // Turn on appliance if the time is within automation specification
          if(activationDate > startDate && activationDate < endDate && !s.active ) {
            if (appliance.status === "off") {
              if (appliance.interface) {
                var link = "";
                const interface = appliance.interface;
        
                // Home I/O Appliance logic
                if (appliance.applianceType == "Light") {
                  link = `http://localhost:9797/swl/turn_on/${
                    interface.slice(1) || 1
                  }/${interface.slice(0, 1)}`;
                  linkSettings = `http://localhost:9797/stl/${
                    interface.slice(1) || 1
                  }/${interface.slice(0, 1)}/${appliance.brightness}`;
                } else if (appliance.applianceType == "AirConditioner") {
                  link = `http://localhost:9797/swh/turn_on/${
                    interface.slice(1) || 1
                  }/${interface.slice(0, 1)}`;
                }
        
                try {
                  if (link) {
                    const response = await fetch(link, {
                      method: "GET",
                      headers: { "Content-Type": "application/json" },
                    });
        
                    console.log(linkSettings);
                    if (linkSettings) {
                      const resSettings = await fetch(linkSettings, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                      });
                    }
        
                    if (response.ok) {
                      appliance.status = "on";
                      await appliance.save();
                    } else {
                      continue;
                    }
                  }
                } catch (err) {
                  continue;
                }
        
                appliance.status = "on";
                s.active = true;
        
                if (appliance.energyProfile) {
                  appliance.energyProfile.currentUsage =
                    appliance.energyProfile.energyConsumption;
                  await appliance.energyProfile.save(); // Save the updated energyProfile
                }
                await appliance.save();
              } else {
                appliance.status = "on";
                s.active = true;

                if (appliance.energyProfile) {
                  appliance.energyProfile.currentUsage =
                    appliance.energyProfile.energyConsumption;
                  await appliance.energyProfile.save(); // Save the updated energyProfile
                }
                await appliance.save();
              }
            }
          } else if(activationDate > endDate && s.active) {
              // Turn off appliance if time is outside of schedule
              if (appliance.status === "on") {
                if (appliance.interface) {
                  var link = "";
                  const interface = appliance.interface;
          
                  // Home I/O Appliance logic
                  if (appliance.applianceType == "Light") {
                    link = `http://localhost:9797/swl/turn_off/${
                      interface.slice(1) || 1
                    }/${interface.slice(0, 1)}`;
                    linkSettings = `http://localhost:9797/stl/${
                      interface.slice(1) || 1
                    }/${interface.slice(0, 1)}/0`;
                  } else if (appliance.applianceType == "AirConditioner") {
                    link = `http://localhost:9797/swh/turn_off/${
                      interface.slice(1) || 1
                    }/${interface.slice(0, 1)}`;
                  }
          
                  try {
                    if (link) {
                      const response = await fetch(link, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                      });
          
                      if (linkSettings) {
                        const resSettings = await fetch(linkSettings, {
                          method: "GET",
                          headers: { "Content-Type": "application/json" },
                        });
                      }
          
                      if (response.ok) {
                        appliance.status = "off";
                        await appliance.save();
                      } else {
                        continue;
                      }
                    }
                  } catch (err) {
                    continue;
                  }
          
                  if (appliance.energyProfile) {
                    appliance.energyProfile.currentUsage = 0;
                    await appliance.energyProfile.save(); // Save the updated energyProfile
                  }
                  appliance.status = "off";
                  s.active = false;
                  await appliance.save();
                } else {
                  if (appliance.energyProfile) {
                    appliance.energyProfile.currentUsage = 0;
                    await appliance.energyProfile.save(); // Save the updated energyProfile
                  }
                  appliance.status = "off";
                  s.active = false;
                  await appliance.save();
                }
              }
          }
        }
      }
    } 
  }
}

const startPolling = async (req, res) => {
    const { id } = req.params;

    // Query db for home
    const home = await Home.findById(id);
    if (!home) {
      return res.status(404).json({ success: false, message: "Could not find home." });
    }

    clearInterval(interval);
    const homeData = await pollHome(home);

    return res.status(200);
}

const createAppliance = async (req, res) => {
  const { id } = req.params;
  const requesterName = req.body.requester;
  const appliance = req.body.appliance;

  if (!requesterName || !appliance.name || !appliance.applianceType) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  // Attempt to query database for user that is sending the request
  const requester = await User.findOne({
    "userInfo.usernameLower": requesterName.toLowerCase(),
  });
  if (!requester) {
    return res.status(404).json("Requester not found.");
  }

  // Verify that the room exists
  const room = await Room.findById(id).populate("appliances");
  if (!room) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }
  // Prevent duplicate names
  for (const e of room.appliances) {
    if (e.name === appliance.name) {
      return res
        .status(409)
        .json({ success: false, message: "Duplicate appliance name" });
    }
  }

  // Query database for home to check user permissions
  const home = await Home.findOne({ rooms: id });
  if (!home) {
    return res
      .status(404)
      .json({ success: false, message: "Could not find home." });
  }

  // Permission check
  const validPerms = checkPermission(requester, home, "addRemoveAppliance");
  if (!validPerms) {
    return res.status(403).json({
      success: false,
      message: "you do not have the permissions to perform this action.",
    });
  }

  // Add room ID to appliance object
  appliance.room = id;

  let newAppliance;
  switch (appliance.applianceType) {
    case "Fan":
      newAppliance = new Fan(appliance);
      break;
    case "Light":
      newAppliance = new Light(appliance);
      break;
    case "AirConditioner":
      newAppliance = new AirConditioner(appliance);
      break;
    case "Sprinkler":
      newAppliance = new Sprinkler(appliance);
      break;
  }
  try {
    await newAppliance.save();
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      // Pushes the new appliances onto the appliance list
      { $push: { appliances: newAppliance } },
      { new: true }
    );
    res.status(201).json({ success: true, data: updatedRoom });
  } catch (error) {
    console.error("Error in creating appliance: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const removeAppliance = async (req, res) => {
  const { id } = req.params;
  const requesterName = req.body.requester;

  if (!requesterName) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  // Find the Appliance
  const appliance = await Appliance.findById(id);
  if (!appliance) {
    return res
      .status(404)
      .json({ success: false, message: "Appliance not found" });
  }
  // Attempt to query database for user that is sending the request
  const requester = await User.findOne({
    "userInfo.usernameLower": requesterName.toLowerCase(),
  });
  if (!requester) {
    return res.status(404).json("Requester not found.");
  }

  // Query database for home and room to check user permissions
  const room = await Room.findById(appliance.room);
  if (!room) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }
  const home = await Home.findOne({ rooms: room._id });
  if (!home) {
    return res.status(404).json("Could not find home.");
  }

  // Permission check
  const validPerms = checkPermission(requester, home, "addRemoveAppliance");
  if (!validPerms) {
    return res
      .status(403)
      .json("you do not have the permissions to perform this action.");
  }

  await appliance.deleteOne();

  // Remove the deleted appliance from the room's appliances array
  room.appliances = room.appliances.filter(
    (applianceId) => applianceId.toString() !== id
  );

  // Save the updated room
  await room.save();
  res.status(200).json({ success: true, data: room });
};

const renameAppliance = async (req, res) => {
  const { id } = req.params;

  if (!req.body.requester || !req.body.appliance.name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const requesterName = req.body.requester;
  const applianceName = req.body.appliance.name;

  // Attempt to query database for user that is sending the request
  const requester = await User.findOne({
    "userInfo.usernameLower": requesterName.toLowerCase(),
  });
  if (!requester) {
    return res.status(404).json("Requester not found.");
  }

  // Find the appliance
  const curr = await Appliance.findById(id);
  // Query database for home and room to check user permissions
  const room = await Room.findById(curr.room).populate("appliances");
  if (!room) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }
  const home = await Home.findOne({ rooms: room._id });
  if (!home) {
    return res.status(404).json("Could not find home.");
  }

  // Permission check
  const validPerms = checkPermission(requester, home, "addRemoveAppliance");
  if (!validPerms) {
    return res.status(403).json("User does not have sufficient permissions");
  }

  // Prevent duplicate names
  for (const e of room.appliances) {
    if (e.name == applianceName) {
      return res
        .status(409)
        .json({ success: false, message: "Duplicate appliance name" });
    }
  }

  // Update the name field
  curr.name = applianceName; // Replace `newName` with the new value

  // Save the updated document
  await curr.save();

  res.status(200).json({ success: true, data: curr });
};

const adjustAppliance = async (req, res) => {
  const { id } = req.params;
  if (!req.body.requester) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const requesterName = req.body.requester;

  // Attempt to query database for user that is sending the request
  const requester = await User.findOne({
    "userInfo.usernameLower": requesterName.toLowerCase(),
  });
  if (!requester) {
    return res.status(404).json("Requester not found.");
  }

  const appliance = await Appliance.findById(id);
  if (!appliance) {
    return res
      .status(404)
      .json({ success: false, message: "Appliance not found" });
  }
  // Query database for home and room to check user permissions
  const room = await Room.findById(appliance.room);
  if (!room) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }
  const home = await Home.findOne({ rooms: room._id });
  if (!home) {
    return res.status(404).json("Could not find home.");
  }

  // Permission check
  const validPerms = checkPermission(requester, home, "adjustAppliance");
  if (!validPerms) {
    return res.status(403).json("User does not have sufficient permissions");
  }

  try {
    if (!appliance) {
      return res
        .status(404)
        .json({ success: false, message: "Appliance not found" });
    }

    if (appliance.status === "disabled") {
      return res
        .status(400)
        .json({ success: false, message: "Appliance is disabled." });
    }

    // Update appliance-specific fields
    switch (appliance.applianceType) {
      case "Fan":
        if (req.body.currentSpeed !== undefined) {
          appliance.currentSpeed = req.body.currentSpeed;
        }
        if (req.body.speedLevels !== undefined) {
          appliance.speedLevels = req.body.speedLevels;
        }
        break;

      case "Light":
        if (req.body.colorTemperature !== undefined) {
          appliance.colorTemperature = req.body.colorTemperature;
        }
        if (req.body.brightness !== undefined) {
          appliance.brightness = req.body.brightness;

          if (appliance.interface) {
            var link = "";
            const interface = appliance.interface;

            // Home I/O Appliance logic
            link = `http://localhost:9797/stl/${
              interface.slice(1) || 1
            }/${interface.slice(0, 1)}/${req.body.brightness}`;
            console.log(link);
            try {
              if (link) {
                const response = await fetch(link, {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
                });

                if (response.ok) {
                  appliance.status = "on";
                  await appliance.save();
                } else {
                  return res.status(500).json({
                    success: false,
                    message: "Home I/O has encountered an error.",
                  });
                }
              }
            } catch (err) {
              return res.status(500).json({
                success: false,
                message: "Home I/O has encountered an error.",
              });
            }
          }
        }

        break;

      case "AirConditioner":
        if (req.body.temperature !== undefined) {
          appliance.temperature = req.body.temperature;
        }
        if (req.body.swing !== undefined) {
          appliance.swing = req.body.swing;
        }
        if (req.body.mode !== undefined) {
          appliance.mode = req.body.mode;
        }
        break;

      case "Sprinkler":
        if (req.body.waterFlowRate !== undefined) {
          appliance.waterFlowRate = req.body.waterFlowRate;
        }
        break;

      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid appliance type." });
    }

    await appliance.save();
    res.status(200).json({ success: true, data: appliance });
  } catch (error) {
    console.error("Error in modifying appliance: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const scheduleAppliance = async (req, res) => {
  const { id } = req.params;
  if (!req.body.schedule) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const schedule = req.body.schedule;
  if (
    !req.body.requester ||
    !schedule.name ||
    !schedule.startTime.hour ||
    !schedule.startTime.minute ||
    !schedule.endTime.hour ||
    !schedule.endTime.minute ||
    !schedule.days
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const validHour =
    schedule.startTime.hour >= 0 &&
    schedule.startTime.hour < 24 &&
    schedule.endTime.hour >= 0 &&
    schedule.endTime.hour < 24;
  const validMinute =
    schedule.startTime.minute >= 0 &&
    schedule.startTime.minute < 60 &&
    schedule.endTime.minute >= 0 &&
    schedule.endTime.minute < 60;
  const validTime = validHour && validMinute;
  if (!validTime) {
    return res.status(400).json({ success: false, message: "Malformed time" });
  }

  // Query database for appliance
  const appliance = await Appliance.findById(id);
  if (!appliance) {
    return res
      .status(404)
      .json({ success: false, message: "Appliance not found" });
  }

  const requesterName = req.body.requester;
  // Attempt to query database for user that is sending the request
  const requester = await User.findOne({
    "userInfo.usernameLower": requesterName.toLowerCase(),
  });
  if (!requester) {
    return res.status(404).json("Requester not found.");
  }

  // Query database for home and room to check user permissions
  const room = await Room.findOne({ appliances: id });
  if (!room) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }
  const home = await Home.findOne({ rooms: room._id });
  if (!home) {
    return res.status(404).json("Could not find home.");
  }

  // Permission check
  const validPerms = checkPermission(requester, home, "automateAppliance");
  if (!validPerms) {
    return res.status(403).json("User does not have sufficient permissions");
  }

  // Prevent duplicate names
  for (const e of appliance.schedules) {
    if (e.name == schedule.name) {
      return res
        .status(409)
        .json({ success: false, message: "Duplicate schedule name" });
    }
  }

  await appliance.updateOne({ $push: { schedules: schedule } });
  return res.status(200).json("Schedule created successfully.");
};

const modifySchedule = async (req, res) => {
  const { id } = req.params;
  if (!req.body.requester || !req.body.schedule) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const schedule = req.body.schedule;

  // Ensure that time is valid if a time is provided
  if (schedule.startTime) {
    const validHour =
      schedule.startTime.hour >= 0 && schedule.startTime.hour < 24;
    const validMinute =
      schedule.startTime.minute >= 0 && schedule.startTime.minute < 60;
    const validTime = validHour && validMinute;
    if (!validTime) {
      return res
        .status(400)
        .json({ success: false, message: "Malformed time" });
    }
  }
  if (schedule.endTime) {
    const validHour = schedule.endTime.hour >= 0 && schedule.endTime.hour < 24;
    const validMinute =
      schedule.endTime.minute >= 0 && schedule.endTime.minute < 60;
    const validTime = validHour && validMinute;
    if (!validTime) {
      return res
        .status(400)
        .json({ success: false, message: "Malformed time" });
    }
  }

  // Query database for appliance
  const appliance = await Appliance.findOne({ "schedules._id": id });
  if (!appliance) {
    return res
      .status(404)
      .json({ success: false, message: "Appliance not found" });
  }

  const requesterName = req.body.requester;
  // Attempt to query database for user that is sending the request
  const requester = await User.findOne({
    "userInfo.usernameLower": requesterName.toLowerCase(),
  });
  if (!requester) {
    return res.status(404).json("Requester not found.");
  }

  // Query database for home and room to check user permissions
  const room = await Room.findOne({ appliances: appliance._id });
  if (!room) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }
  const home = await Home.findOne({ rooms: room._id });
  if (!home) {
    return res.status(404).json("Could not find home.");
  }

  // Permission check
  const validPerms = checkPermission(requester, home, "automateAppliance");
  if (!validPerms) {
    return res.status(403).json("User does not have sufficient permissions");
  }

  // Prevent duplicate names if name is provided as a parameter
  if (schedule.name) {
    for (const e of appliance.schedules) {
      if (e.name == schedule.name && !e._id.equals(id)) {
        return res
          .status(409)
          .json({ success: false, message: "Duplicate schedule name" });
      }
    }
  }

  // Update field provided to appliance
  const dbSchedule = appliance.schedules.find((e) => e._id.equals(id));
  if (schedule.name) {
    dbSchedule.name = schedule.name;
  }
  if (schedule.startTime) {
    dbSchedule.startTime = schedule.startTime;
  }
  if (schedule.endTime) {
    dbSchedule.endTime = schedule.endTime;
  }
  if (schedule.days) {
    dbSchedule.days = schedule.days;
  }
  if (schedule.active != null) {
    dbSchedule.active = schedule.active;
  }

  await appliance.save();
  return res.status(200).json("Schedule modified successfully.");
};

const deleteSchedule = async (req, res) => {
  const { id } = req.params;

  if (!req.body.requester) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  // Query database for appliance
  const appliance = await Appliance.findOne({ "schedules._id": id });
  if (!appliance) {
    return res
      .status(404)
      .json({ success: false, message: "Appliance not found" });
  }

  const requesterName = req.body.requester;
  // Attempt to query database for user that is sending the request
  const requester = await User.findOne({
    "userInfo.usernameLower": requesterName.toLowerCase(),
  });
  if (!requester) {
    return res.status(404).json("Requester not found.");
  }

  // Query database for home and room to check user permissions
  const room = await Room.findOne({ appliances: appliance.id });
  if (!room) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }
  const home = await Home.findOne({ rooms: room._id });
  if (!home) {
    return res.status(404).json("Could not find home.");
  }

  // Permission check
  const validPerms = checkPermission(requester, home, "automateAppliance");
  if (!validPerms) {
    return res.status(403).json("User does not have sufficient permissions");
  }

  await appliance.updateOne({ $pull: { schedules: { _id: id } } });
  return res.status(200).json("Schedule deleted successfully.");
};

const automateAppliance = async (req, res) => {
  const { id } = req.params;
  if (!req.body.automation) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const automation = req.body.automation;
  if (
    !req.body.requester ||
    !automation.name ||
    !automation.sensorType ||
    !automation.threshold
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  // Query database for appliance
  const appliance = await Appliance.findById(id);
  if (!appliance) {
    return res
      .status(404)
      .json({ success: false, message: "Appliance not found" });
  }

  const requesterName = req.body.requester;
  // Attempt to query database for user that is sending the request
  const requester = await User.findOne({
    "userInfo.usernameLower": requesterName.toLowerCase(),
  });
  if (!requester) {
    return res.status(404).json("Requester not found.");
  }

  // Query database for home and room to check user permissions
  const room = await Room.findOne({ appliances: id });
  if (!room) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }
  const home = await Home.findOne({ rooms: room._id });
  if (!home) {
    return res.status(404).json("Could not find home.");
  }

  // Permission check
  const validPerms = checkPermission(requester, home, "automateAppliance");
  if (!validPerms) {
    return res.status(403).json("User does not have sufficient permissions");
  }

  // Prevent duplicate names
  for (const e of appliance.automations) {
    if (e.name == automation.name) {
      return res
        .status(409)
        .json({ success: false, message: "Duplicate automation name" });
    }
  }

  await appliance.updateOne({ $push: { automations: automation } });
  return res.status(200).json("Automation created successfully.");
};

const modifyAutomation = async (req, res) => {
  const { id } = req.params;
  if (!req.body.requester || !req.body.automation) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const automation = req.body.automation;
  // Query database for appliance
  const appliance = await Appliance.findOne({ "automations._id": id });
  if (!appliance) {
    return res
      .status(404)
      .json({ success: false, message: "Appliance not found" });
  }

  const requesterName = req.body.requester;
  // Attempt to query database for user that is sending the request
  const requester = await User.findOne({
    "userInfo.usernameLower": requesterName.toLowerCase(),
  });
  if (!requester) {
    return res.status(404).json("Requester not found.");
  }

  // Query database for home and room to check user permissions
  const room = await Room.findOne({ appliances: appliance._id });
  if (!room) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }
  const home = await Home.findOne({ rooms: room._id });
  if (!home) {
    return res.status(404).json("Could not find home.");
  }

  // Permission check
  const validPerms = checkPermission(requester, home, "automateAppliance");
  if (!validPerms) {
    return res.status(403).json("User does not have sufficient permissions");
  }

  // Prevent duplicate names if name is provided as a parameter
  if (automation.name) {
    for (const e of appliance.automations) {
      if (e.name == automation.name && !e._id.equals(id)) {
        return res
          .status(409)
          .json({ success: false, message: "Duplicate automation name" });
      }
    }
  }

  // Update field provided to appliance
  const dbAutomation = appliance.automations.find((e) => e._id.equals(id));
  if (automation.name) {
    dbAutomation.name = automation.name;
  }
  if (automation.sensorType) {
    dbAutomation.sensorType = automation.sensorType;
  }
  if (automation.threshold) {
    dbAutomation.threshold = automation.threshold;
  }
  if (automation.active != null) {
    dbAutomation.active = automation.active;
  }

  await appliance.save();
  return res.status(200).json("Automation modified successfully.");
};

const deleteAutomation = async (req, res) => {
  const { id } = req.params;

  if (!req.body.requester) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  // Query database for appliance
  const appliance = await Appliance.findOne({ "automations._id": id });
  if (!appliance) {
    return res
      .status(404)
      .json({ success: false, message: "Appliance not found" });
  }

  const requesterName = req.body.requester;
  // Attempt to query database for user that is sending the request
  const requester = await User.findOne({
    "userInfo.usernameLower": requesterName.toLowerCase(),
  });
  if (!requester) {
    return res.status(404).json("Requester not found.");
  }

  // Query database for home and room to check user permissions
  const room = await Room.findOne({ appliances: appliance.id });
  if (!room) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }
  const home = await Home.findOne({ rooms: room._id });
  if (!home) {
    return res.status(404).json("Could not find home.");
  }

  // Permission check
  const validPerms = checkPermission(requester, home, "automateAppliance");
  if (!validPerms) {
    return res.status(403).json("User does not have sufficient permissions");
  }

  await appliance.updateOne({ $pull: { automations: { _id: id } } });
  return res.status(200).json("Automation deleted successfully.");
};

const turnOnAppliance = async (req, res) => {
  const { id } = req.params;

  if (!req.body.requester) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const requesterName = req.body.requester;
  // Attempt to query database for user that is sending the request
  const requester = await User.findOne({
    "userInfo.usernameLower": requesterName.toLowerCase(),
  });
  if (!requester) {
    return res
      .status(404)
      .json({ success: false, message: "Requester not found" });
  }

  // Query database for home and room to check user permissions
  const room = await Room.findOne({ appliances: id }).populate("energyProfile");
  if (!room) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }
  const home = await Home.findOne({ rooms: room._id });
  if (!home) {
    return res
      .status(404)
      .json({ success: false, message: "Could not find home." });
  }

  // Permission check
  const validPerms = checkPermission(requester, home, "onOffAppliance");
  if (!validPerms) {
    return res.status(403).json({
      success: false,
      message: "you do not have the permissions to perform this action.",
    });
  }

  try {
    const appliance = await Appliance.findById(id).populate("energyProfile");
    if (!appliance) {
      return res
        .status(404)
        .json({ success: false, message: "Appliance not found" });
    }

    if (appliance.status === "disabled") {
      return res.status(400).json({
        success: false,
        message: "Appliance is disabled and cannot be turned on.",
      });
    }

    if (appliance.status === "off") {
      if (appliance.interface) {
        var link = "";
        const interface = appliance.interface;

        // Home I/O Appliance logic
        if (appliance.applianceType == "Light") {
          link = `http://localhost:9797/swl/turn_on/${
            interface.slice(1) || 1
          }/${interface.slice(0, 1)}`;
          linkSettings = `http://localhost:9797/stl/${
            interface.slice(1) || 1
          }/${interface.slice(0, 1)}/${appliance.brightness}`;
        } else if (appliance.applianceType == "AirConditioner") {
          link = `http://localhost:9797/swh/turn_on/${
            interface.slice(1) || 1
          }/${interface.slice(0, 1)}`;
        }

        try {
          if (link) {
            const response = await fetch(link, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            });

            console.log(linkSettings);
            if (linkSettings) {
              const resSettings = await fetch(linkSettings, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              });
            }

            if (response.ok) {
              appliance.status = "on";
              await appliance.save();
            } else {
              return res.status(500).json({
                success: false,
                message: "Home I/O has encountered an error.",
              });
            }
          }
        } catch (err) {
          return res.status(500).json({
            success: false,
            message: "Home I/O has encountered an error.",
          });
        }

        appliance.status = "on";

        if (appliance.energyProfile) {
          appliance.energyProfile.currentUsage =
            appliance.energyProfile.energyConsumption;
          await appliance.energyProfile.save(); // Save the updated energyProfile
        }
        await appliance.save();
      } else {
        appliance.status = "on";
        if (appliance.energyProfile) {
          appliance.energyProfile.currentUsage =
            appliance.energyProfile.energyConsumption;
          await appliance.energyProfile.save(); // Save the updated energyProfile
        }
        await appliance.save();
      }
    }

    res.status(200).json({ success: true, data: appliance });
  } catch (error) {
    console.error("Error in turning on appliance: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const turnOffAppliance = async (req, res) => {
  const { id } = req.params;

  if (!req.body.requester) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const requesterName = req.body.requester;
  // Attempt to query database for user that is sending the request
  const requester = await User.findOne({
    "userInfo.usernameLower": requesterName.toLowerCase(),
  });
  if (!requester) {
    return res
      .status(404)
      .json({ success: false, message: "Requester not found." });
  }

  // Query database for home and room to check user permissions
  const room = await Room.findOne({ appliances: id }).populate("energyProfile");
  if (!room) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }
  const home = await Home.findOne({ rooms: room._id });
  if (!home) {
    return res
      .status(404)
      .json({ success: false, message: "Could not find home" });
  }

  // Permission check
  const validPerms = checkPermission(requester, home, "onOffAppliance");
  if (!validPerms) {
    return res.status(403).json({
      success: false,
      message: "you do not have the permissions to perform this action.",
    });
  }

  try {
    const appliance = await Appliance.findById(id).populate("energyProfile");
    if (!appliance) {
      return res
        .status(404)
        .json({ success: false, message: "Appliance not found" });
    }

    if (appliance.status === "disabled") {
      return res.status(400).json({
        success: false,
        message: "Appliance is disabled and cannot be turned off.",
      });
    }

    if (appliance.status === "on") {
      if (appliance.interface) {
        var link = "";
        const interface = appliance.interface;

        // Home I/O Appliance logic
        if (appliance.applianceType == "Light") {
          link = `http://localhost:9797/swl/turn_off/${
            interface.slice(1) || 1
          }/${interface.slice(0, 1)}`;
          linkSettings = `http://localhost:9797/stl/${
            interface.slice(1) || 1
          }/${interface.slice(0, 1)}/0`;
        } else if (appliance.applianceType == "AirConditioner") {
          link = `http://localhost:9797/swh/turn_off/${
            interface.slice(1) || 1
          }/${interface.slice(0, 1)}`;
        }

        try {
          if (link) {
            const response = await fetch(link, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            });

            if (linkSettings) {
              const resSettings = await fetch(linkSettings, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              });
            }

            if (response.ok) {
              appliance.status = "off";
              await appliance.save();
            } else {
              return res.status(500).json({
                success: false,
                message: "Home I/O has encountered an error.",
              });
            }
          }
        } catch (err) {
          return res.status(500).json({
            success: false,
            message: "Home I/O has encountered an error.",
          });
        }

        if (appliance.energyProfile) {
          appliance.energyProfile.currentUsage = 0;
          await appliance.energyProfile.save(); // Save the updated energyProfile
        }
        appliance.status = "off";
        await appliance.save();
      } else {
        if (appliance.energyProfile) {
          appliance.energyProfile.currentUsage = 0;
          await appliance.energyProfile.save(); // Save the updated energyProfile
        }
        appliance.status = "off";
        await appliance.save();
      }
    }
    res.status(200).json({ success: true, data: appliance });
  } catch (error) {
    console.error("Error in turning on appliance: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const disableAppliance = async (req, res) => {
  const { id } = req.params;
  if (!req.body.requester) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  try {
    const appliance = await Appliance.findById(id);
    if (!appliance) {
      return res
        .status(404)
        .json({ success: false, message: "Appliance not found" });
    }

    const requesterName = req.body.requester;

    // Attempt to query database for user that is sending the request
    const requester = await User.findOne({
      "userInfo.usernameLower": requesterName.toLowerCase(),
    });
    if (!requester) {
      return res.status(404).json("Requester not found.");
    }

    // Query database for home and room to check user permissions
    const room = await Room.findOne({ appliances: id });
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }
    const home = await Home.findOne({ rooms: room._id });
    if (!home) {
      return res.status(404).json("Could not find home.");
    }

    // Permission check
    const validPerms = checkPermission(
      requester,
      home,
      "enableDisableAppliance"
    );
    if (!validPerms) {
      return res.status(403).json("User does not have sufficient permissions");
    }

    appliance.status = "disabled";
    await appliance.save();
    res.status(201).json({ success: true, data: appliance });
  } catch (error) {
    console.error("Error in disabling appliance: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const enableAppliance = async (req, res) => {
  const { id } = req.params;
  if (!req.body.requester) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  try {
    const appliance = await Appliance.findById(id);
    if (!appliance) {
      return res
        .status(404)
        .json({ success: false, message: "Appliance not found" });
    }

    const requesterName = req.body.requester;

    // Attempt to query database for user that is sending the request
    const requester = await User.findOne({
      "userInfo.usernameLower": requesterName.toLowerCase(),
    });
    if (!requester) {
      return res.status(404).json("Requester not found.");
    }

    // Query database for home and room to check user permissions
    const room = await Room.findOne({ appliances: id });
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }
    const home = await Home.findOne({ rooms: room._id });
    if (!home) {
      return res.status(404).json("Could not find home.");
    }

    // Permission check
    const validPerms = checkPermission(
      requester,
      home,
      "enableDisableAppliance"
    );
    if (!validPerms) {
      return res.status(403).json("User does not have sufficient permissions");
    }

    appliance.status = "off";
    await appliance.save();
    res.status(201).json({ success: true, data: appliance });
  } catch (error) {
    console.error("Error in disabling appliance: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getAppliancesByRoom = async (req, res) => {
  const { id } = req.params;
  try {
    // Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s).
    // https://mongoosejs.com/docs/populate.html
    const room = await Room.findById(id).populate("appliances");
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Home not found" });
    }
    return res.status(200).json({ success: true, appliances: room.appliances });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.log(error.message);
  }
};

module.exports = {
  createAppliance,
  removeAppliance,
  renameAppliance,
  getAppliancesByRoom,
  turnOnAppliance,
  turnOffAppliance,
  adjustAppliance,
  scheduleAppliance,
  modifySchedule,
  deleteSchedule,
  automateAppliance,
  modifyAutomation,
  deleteAutomation,
  disableAppliance,
  enableAppliance,
  startPolling,
};
