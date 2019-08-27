const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobileNumber: Number,
    role: String,
    password: String,
    isVerified: String
});

module.exports = mongoose.model('user', userSchema, 'users');