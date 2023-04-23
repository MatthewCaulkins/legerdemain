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
        await UserModel.findOne({ _id : id })
            .then(async (data) => {
                currentPlayer = {
                    name: data.name,
                    units: data.units,
                    playerId: data._id.toString(),
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

        // If this is the first time, create 8 rooms
        if (Object.keys(rooms).length === 0) {
            do {
                rooms[roomID] = {roomID: roomID, player1: null, player2: null};
                socket.emit('createNewRoom', rooms[roomID]);
                roomID ++;
            } while (Object.keys(rooms).length < 8);
        } else {
            socket.emit('listRooms', rooms);
        }
    });

    // List rooms
    socket.on('getRooms', () => {
        socket.emit('listRooms', rooms);
    });

    // socket.on('joinRoomOtherPlayer', (data) => {
    //     console.log('player ' + players[socket.id].playerId + ' joined a room');
    //     socket.join(data.roomId);
    //     socket.emit('startGame', data);
    // });

    // Join a room 
    socket.on('joinRoom', (data) => {
        console.log('Player joins a room ');
        console.log(data.roomID);

        // Remove player from all other rooms
        Object.keys(rooms).forEach(room => {
            if (rooms[room].player1 && rooms[room].player1.playerId === data.player.playerId) {
                rooms[room].player1 = null;
                
                socket.leave(room);
            }
            if (rooms[room].player2 && rooms[room].player2.playerId === data.player.playerId) {
                rooms[room].player2 = null;

                socket.leave(room);
            }
        });

        if (data.side === 'left') {
            rooms[data.roomID].player1 = data.player;
        } else if (data.side === 'right') {
            rooms[data.roomID].player2 = data.player;
        }
        
        console.log('player ' + players[socket.id].playerId + ' joined a room ' + data.roomID);
        socket.join(data.roomID);

        // TODO: Make this so it only updates that one room instead of relisting all of them
        // socket.broadcast.emit('listRooms', rooms);
        // socket.emit('listRooms', rooms);
        io.emit('listRooms', rooms);

        // TODO: If both slots are full start a game
        if (rooms[data.roomID].player1 != null && rooms[data.roomID].player2 != null) {
            
            // Trigger a new game for the other player
            // if (rooms[data.roomID].player1.socketId === socket.id) {
            //     console.log('send to player2');
            //     io.to(rooms[data.roomID].player2.socketId).emit('joinRoomOtherPlayer', data);
            // } else if (rooms[data.roomID].player2.socketId === socket.id) {
            //     console.log('send to player1');
            //     io.to(rooms[data.roomID].player1.socketId).emit('joinRoomOtherPlayer', data);
            // }
            
            // Trigger a game for this player
            // socket.join(data.roomID);
            io.in(data.roomID).emit('startGame', data);
        }
    });


    // Clear all rooms from a player
    socket.on('clearPlayerFromRooms', (data) => {
        Object.keys(rooms).forEach(room => {
            if (rooms[room].player1 && rooms[room].player1.playerId === data.playerId) {
                rooms[room].player1 = null;
            }
            if (rooms[room].player2 && rooms[room].player2.playerId === data.playerId) {
                rooms[room].player2 = null;
            }
        });
    
        socket.broadcast.emit('listRooms', rooms);
        socket.emit('listRooms', rooms);
    });

    // Leave a room
    socket.on('leaveRoom', (data) => {
        console.log('Player leaves a room ');
        console.log(data.roomID);

        if (data.side === 'left') {
            rooms[data.roomID].player1 = null;
        } else if (data.side === 'right') {
            rooms[data.roomID].player2 = null;
        }

        // TODO: Make this so it only updates that one room instead of relisting all of them
        socket.broadcast.emit('listRooms', rooms);
        socket.emit('listRooms', rooms);
    });

    // Move a unit 
    socket.on('moveUnit', (data) => {

        // TODO: save to the database


        // Broadcast and emit the event
        // socket.to('room').broadcast.emit('moveUnitConfirmed', data);
        socket.emit('moveUnitConfirmed', data);
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
        console.log(players);
        if (players[socket.id]) {
            // console.log('has id');
            // console.log(players[socket.id].playerId);

            const playerId = players[socket.id].playerId;
            Object.keys(rooms).forEach(room => {
                if (rooms[room].player1 && rooms[room].player1.playerId === playerId) {
                    rooms[room].player1 = null;
                }
                if (rooms[room].player2 && rooms[room].player2.playerId === playerId) {
                    rooms[room].player2 = null;
                }
            });
        }

        socket.broadcast.emit('listRooms', rooms);
        socket.emit('listRooms', rooms);

        // Since the connection was getting destroyed on page loads, I just store the page name before running the disconnect code
        // if (screen !== 'introScreen') {
            // remove this player from our players object
        delete players[socket.id];
        // }
        
        // emit a message to all players to remove this player
        console.log('user disconnected');
        io.emit('disconnectPlayer', socket.id);
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