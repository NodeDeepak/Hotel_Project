const express = require ('express');
const app = new express();
const bodyParser = require('body-parser');
const port = 4000;
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const users = require('./resources/users.routes');
app.use('/users', users)

const hotels = require ('./resources/hotels.routes');
app.use('/hotels', hotels)

const server = require('https').Server(app);
server.listen( port,()=>{
    console.log(`Server is running on ${port}`);
});