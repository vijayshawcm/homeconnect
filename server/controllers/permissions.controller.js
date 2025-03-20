const { User, Home }= require("../models/")

// Generates random string of numbers and alphabets
function randomString(length) {
    const chars = "1234567890abcdefghijklmnopqrstuvwxyzABCDDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = '';

    // Get random char from string and append to result.
    for (var i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    } 

    return result;
}

// Creates invite to home
const createInvite = async(req, res) => {
    // TODO: permissions check here

    // Check for home in request body
    if(!req.body.home) {
        return res.status(500).json("Home not provided in request body.");
    }

    // Query database for home
    const home = await Home.findById(req.body.home);
    if(!home){
        return res.status(404).json("Home not found");
    }

    // Generate code and push to database
    const invite = randomString(6);
    console.log(invite);

    var expiry = new Date(Date.now() + (5*60*1000)); // Set 5 minute TTL for code (converted from millis)
    await home.updateOne({
        $push: {
            activeInvites: {
                invite: invite,
                expiryDate: expiry
            }
        }
    });

    return res.status(200).json("Invite created");
}

// Accept invite to home
const acceptInvite = async (req, res) => {
    // Check for arguments in request body
    if(!req.body.username || !req.body.invite) {
        return res.status(500).json("Missing argument(s) in request body.");
    }

    // Extract argumets
    const username = req.body.username;
    const invite = req.body.invite;

    // Attempt to locate user to be added to home
    const user = await User.findOne({ 'userInfo.usernameLower': username.toLowerCase() });
    if(!user) {
        return res.status(404).json("User not found, did user sign up fail?");
    }

    // Query database for home with matching invite
    const home = await Home.findOne({ 'activeInvites.invite': invite });
    if(!home) {
        return res.status(401).json("Incorrect invite code.");
    }

    // Check if invite code has expired
    const now = Date.now();
    const currentInv = home.activeInvites.find(e => e.invite == invite) // Search for current invite activeInvites

    if(now > currentInv.expiryDate) {
        await home.updateOne({ $pull: { activeInvites: { invite: invite } } }); // Remove invite from database
        return res.status(401).json("Invite code has expired.");
    }

    // Check if user is already a dweller of the home
    const isDweller = home.dwellers.some(e => e.user.equals(user._id));

    if (!isDweller) {
        // Delete invite from database and add current user as dweller
        await home.updateOne({
            $push:
            {
                dwellers:
                    { user: user._id }
            },
            $pull: {
                activeInvites:
                    { invite: invite }
            }
        });
    } else {
        return res.status(409).json("User is already part of the home.");
    }
    

    return res.status(200).json("Home joined successfully.");
}

module.exports = {
    createInvite,
    acceptInvite
}