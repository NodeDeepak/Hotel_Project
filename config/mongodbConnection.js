const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://127.0.0.1:27017/userdata',{
})

connection.then(()=>{
    console.log(`Connected to the Mongodb`);
}).catch((error)=>{
    console.log(`Failed to connect ${error}`);
})

module.exports = connection;