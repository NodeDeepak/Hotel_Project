const mongoose = require('mongoose')

// Hotel Schema

const HotelSchema = new mongoose.Schema({
    photos: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { ttype: String, default: "" },
    address: { type: String, default: "" },
    roomNo: { type: String, default: "" },
    startDate: { type: String, default: "" },
    endDate: { type: String, default: "" },
    created_at: { type: Date, default: Date.now },
});


let Hotel = mongoose.model('Hotel', HotelSchema, 'Hotel')

module.exports = Hotel