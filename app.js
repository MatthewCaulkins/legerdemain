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
const UserModel = require('./models/userModel');

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
// let screen = 'home';
let rooms = {};
let roomID = 0;

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

    socket.on('getPlayerData', async(id) => {
        console.log(`id: ${id}`);
        await UserModel.findOne({ id })
            .then(async (data) => {
                currentPlayer = {
                    name: data.name,
                    units: data.units,
                    playerId: data._id,
                    socketId: socket.id
                };
                players[socket.id] = currentPlayer;
        
                socket.emit('currentPlayers', [players, currentPlayer]);
        
                // update all other players of the new player  - sends to all sockets
                socket.broadcast.emit('newPlayer', currentPlayer);
            });
    });
    // });
    // // Gather our player data and then respond that the game can load
    // socket.on('playerData', (data) => {
        
        // screen = 'introScreen';

        // console.log('load the game scene');
        // socket.emit('playerDataCollected');
    // });

    // if (screen === 'introScreen') {
        // console.log('connect To Game');

        // const otherPlayers = socket.sockets;

        // send players object to new player  - only to this new socket, array of all players and then this player
    // socket.emit('currentPlayers', players);

    //     // update all other players of the new player  - sends to all sockets
    // socket.broadcast.emit('newPlayer', currentPlayer);
    // }

    
    // Set the screen to Game Screen so if they disconnect now it will run the rest of the destroy code
    socket.on('gameScreenReached', async (playerId) => {
        // screen = 'gameScreen';

        await ArmyModel.find({playerId})
            .then(async (result) => {
                socket.emit('playerArmies', result);
        });

        // If this is the first time, create 6 rooms
        if (Object.keys(rooms).length === 0) {
            do {
                socket.emit('createNewRoom', roomID);
                rooms[roomID] = {id: roomID, player1: null, player2: null};
                roomID ++;
            } while (Object.keys(rooms).length < 8);
        } else {
            socket.emit('listRooms', rooms);
        }
    });

    // List rooms
    socket.on('getRooms', data => {
        socket.emit('listRooms', rooms);
    });

    // Join a room 
    socket.on('joinRoom', (data) => {
        console.log('Player joins a room ');
        console.log(data.roomID);
    })

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
        socket.emit('armySaved');
    });


    // Delete an army
    socket.on('deleteArmy', async (data) => {
        const playerId = data.playerId;
        const armyId = data.armyId;

        await ArmyModel.findOneAndDelete({playerId, armyId});
        socket.emit('armyDeleted');
    });


    socket.on('disconnect', () => {
        // Since the connection was getting destroyed on page loads, I just store the page name before running the disconnect code
        // if (screen !== 'introScreen') {
            // remove this player from our players object
        delete players[currentPlayer.socketId];
        // }
        
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