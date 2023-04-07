// reads in our .env file and makes those values available as environment variables
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes/main');
const passwordRoutes = require('./routes/password');
// const secureRoutes = require('./routes/secure');

const cookieParser = require('cookie-parser');
const passport = require('passport');
const ArmyModel = require('./models/armyModel');

// setup mongo connection
const uri = process.env.MONGO_CONNECTION_URL;

mongoose.connect(uri, { 
    useNewUrlParser : true,
    dbName: 'Legerdemain' 
});
mongoose.connection.on('error', (error) => {
    console.log(error);
    process.exit(1);
});

mongoose.connection.on('connected', function (data) {
    console.log('connected to mongo');
});

// create an instance of an express app
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Will want to store this to the database later
let players = {};
let currentPlayer;
let screen = 'home';

// update express settings
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use(cookieParser());
// require passport auth
require('./auth/auth');

app.get('/game.html', passport.authenticate('jwt', { session : false }), function (req, res) {
    res.sendFile(__dirname + '/public/game.html');
});

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// main routes
app.use('/', routes);
app.use('/', passwordRoutes);
// app.use('/', passport.authenticate('jwt', { session : false }), secureRoutes);


// catch all other routes
app.use((req, res, next) => {
    res.status(404);
    res.json({ message: '404 - Not Found' });
});

// handle errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error : err });
});

// have the server start listening on the provided port
// app.listen(process.env.PORT || 3000, () => {
//     console.log(`Server started on port ${process.env.PORT || 3000}`);
// });


io.on('connection', async function (socket) {
    console.log('a user connected');

    // players[socket.id] = {
    //     rotation: 0,
    //     x: Math.floor(Math.random() * 700) + 50,
    //     y: Math.floor(Math.random() * 500) + 50,
    //     playerId: socket.id,
    //     team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
    // };

    // Gather our player data and then respond that the game can load
    socket.on('playerData', (data) => {
        currentPlayer = {
            name: data.name,
            units: data.units,
            playerId: data._id,
            socketId: socket.id
        };
        players[currentPlayer.socketId] = currentPlayer;

        screen = 'introScreen';

        // console.log('load the game scene');
        socket.emit('playerDataCollected');
    });

    if (screen === 'introScreen') {
        console.log('connect To Game');

        const otherPlayers = socket.sockets;

        // send players object to new player  - only to this new socket, array of all players and then this player
        socket.emit('currentPlayers', [players, currentPlayer]);

        // update all other players of the new player  - sends to all sockets
        socket.broadcast.emit('newPlayer', currentPlayer);
    }

    // Set the screen to Game Screen so if they disconnect now it will run the rest of the destroy code
    socket.on('gameScreenReached', async (playerId) => {
        screen = 'gameScreen';

        await ArmyModel.find({playerId})
            .then(async (result) => {
                socket.emit('playerArmies', result);
        });
    });


    // Save armies
    socket.on('saveArmy', async (data) => {
        const units = data.units;
        const name = data.name;
        const playerId = data.playerId;
        const armyId = data.armyId;

        await ArmyModel.findOne({playerId, armyId})
            .then(async (result) => {
                if (!result) {
                    console.log('no army results');
                    await ArmyModel.create({units, name, playerId, armyId});
                } else {
                    console.log('found an army');
                    await ArmyModel.updateOne({playerId, armyId}, {name, units});
                }
        }); 
        // console.log(army);
       // 
        // console.log('added army');

        socket.emit('armySaved');
        // return done(null, user);
    });


    socket.on('disconnect', () => {
        // Since the connection was getting destroyed on page loads, I just store the page name before running the disconnect code
        if (screen !== 'introScreen') {
            // remove this player from our players object
            delete players[currentPlayer.socketId];
        }
        
        // emit a message to all players to remove this player
        console.log('user disconnected');
        io.emit('disconnectPlayer', currentPlayer.socketId);
    });
});

server.listen(3000, function() {
    console.log(`Listening on ${server.address().port}`);
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