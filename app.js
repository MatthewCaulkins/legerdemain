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

// Constants
const directionsModifiers = {
    'top':
        {
            'top': 0,
            'right': .5,
            'bottom': 1,
            'left': .5
        },
    'right': 
        {
            'top': .5,
            'right': 0,
            'bottom': .5,
            'left': 1
        },
    'bottom':
        {
            'top': 1,
            'right': .5,
            'bottom': 0,
            'left': .5
            
        },
    'left': 
        {
            'top': .5,
            'right': 1,
            'bottom': .5,
            'left': 0
        }
};

const directionOpposites = {
    'top': 'bottom',
    'right': 'left',
    'bottom': 'top',
    'left': 'right'
};

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
                    socketId: socket.id,
                    tutorials: data.tutorials
                };
                players[socket.id] = currentPlayer;

                socket.emit('checkDefaultArmy', {playerId: currentPlayer.playerId});
                socket.emit('currentPlayers', [players, currentPlayer]);
        
                // update all other players of the new player  - sends to all sockets
                socket.broadcast.emit('newPlayer', currentPlayer);
            });
    });

    // Tutorials
    socket.on('homeTutorialRun', async (data) => {
        const playerId = data.playerId;

        await UserModel.findOneAndUpdate({_id: playerId}, {$addToSet: {tutorials: 'home'}});
    });

    socket.on('gameTutorialRun', async (data) => {
        const playerId = data.playerId;

        await UserModel.findOneAndUpdate({_id: playerId}, {$addToSet: {tutorials: 'game'}});
    });

    socket.on('setupTutorialRun', async (data) => {
        const playerId = data.playerId;

        await UserModel.findOneAndUpdate({_id: playerId}, {$addToSet: {tutorials: 'setup'}});
    });
    
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
                rooms[roomID] = {roomID: roomID, player1: null, player2: null, player1Army: null, player2Army: null};
                socket.emit('createNewRoom', rooms[roomID]);
                roomID ++;
            } while (Object.keys(rooms).length < 8);

            socket.emit('runHomeTutorial');
        } else {
            socket.emit('listRooms', rooms);
        }
    });

    // List rooms
    socket.on('getRooms', () => {
        socket.emit('listRooms', rooms);
    });

    // Join a room 
    socket.on('joinRoom', (data) => {
        console.log('Player joins a room ');
        console.log(data.roomID);

        // Remove player from all other rooms
        Object.keys(rooms).forEach(roomID => {
            if (rooms[roomID].player1 && rooms[roomID].player1.playerId === data.player.playerId) {
                rooms[roomID].player1 = null;
                rooms[roomID].player1Army = null;
                
                socket.leave(roomID);
            }
            if (rooms[roomID].player2 && rooms[roomID].player2.playerId === data.player.playerId) {
                rooms[roomID].player2 = null;
                rooms[roomID].player2Army = null;

                socket.leave(roomID);
            }
        });

        if (data.side === 'left') {
            rooms[data.roomID].player1 = data.player;
            rooms[data.roomID].player1Army = null;
        } else if (data.side === 'right') {
            rooms[data.roomID].player2 = data.player;
            rooms[data.roomID].player2Army = null;
        }
        
        console.log('player ' + players[socket.id].playerId + ' joined a room ' + data.roomID);
        console.log(rooms[data.roomID]);
        socket.join(data.roomID);

        // TODO: Make this so it only updates that one room instead of relisting all of them
        // io.emit('listRooms', rooms);
        io.emit('updateRooms', rooms);

        // TODO: If both slots are full start a game
        if (rooms[data.roomID].player1 != null && rooms[data.roomID].player2 != null) {
            const roomData = rooms[data.roomID];
            io.in(data.roomID).emit('startGame', roomData);
        }
    });

    // Both armies are ready to fight
    socket.on('selectedArmy', (data) => {
        if (data.player === 'left') {
            rooms[data.roomID].player1Army = data.army;
        } else  if (data.player === 'right') {
            rooms[data.roomID].player2Army = data.army;
        } 

        console.log('Room Data - Selected Army');
        console.log(rooms[data.roomID]);
        if (rooms[data.roomID].player1Army && rooms[data.roomID].player2Army) {
            io.in(data.roomID).emit('armiesSelected', rooms[data.roomID]);
        }
    });

    // Clear all rooms from a player
    socket.on('clearPlayerFromRooms', (data) => {
        console.log('Clear player from rooms');
        Object.keys(rooms).forEach(roomID => {
            if (rooms[roomID].player1 && rooms[roomID].player1.playerId === data.playerId) {
                rooms[roomID].player1 = null;
                rooms[roomID].player1Army = null;
            }
            if (rooms[roomID].player2 && rooms[roomID].player2.playerId === data.playerId) {
                rooms[roomID].player2 = null;
                rooms[roomID].player2Army = null;
            }
        });
    
        // io.emit('listRooms', rooms);
        io.emit('updateRooms', rooms);
    });

    // Leave a room
    socket.on('leaveRoom', (data) => {
        console.log('Player leaves a room ');
        console.log(data.roomID);

        if (data.side === 'left') {
            rooms[data.roomID].player1 = null;
            rooms[data.roomID].player1Army = null;
        } else if (data.side === 'right') {
            rooms[data.roomID].player2 = null;
            rooms[data.roomID].player2Army = null;
        }

        socket.leave(data.roomID);

        // TODO: Make this so it only updates that one room instead of relisting all of them
        // socket.broadcast.emit('listRooms', rooms);
        // io.emit('listRooms', rooms);
        io.emit('updateRooms', rooms);
    });

    // Move a unit 
    socket.on('moveUnit', (data) => {

        // TODO: save to the database
        // Broadcast and emit the event
        // socket.to('room').broadcast.emit('moveUnitConfirmed', data);
        io.in(data.roomID).emit('moveUnitConfirmed', data);
        // socket.emit('moveUnitConfirmed', data);
    });

    // Unit action
    socket.on('unitAction', (data) => {
        data.result = {
            tiles: []
        };
        
        if (data.recievingTiles) {
            const action = data.actionUnit.action;
            let lastTile = null;
            let value;

            data.recievingTiles.forEach(tile => {
                let turn = false;
                if (tile.unit) {
                    // for dagger, let the unit turn before executing the second action
                    if (lastTile && lastTile.tileNum === tile.tileNum) {
                        tile.direction = directionOpposites[data.actionUnit.direction];
                        if (tile.currentHealth - value <= 0) {
                            tile.unit = null;
                        } else {
                            tile.currentHealth -= value;
                        }
                    }

                    // Test if the unit died on the daggers first assault
                    if (tile.unit) {
                        switch (action) {
                            case 'damage':
                                const modifier = tile.directionOfAttack ? directionsModifiers[tile.directionOfAttack][tile.direction] : 1; 
                    
                                if (!data.actionUnit.unblockable && (Math.random() * 100) < ((tile.dodge * modifier) * 100)) {
                                    turn = true;
                                    value = 0;
                                    data.result.tiles.push({
                                        tileNum: tile.tileNum,
                                        text: 'Dodge',
                                        turn: turn,
                                        action: 'damage',
                                        value: value,
                                        destroyed: false,
                                        directionOfAttack: tile.directionOfAttack
                                    });
                                } else if (!data.actionUnit.unblockable && (Math.random() * 100) < ((tile.block * modifier) * 100)) {
                                    turn = true;
                                    value = 0;
                                    data.result.tiles.push({
                                        tileNum: tile.tileNum,
                                        text: 'Block',
                                        turn: turn,
                                        action: 'damage',
                                        value: value,
                                        destroyed: false,
                                        directionOfAttack: tile.directionOfAttack
                                    });
                                } else {
                                    value = Math.round(data.actionUnit.offense * (1 - tile.defense));
                                    destroyed = false;
                                    if (tile.currentHealth - value <= 0) {
                                        value = tile.currentHealth;
                                        destroyed = true;
                                        
                                        // TODO: save game victory or lose
                                        rooms[data.roomID].player1 = null;
                                        rooms[data.roomID].player1Army = null;
                                        rooms[data.roomID].player2 = null;
                                        rooms[data.roomID].player2Army = null;

                                        // TODO: leave the room
                                        io.in(data.roomID).emit('gameOverLeaveRoom', {roomID: data.roomID});
                                        
                                        io.emit('updateRooms', rooms);
                                    };
                                    data.result.tiles.push({
                                        tileNum: tile.tileNum,
                                        text: '-' + value,
                                        turn: turn,
                                        action: 'damage',
                                        value: value,
                                        destroyed: destroyed,
                                        directionOfAttack: tile.directionOfAttack
                                    });
                                }
                                break;
                            case 'heal':
                                data.result.tiles.push({
                                    tileNum: tile.tileNum,
                                    text: '+' + data.actionUnit.offense,
                                    turn: false,
                                    action: 'heal',
                                    value: data.actionUnit.offense,
                                    destroyed: false,
                                    directionOfAttack: tile.directionOfAttack
                                });
                                break;
                            case 'stop':
                                data.result.tiles.push({
                                    tileNum: tile.tileNum,
                                    text: '+2 cooldown',
                                    turn: false,
                                    action: 'stop',
                                    value: 2,
                                    destroyed: false,
                                    directionOfAttack: tile.directionOfAttack
                                });
                                break;
                        }
                    } else {
                        data.result.tiles.push({
                            tileNum: tile.tileNum,
                        });
                    }
                } else {
                    data.result.tiles.push({
                        tileNum: tile.tileNum,
                    });
                }
                lastTile = tile;
            });
        }

        // Broadcast and emit the event
        // socket.to('room').broadcast.emit('moveUnitConfirmed', data);
        console.log('Attack data');
        console.log(data);
        io.in(data.roomID).emit('unitActionConfirmed', data);
        // socket.emit('moveUnitConfirmed', data);
    });
        

    // Change a units direction 
    socket.on('changeDirection', (data) => {
        console.log('change direction');
        console.log(data);
        // TODO: save to the database
        // Broadcast and emit the event
        // socket.to('room').broadcast.emit('moveUnitConfirmed', data);
        io.in(data.roomID).emit('changeDirectionConfirmed', data);
        // socket.emit('moveUnitConfirmed', data);
    });

    // End turn 
    socket.on('endTurn', (data) => {
        console.log('end turn');
        console.log(data);
        // TODO: save to the database
        // Broadcast and emit the event
        // socket.to('room').broadcast.emit('moveUnitConfirmed', data);
        io.in(data.roomID).emit('endTurnConfirmed', data);
        // socket.emit('moveUnitConfirmed', data);
    });

    // Game ended, leave the room
    socket.on('gameOverLeaveRoom', data => {
        socket.leave(data.roomID);
    });

    socket.on('quitGame', (data) => {
        console.log('quit game');
        console.log(data);

        rooms[data.roomID].player1 = null;
        rooms[data.roomID].player1Army = null;
        rooms[data.roomID].player2 = null;
        rooms[data.roomID].player2Army = null;

        // TODO: save the lose to the database
        io.in(data.roomID).emit('quitGameConfirmed');
        socket.leave(data.roomID);
        // io.emit('listRooms', rooms);
        io.emit('updateRooms', rooms);
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
        socket.emit('armySaved');
    });

    // Create default army
    socket.on('checkDefaultArmy', async (data) => {
        console.log('check default army');
        const playerId = data.playerId;
        const armyId = 0;

        await ArmyModel.findOne({playerId, armyId})
            .then(async (result) => {
                if (!result) {
                    const name = 'Default';
                    const units = [
                        {unit: 'bow', tileNum: 0},
                        {unit: 'control', tileNum: 2},
                        {unit: 'sorcery', tileNum: 6},
                        {unit: 'healing', tileNum: 16},
                        {unit: 'axe', tileNum: 17},
                        {unit: 'dagger', tileNum: 18},
                        {unit: 'lance', tileNum: 24},
                        {unit: 'shield', tileNum: 35},
                        {unit: 'sword', tileNum: 37},
                        {unit: 'shield', tileNum: 39}
                    ]
                    await ArmyModel.create({units, name, playerId, armyId});
                }

                await ArmyModel.find({playerId})
                    .then(async (result) => {
                        socket.emit('playerArmies', result);
                });

        })
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

            // This should end a game if the player disconnects
            console.log('rooms');
            console.log(rooms);
            //let roomID;
            const playerId = players[socket.id].playerId;
            Object.keys(rooms).forEach(roomID => {
                if (rooms[roomID].player1 && rooms[roomID].player1.playerId === playerId) {
                    console.log('player was player 1 in a room');
                    rooms[roomID].player1 = null;
                    rooms[roomID].player1Army = null;
                    //roomID = room;
                    
                    // io.to(rooms[room].player2.socketId).emit('quitGame', {roomID: room});
                }
                if (rooms[roomID].player2 && rooms[roomID].player2.playerId === playerId) {
                    console.log('player was player 2 in a room');
                    rooms[roomID].player2 = null;
                    rooms[roomID].player2Army = null;
                    //roomID = room;

                    // io.to(rooms[room].player1.socketId).emit('quitGame', {roomID: room});
                }
            });
            // console.log(roomID);
           // socket.emit('quitGame', {roomID: roomID});
            // socket.to(roomID).emit('quitGame', {roomID: roomID});
        }
        
        // io.emit('listRooms', rooms);
        io.emit('updateRooms', rooms);
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
