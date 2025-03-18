const { User } = require('../models');

// Change user email
const updateEmail = async (req, res) => {
    if ((await User.findOne({ 'userInfo.email': req.body.email }))) {
        return res.status(409).json('Email has already been registered.'); // Woah 409 code!
    }

    const user = await User.findOneAndUpdate(
        { 'userInfo.usernameLower': req.body.username }, 
        { 'userInfo.email': req.body.email }
    );

    if(!user) {
        return res.status(404).json("User does not exist.");
    }

    return res.status(200).json("User email updated successfully.");
}

// Change user password
const updatePassword = async (req, res) => {
    const validUser = await User.findOneAndUpdate(
        { 'userInfo.email': req.body.email },
        { 'userInfo.passwordHash': req.body.password }
    );

    if (!validUser) {
        return res.status(404).json('User does not exist.');
    }

    return res.status(200).json('Password updated successfully.');
};

// Change user username
const updateUsername = async (req, res) => {
    if ((await User.findOne({ 'userInfo.username': req.body.updatedUsername }))) {
        return res.status(409).json('Username is already taken.'); // Woah 409 code!
    }

    const user = await User.findOneAndUpdate(
        { 'userInfo.usernameLower': req.body.username }, 
        { 'userInfo.username': req.body.updatedUsername }
    );

    if(!user) {
        return res.status(404).json("User does not exist.");
    }

    return res.status(200).json("Username updated successfully.");
}

// Change user display name
const updateDisplayName = async (req, res) => {
    const user = await User.findOneAndUpdate(
        { 'userInfo.usernameLower': req.body.username }, 
        { 'userInfo.displayName': req.body.displayName }
    );

    if(!user) {
        return res.status(404).json("User does not exist.");
    }

    return res.status(200).json("User display name updated successfully.");
}

const updateAccountStatus = async (req, res) => {
    var user = new User();
    try {
        user = await User.findOneAndUpdate({ 'userInfo.usernameLower': req.body.username }, { 'settings.accountStatus': req.body.status });
    } catch (err) {
        return res.status(500).json("Invalid input received.");
    }

    if(!user) {
        return res.status(404).json("User does not exist.");
    }

    return res.status(200).json("Account status updated successfully.");
}

module.exports = {
    updateEmail,
    updatePassword,
    updateUsername,
    updateDisplayName,
    updateAccountStatus
}
