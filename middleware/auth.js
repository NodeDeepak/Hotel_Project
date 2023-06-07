const Jwt =require("jsonwebtoken");

const jwtKey = "demo"

const UserResource = require('../resources/users/users.resource');
const _User = new UserResource();

module.exports = class Auth{

    async verifyToken(req, res, next) {

        let token = req.headers["authorization"];
        if(!token){
            return res.status(400).send({ status: 400, msg: "Please enter a valid token.", data: false })
        }

        if (token) {
        
            Jwt.verify(token, jwtKey, async (error, valid) => {

                if (error) {
                    return res.status(400).send({ status: 401, msg: "Please provide a valid token.", data: false })
                }

                const user = await _User.checkById(valid.user_id)

                // if(user.role !== 'customer'){
                //     return
                // }
                req.user = user

                next()
            })
        }
    }

}


