const HotelController = require('../users/users.controller');
const HotelResource = require('./hotels.resource');
const _Hotel = new HotelResource();

const Jwt = require('jsonwebtoken');


module.exports = class HotelController {

    async createOne(req, res) {

        let data = req.body

        let hotelObj = {
            photos: data.photos,
            title: data.title,
            description: data.description,
            address: data.address,
            roomNo: data.roomNo,
            startDate: data.startDate,
            endDate: data.endDate,
        }

        let booking = await _Hotel.createOne(hotelObj)

        if (!booking) {
            return res.status(400).send({ status: 400, msg: "Something went wrong, Please check detials you entered.", data : false})
        }
            return res.status(400).send({ status : 200, msg: "Booked successfully.", data: booking})
    }

}