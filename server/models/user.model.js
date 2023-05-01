const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
const EMAIL_REGEX = /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/;
const PHONE_NUMBER_REGEX = /^\+?[1-9][0-9]{7,14}$/;
const SALT_WORK_FACTOR = 10;

function emailValidation(val){
    return EMAIL_REGEX.test(val);
}

function phoneNumberValidation(val){
    return PHONE_NUMBER_REGEX.test(val);
}

const UserSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required: [
            true,
            "First name is required"
        ],
        trim: true,
    },
    lastName: { 
        type: String,
        trim: true,
    },
    email: { 
        type: String,
        required: [
            true,
            "Email is required"
        ],
        unique: true,
        trim: true,
        validate: {
            validator: val => emailValidation(val),
            message: "Please enter a valid email"
        }
    },
    phoneNumber: { 
        type: String,
        required: [
            true,
            "Phone number is required"
        ],
        trim: true,
        validate: {
            validator: val => phoneNumberValidation(val),
            message: "Please enter a valid phone number"
        }
    },
    phoneNumberVerified: { 
        type: Boolean
    },
    password: { 
        type: String,
        required: [
            true,
            "Password is required"
        ],
        trim: true,
        minlength: [5, "Password must be at least 5 characters"]
    },
    resumeId: { 
        type: String,
        trim: true,
    },
    googleSignInId: { 
        type: String,
        trim: true,
    },
    facebookSignInId: { 
        type: String,
        trim: true,
    },
}, { timestamps: true });

// add this after UserSchema is defined
UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, SALT_WORK_FACTOR)
        .then(hash => {
            this.password = hash;
            next();
        });
});

//UserSchema.plugin(uniqueValidator);

module.exports.User = mongoose.model('User', UserSchema);