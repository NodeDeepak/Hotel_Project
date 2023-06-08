const mongoose = require('mongoose')

// Hotel Schema

const HotelSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    address: { type: String, default: "" },
    roomNo: { type: String, default: "" },
    tableNo: { type: String, default: "" },
    created_at: { type: Date, default: Date.now },
});


let Hotel = mongoose.model('Hotel', HotelSchema, 'Hotel')

module.exports = Hotel