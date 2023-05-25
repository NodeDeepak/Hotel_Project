const { boolean } = require("joi");
const mongoose = require("mongoose");

// let userSchema = new mongoose.Schema({
//     profilePhoto: '',
//     name: {type: String, default: ''},
//     email: {type: String, default: ''},
//     password: {type: String, default: ''},
//     mobileNo: {type: Number, default: ''},
//     address: {type: String, default: ''},
//     token: {type: String, default: ''}
// }, {timestamps: true});


let userSchema = new mongoose.Schema({
    email: {type: String, default: ''},
    password: {type: String, default: ''},
    userInfo:{
        profilePhoto: {type: String, default: ''},
        name: {type: String, default: ''},     
        mobileNo: {type: Number, default: ''},
        address: {type: String, default: ''},
    },
    businessInfo:{
        businessProfilePhoto: {type: String, default: ''},
        businessName: {type: String, default: ''},
        mobileNo: {type: Number, default: ''},
        address: {type: String, default: ''},
    },
    tokens:{
        authToken : {type: String, default: ''},
        fcmToken : {type: String, default: ''},  /// used for notification purpose 
        deviceId : {type: Number, default: ''}   // 1=> ios , 2=> android
    },
    isVerified : {type: Boolean, default: false},
    accountStatus: {type: String, enum:["Active", "Inactive"], default: 'Active'}
}, {timestamps: true});


User = mongoose.model('users', userSchema, 'users');

module.exports = User;