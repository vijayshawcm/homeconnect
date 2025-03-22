const bcrypt = require('bcryptjs');
const { User } = require('../models');

// Change user email
const updateEmail = async (req, res) => {
    if ((await User.findOne({ 'userInfo.email': req.body.email }))) {
        return res.status(409).json('Email has already been registered.'); // Woah 409 code!
    }

    const user = await User.findOneAndUpdate(
        { 'userInfo.usernameLower': req.body.username.toLowerCase() }, 
        { 'userInfo.email': req.body.email }
    );

    if(!user) {
        return res.status(404).json("User does not exist.");
    }

    return res.status(200).json("User email updated successfully.");
}

// Change user password
const updatePassword = async (req, res) => {
    if(req.body.currentPassword) {
        const user = await User.findOne({ 'userInfo.email': req.body.email });
        const validPassword = await bcrypt.compare(req.body.currentPassword, user.userInfo.passwordHash);

        if(!validPassword) {
            return res.status(401).json('Old password does not match.')
        }
    }

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
        { 'userInfo.usernameLower': req.body.username.toLowerCase() }, 
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
        { 'userInfo.usernameLower': req.body.username.toLowerCase() }, 
        { 'userInfo.displayName': req.body.displayName }
    );

    if(!user) {
        return res.status(404).json("User does not exist.");
    }

    return res.status(200).json("User display name updated successfully.");
}

// Change theme
const updateTheme = async (req, res) => {
    var user = new User();
    try {
        user = await User.findOneAndUpdate({ 'userInfo.usernameLower': req.body.username.toLowerCase() }, { 'settings.theme': req.body.theme });
    } catch (err) {
        return res.status(500).json("Invalid input received.");
    }

    if(!user) {
        return res.status(404).json("User does not exist.");
    }

    return res.status(200).json("User display theme updated successfully.");
}

// Update notification channel
const updateNotificationChannel = async (req, res) => {
    var user = new User();
    try {
        user = await User.findOneAndUpdate({ 'userInfo.usernameLower': req.body.username.toLowerCase() }, { 'settings.notification.channels': req.body.channels });
    } catch (err) {
        return res.status(500).json("Invalid input received.");
    }

    if(!user) {
        return res.status(404).json("User does not exist.");
    }

    return res.status(200).json("User notification channels updated successfully.");
}

// Update notification type
const updateNotificationType = async (req, res) => {
    var user = new User();
    try {
        user = await User.findOneAndUpdate({ 'userInfo.usernameLower': req.body.username.toLowerCase() }, { 'settings.notification.types': req.body.types });
    } catch (err) {
        return res.status(500).json("Invalid input received.");
    }

    if(!user) {
        return res.status(404).json("User does not exist.");
    }

    return res.status(200).json("User notification type updated successfully.");
}

// Update account status
const updateAccountStatus = async (req, res) => {
    var user = new User();
    try {
        user = await User.findOneAndUpdate({ 'userInfo.usernameLower': req.body.username.toLowerCase() }, { 'settings.accountStatus': req.body.status });
    } catch (err) {
        return res.status(500).json("Invalid input received.");
    }

    if(!user) {
        return res.status(404).json("User does not exist.");
    }

    return res.status(200).json("Account status updated successfully.");
}

// Update 2fa
const updateTwoFactor = async (req, res) => {
    const user = await User.findOneAndUpdate({ 'userInfo.usernameLower': req.body.username.toLowerCase() }, { 'settings.twoFactorAuthentication': req.body.status });

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
    updateTheme,
    updateNotificationChannel,
    updateNotificationType,
    updateAccountStatus,
    updateTwoFactor
}
