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
        password,
        confirmPassword,
        resumeId
    } = request.body;

    User.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        confirmPassword,
        resumeId
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
    try {
        // Generate a random 6-digit confirmation code
        const confirmationCode = Math.floor(100000 + Math.random() * 900000);
        req.session.confirmationCode = confirmationCode;
    
        // Send the confirmation code to the user's phone number via SMS
        const message = await client.messages.create({
          body: `Your confirmation code is ${confirmationCode}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: req.body.phoneNumber
        });
    
        // Return a success response
        res.json({ success: true });
    } catch (error) {
        // Return an error response
        res.status(500).json({ error: error.message });
    }
}

module.exports.verifyPhoneNumberConfirmationCode = async(req, res) => {
    try {
        // Check if the confirmation code is correct
        if (req.body.confirmationCode === req.session.confirmationCode) {
          // Clear the confirmation code from the session
          delete req.session.confirmationCode;
    
          // Return a success response
          res.json({ success: true });
        } else {
          // Return an error response
          res.status(401).json({ error: 'Invalid confirmation code' });
        }
    } catch (error) {
        // Return an error response
        res.status(500).json({ error: error.message });
    }
}