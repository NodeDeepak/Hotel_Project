// const express = require ('express');
// const app = new express();

const express = require('express');
const app = express();
require ('./config/mongodbConnection')
const bodyParser = require('body-parser');
const port = 4000;
require('dotenv').config();
const cors = require('cors');
app.use(cors({ }))


// const i18n = require('i18n');

// const i18n = new I18n({
//     locales: ['en', 'de'],
//     directory: path.join(__dirname, 'locales')
// })

// i18n.configure({
//     locales: ['en', 'de'], // List of supported languages
//     directory: __dirname + '/locales', // Path to the language files
//     defaultLocale: 'en', // Default language
//     queryParameter: 'lang', // URL query parameter to set the language (e.g., ?lang=en)
//     cookie: 'lang', // Cookie name to store the language preference
//     objectNotation: true // Whether to use object notation for translations (e.g., {{user.name}})
//   });

  // Initialize i18n
// app.use(i18n.init);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const users = require('./resources/users/users.routes');
app.use('/users', users)

// const hotels = require ('./resources/hotels.routes');
// app.use('/hotels', hotels)

const server = require('http').Server(app);
server.listen( port,()=>{
    console.log(`Server is running on ${port}`);
});