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
    await home.updateOne({ $push: {
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

}

module.exports = {
    createInvite,
    acceptInvite
}