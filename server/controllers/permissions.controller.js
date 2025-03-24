const { User, Home } = require("../models/");

// Generates random string of numbers and alphabets
function randomString(length) {
  const chars =
    "1234567890abcdefghijklmnopqrstuvwxyzABCDDEFGHIJKLMNOPQRSTUVWXYZ";
  var result = "";

  // Get random char from string and append to result.
  for (var i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

// Checks if user has permission to perform action
function checkPermission(user, home, permission) {
  const dweller = home.dwellers.find((e) => e.user.equals(user._id)); // Get specific dweller in home
  if (!dweller) {
    return user._id.equals(home.owner);
  }

  return user._id.equals(home.owner) || dweller.accessLevel[permission]; // Return true if user is home owner or has relevant permission.
}

// Creates invite to home
const createInvite = async (req, res) => {
  // Check for home in request body
  if (!req.body.home || !req.body.username) {
    return res.status(400).json("Missing argument(s) in request body.");
  }

  // Query database for user
  const user = await User.findOne({
    "userInfo.usernameLower": req.body.username.toLowerCase(),
  });
  if (!user) {
    return res.status(404).json("User not found");
  }

  // Query database for home
  const home = await Home.findById(req.body.home);
  if (!home) {
    return res.status(404).json("Home not found");
  }

  // Permission check
  const validPerms = checkPermission(user, home, "addRemoveDweller");
  if (!validPerms) {
    return res.status(403).json("User does not have sufficient permissions");
  }

  // Generate code and push to database
  const invite = randomString(6);
  console.log(invite);

  var expiry = new Date(Date.now() + 5 * 60 * 1000); // Set 5 minute TTL for code (converted from millis)
  await home.updateOne({
    $push: {
      activeInvites: {
        invite: invite,
        expiryDate: expiry,
      },
    },
  });
  return res.status(200).json({ message: "Invite created", data: invite });
};

// Accept invite to home
const acceptInvite = async (req, res) => {
  // Check for arguments in request body
  if (!req.body.username || !req.body.invite) {
    return res.status(400).json("Missing argument(s) in request body.");
  }

  // Extract arguments
  const username = req.body.username;
  const invite = req.body.invite;

  // Attempt to locate user to be added to home
  const user = await User.findOne({
    "userInfo.usernameLower": username.toLowerCase(),
  });
  if (!user) {
    return res.status(404).json("User not found, did user sign up fail?");
  }

  // Query database for home with matching invite
  const home = await Home.findOne({ "activeInvites.invite": invite });
  if (!home) {
    return res.status(401).json("Incorrect invite code.");
  }

  // Check if invite code has expired
  const now = Date.now();
  const currentInv = home.activeInvites.find((e) => e.invite == invite); // Search for current invite activeInvites

  if (now > currentInv.expiryDate) {
    await home.updateOne({ $pull: { activeInvites: { invite: invite } } }); // Remove invite from database
    return res.status(401).json("Invite code has expired.");
  }

  // Check if user is already a dweller of the home
  const isDweller = home.dwellers.some((e) => e.user.equals(user._id));

  if (!isDweller) {
    // Delete invite from database and add current user as dweller
    await home.updateOne({
      $push: {
        dwellers: { user: user._id },
      },
      $pull: {
        activeInvites: { invite: invite },
      },
    });
  } else {
    return res.status(409).json("User is already part of the home.");
  }

  return res.status(200).json("Home joined successfully.");
};

// Remove a dweller from a home
const removeDweller = async (req, res) => {
  // Check for arguments in request body
  if (!req.body.requester || !req.body.username || !req.body.home) {
    return res.status(400).json("Missing argument(s) in request body.");
  }

  // Extract usernames
  const requesterName = req.body.requester;
  const username = req.body.username;

  // Attempt to query database for user that is sending the request
  const requester = await User.findOne({
    "userInfo.usernameLower": requesterName.toLowerCase(),
  });
  if (!requester) {
    return res.status(404).json("Requester not found.");
  }

  // Attempt to query database for user to be removed from home
  const user = await User.findOne({
    "userInfo.usernameLower": username.toLowerCase(),
  });
  if (!user) {
    return res
      .status(404)
      .json("The dweller that you are trying to remove does not exist.");
  }

  // Query database for home
  const home = await Home.findById(req.body.home);
  if (!home) {
    return res.status(404).json("Could not find home.");
  }

  // Query database to check that user scheduled for removal is part of the home
  const dweller = home.dwellers.find((e) => e.user.equals(user._id)); // Get dweller to be deleted in home
  if (!dweller) {
    return res
      .status(404)
      .json("The dweller you are trying to remove is not part of the home.");
  }

  // Permission check, also allows user to remove themselves from a home
  const validPerms = checkPermission(requester, home, "modifyDweller");
  if (!validPerms && !requester._id.equals(user._id)) {
    return res.status(403).json("User does not have sufficient permissions");
  }

  // Remove user from home
  await home.updateOne({
    $pull: {
      dwellers: {
        user: user._id,
      },
    },
  });

  return res.status(200).json("Dweller removed successfully.");
};

// Modify user permissions
const modifyPermissions = async (req, res) => {
  // Check for arguments in request body
  if (
    !req.body.requester ||
    !req.body.username ||
    !req.body.permissions ||
    !req.body.home
  ) {
    return res.status(400).json("Missing argument(s) in request body.");
  }

  // Extract username
  const requesterName = req.body.requester;
  const username = req.body.username;

  // Don't allow users to change their own permissions
  if (requesterName == username) {
    return res
      .status(409)
      .json("You are trying to modify your own permissions.");
  }

  // Attempt to query database for user that is sending the request
  const requester = await User.findOne({
    "userInfo.usernameLower": requesterName.toLowerCase(),
  });
  if (!requester) {
    return res.status(404).json("Requester not found.");
  }

  // Attempt to locate user to be modified
  const user = await User.findOne({
    "userInfo.usernameLower": username.toLowerCase(),
  });
  if (!user) {
    return res
      .status(404)
      .json("The user you are trying to modify does not exist.");
  }

  // Query database for home to get current user permissions
  const home = await Home.findById(req.body.home);
  if (!home) {
    return res.status(404).json("Could not find home.");
  }

  // Permission check
  const validPerms = checkPermission(requester, home, "modifyDweller");
  if (!validPerms) {
    return res.status(403).json("User does not have sufficient permissions");
  }

  // Get dweller index
  const currentDweller = home.dwellers.findIndex((e) =>
    e.user.equals(user._id)
  );
  if (currentDweller == -1) {
    return res.status(404).json("User is not part of this home.");
  }

  const currentPermissions =
    Object.keys(home.dwellers[currentDweller].accessLevel) // Get all existing keys in accessLevel
      .filter((e) => home.dwellers[currentDweller].accessLevel[e]) || // Filter so that only present keys (true) are included in currentPermissions.
    []; //

  const unsetPermissions = currentPermissions
    .filter((e) => !req.body.permissions.includes(e)) // Get removed permissions with filter
    /* Reduce entries to single object with path to relevant permission in database
           For example: if current dweller index is 0, path will be dwellers.0.accessLevel.${permission here}: true
        */
    .reduce(
      (acc, e) =>
        Object.assign(acc, {
          [`dwellers.${currentDweller}.accessLevel.${e}`]: true,
        }),
      {}
    );

  const setPermissions = req.body.permissions.reduce(
    (acc, e) =>
      Object.assign(acc, {
        [`dwellers.${currentDweller}.accessLevel.${e}`]: true,
      }),
    {}
  ); // Same logic as above

  // Set permissions
  await home.updateOne({
    $set: setPermissions,
    $unset: unsetPermissions,
  });

  // Handle case for permissions where default is true because it breaks stuff
  if (
    unsetPermissions[`dwellers.${currentDweller}.accessLevel.onOffAppliance`]
  ) {
    await home.updateOne({
      $set: {
        [`dwellers.${currentDweller}.accessLevel.onOffAppliance`]: false,
      },
    });
  }

  if (
    unsetPermissions[`dwellers.${currentDweller}.accessLevel.adjustAppliance`]
  ) {
    await home.updateOne({
      $set: {
        [`dwellers.${currentDweller}.accessLevel.adjustAppliance`]: false,
      },
    });
  }

  return res.status(200).json("User permissions updated successfully.");
};

module.exports = {
  createInvite,
  acceptInvite,
  removeDweller,
  modifyPermissions,
  checkPermission,
};
