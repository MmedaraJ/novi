const { User: User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const SALT_WORK_FACTOR = 10;
const EMAIL_REGEX = /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/;
const PHONE_NUMBER_REGEX = /^\+?[1-9][0-9]{7,14}$/;

require('dotenv').config();

function emailValidation(val){
    return EMAIL_REGEX.test(val);
}

function phoneNumberValidation(val){
    return PHONE_NUMBER_REGEX.test(val);
}

module.exports.createUser = (request, response) => {
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        phoneNumberVerified,
        password,
        confirmPassword,
        resumeName,
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
        resumeName,
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

module.exports.verifyPassword = async(req, res) => {
    const user = await User.findOne({ _id: req.body.userId });
    if(user === null) {
        return res.sendStatus(400);
    }
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if(!correctPassword) {
        return res.sendStatus(400);
    }
    return res.json({
        success: true
    });
}

module.exports.getOneUserWithGoogleSignInId = (req, res) => {
    User.findOne({ googleSignInId: req.body.googleSignInId })
    .select('_id')
    .then(user => {
        console.log(user);
        if(user){
            logUserInAfterRegistration(user, req, res);
        }else{
            res.status(500).json({ err });
        }
    }).catch(err => {
        console.error(err);
        res.status(500).json({ err });
    });
}

module.exports.getOneUser = (req, res) => {
    User.findOne({ _id: req.body.userId })
    .then(user => {
        console.log(user);
        res.json({user});
    }).catch(err => {
        console.error(err);
        res.status(500).json({ err });
    });
}

module.exports.deleteAllUsers = (request, response) => {
    User.deleteMany({})
        .then(res => console.log(`All users deleted\n${res}`))
        .catch(err => console.log(err));
}

module.exports.logout = (req, res) => {
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
        res.json({updatedUser});
    }).catch(error => {
        console.error(`Error updating user with ID ${userId}: ${error}`);
        res.status(500).json({ error });
    });
}

module.exports.updatePassword = async(req, res) => {
    let {userId, password, confirmPassword} = req.body;
    if(password === confirmPassword){
        bcrypt.hash(password, SALT_WORK_FACTOR)
            .then(hash => {
                password = hash;
                User.findByIdAndUpdate(
                    userId,
                    {
                        password,
                        confirmPassword
                    },
                    {new: true}
                ).then(updatedUser => {
                    console.log(`User password with ID ${userId} updated successfully.`);
                    console.log(updatedUser);
                    res.json({updatedUser});
                }).catch(error => {
                    console.error(`Error updating user password with ID ${userId}: ${error}`);
                    res.status(400).json(error);
                });
            });
    }else{
        res.status(400).json({ confirmNewPassword: 'Password must match confirm password'})
    }
    
}

module.exports.updatePhoneNumber = async(req, res) => {
    const {userId, phoneNumber} = req.body;
    User.findByIdAndUpdate(
        userId,
        {
            phoneNumber: phoneNumber,
            phoneNumberVerified: true
        },
        {new: true}
    ).then(updatedUser => {
        console.log(`User phone number with ID ${userId} updated successfully.`);
        console.log(updatedUser);
        res.json({updatedUser});
    }).catch(error => {
        console.error(`Error updating user phone number with ID ${userId}: ${error}`);
        res.status(500).json({ error });
    });
}

module.exports.updateEmail = async(req, res) => {
    const {userId, email} = req.body;
    if(emailValidation(email)){
        User.findByIdAndUpdate(
            userId,
            {email},
            {new: true}
        ).then(updatedUser => {
            console.log(`User email with ID ${userId} updated successfully.`);
            console.log(updatedUser);
            res.json({updatedUser});
        }).catch(error => {
            console.error(`Error updating user email with ID ${userId}: ${error}`);
            res.status(400).json(error);
        });
    }else{
        res.status(400).json({ email: 'Please enter a valid email'});
    }
}

module.exports.updateNames = async(req, res) => {
    const {userId, firstName, lastName} = req.body;
    User.findByIdAndUpdate(
        userId,
        {   firstName,
            lastName
        },
        {new: true}
    ).then(updatedUser => {
        console.log(`User names with ID ${userId} updated successfully.`);
        console.log(updatedUser);
        res.json({updatedUser});
    }).catch(error => {
        console.error(`Error updating user names with ID ${userId}: ${error}`);
        res.status(500).json({ error });
    });
}

module.exports.updateResumeName = async(req, res) => {
    const {userId, resumeName} = req.body;
    User.findByIdAndUpdate(
        userId,
        {resumeName},
        {new: true}
    ).then(updatedUser => {
        console.log(`User resume name with ID ${userId} updated successfully.`);
        console.log(updatedUser);
        res.json({updatedUser});
    }).catch(error => {
        console.error(`Error updating user resume name with ID ${userId}: ${error}`);
        res.status(500).json({ error });
    });
}