const { User } = require('../models');

// Change user email
const updateEmail = async (req, res) => {
    const user = await User.findOneAndUpdate(
        { usernameLower: req.body.username }, 
        { email: req.body.email }
    );

    if(!user) {
        return res.status(404).json("User does not exist.");
    }

    return res.status(200).json("User email updated correctly.");
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

module.exports = {
    updateEmail,
    updatePassword
}
