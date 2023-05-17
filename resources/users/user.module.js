const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    profilePhoto: '',
    name: {type: String, default: ''},
    email: {type: String, default: ''},
    password: {type: String, default: ''},
    mobileNo: {type: Number, default: ''},
    address: {type: String, default: ''},
    token: {type: String, default: ''}
}, {timestamps: true});


User = mongoose.model('users', userSchema, 'users');

module.exports = Users;