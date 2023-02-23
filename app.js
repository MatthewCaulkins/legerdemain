// reads in our .env file and makes those values available as environment variables
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/main');

// create an instance of an express app
const app = express();

// update express settings
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// main routes
app.use('/', routes);

// handle errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error : err });
});

// catch all other routes
app.use((req, res, next) => {
    res.status(404);
    res.json({ message: '404 - Not Found' });
});

// have the server start listening on the provided port
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
});


// import { MongoClient } from 'mongodb'

// let client = new MongoClient("mongodb+srv://doadmin:7Xjan048zt1293gO@dbaas-db-4024796-ea5a6b4b.mongo.ondigitalocean.com/admin?replicaSet=dbaas-db-4024796&tls=true&authSource=admin", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// client.connect().then((client) => {
//     const db = client.db('test');

//     db.collection('test').insertOne({ message: "Hello from Digital Ocean!"}).then(() => {
//         process.exit();
//     });
// });