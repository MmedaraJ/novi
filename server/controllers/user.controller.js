const { User: User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

require('dotenv').config();

module.exports.createUser = (request, response) => {
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        phoneNumberVerified,
        password,
        confirmPassword,
        resumeId,
        googleSignInId
    } = request.body;

    User.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        phoneNumberVerified,
        password,
        confirmPassword,
        resumeId,
        googleSignInId
    })
        .then(user => {
            logUserInAfterRegistration(user, request, response);
        })
        .catch(err => {
            console.log(err);
            response.status(400).json(err)
        });
}

const logUserInAfterRegistration = (user, request, response) => {
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);

    console.log(JSON.stringify(userToken));

    response
        .cookie(
            "usertoken", 
            userToken, 
            process.env.SECRET_KEY, 
            //should be httpsOnly in prod
            {httpOnly: true}
        )
        .json({
            msg: "success", 
            user: user,
            token: userToken
        });
}

module.exports.getAllUsers = (request, response) => {
    User.find({})
        .then(users => response.json(users))
        .catch(err => console.log(err));
}

module.exports.login = async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
 
    if(user === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }
 
    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
 
    if(!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }
 
    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);
 
    // note that the response object allows chained calls to cookie and json
    res
        .cookie(
            "usertoken", 
            userToken, 
            process.env.SECRET_KEY, 
            //should be httpsOnly in prod
            {httpOnly: true}
        )
        .json({ 
            msg: "success!",
            token: userToken,
            user: user
        });
}

module.exports.deleteAllUsers = (request, response) => {
    User.deleteMany({})
        .then(res => console.log(`All users deleted\n${res}`))
        .catch(err => console.log(err));
}

module.exports.logout = (request, response) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

module.exports.sendPhoneNumberConfirmationCode = async(req, res) => {
    client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
        .verifications
        .create({
            to: req.body.phoneNumber,
            channel: 'sms'
        })
        .then(verification => {
            console.log(verification.status);
            res.json({success: true})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: error.message });
        });
}

module.exports.verifyPhoneNumberConfirmationCode = async(req, res) => {
    client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
        .verificationChecks
        .create({
            to: req.body.phoneNumber, 
            code: req.body.confirmationCode
        })
        .then(verification_check => {
            const status = verification_check.status
            console.log(status);
            res.json({ success: status=='approved'? true: false })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: error.message });
        });
}

module.exports.updatePhoneNumberVerifiedForUser = async(req, res) => {
    const userId = req.body.userId;
    User.findByIdAndUpdate(
        userId,
        {phoneNumberVerified: true},
        {new: true}
    ).then(updatedUser => {
        console.log(`User with ID ${userId} updated successfully.`);
        console.log(updatedUser);
    }).catch(error => {
        console.error(`Error updating user with ID ${userId}: ${error}`);
    });
}