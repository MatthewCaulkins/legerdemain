class Controller {
    constructor() {
        this._id = this.getCookie('_id');

        emitter.on(CONSTANTS.GAME_LOADED, this.connectSocket);

        this.connected = false;
        this.otherPlayers = {};
        this.events = [];

        this.rooms = {};
        this.currentRoom;
    }

    
    getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    // Pay attention to the socket for every new player
    connectSocket() {
        console.log('connect to socket');
        console.log(`id : ${controller._id}`);
        const self = this;
        this.socket = io();
        controller.connected = true;

        this.socket.emit(CONSTANTS.GET_PLAYER_DATA, controller._id);

        // When a new player connects, get a list of all active players
        this.socket.on(CONSTANTS.CURRENT_PLAYERS, players => {
            console.log(players);
            game.player = players.pop();
            emitter.emit(CONSTANTS.CREATE_HUD);

            console.log('Connected');
            console.log(game.player);
            console.log(controller.otherPlayers);

            Object.keys(players).forEach(id => {
                for (const [key, value] of Object.entries(players[id])) {
                    console.log(`key ${key}`);
                    console.log(`value ${value}`);

                    if (key != game.player.socketId) {
                        console.log('Add player to list of other players');
                        controller.otherPlayers[key] = value;
                    }
                }
            });

            // Return that data is loaded
            console.log(controller.otherPlayers);
            this.socket.emit(CONSTANTS.GAME_SCREEN_REACHED, game.player.playerId);
        });

        // Get players armies
        this.socket.on(CONSTANTS.PLAYER_ARMIES, armies => {
            // Object.keys(armies).forEach(army => {
            game.player.armies = armies;
        });

        // Add a new player to the object
        this.socket.on(CONSTANTS.NEW_PLAYER, player => {
            console.log('New Player Connected');
            console.log(player);
            console.log(controller.otherPlayers);

            controller.otherPlayers[player.socketId] = player;
        });

        // Save this army
        if (!controller.events.includes(CONSTANTS.SAVE_ARMY)) {
            emitter.on(CONSTANTS.SAVE_ARMY, async (data) => {
                console.log('save army');
                game.player.armies[data.armyId] = data;
                this.socket.emit(CONSTANTS.SAVE_ARMY, data);
            });

            controller.events.push(CONSTANTS.SAVE_ARMY);
        }

        // Add a new room
        this.socket.on(CONSTANTS.CREATE_NEW_ROOM, data => {
            console.log('New Room Created');

            controller.rooms[data.roomID] = data;
            console.log(controller.rooms);
            emitter.emit(CONSTANTS.CREATE_NEW_ROOM, data);
        });

        // Returning to the home page, get all rooms
        emitter.on(CONSTANTS.GET_ROOMS, () => {
            this.socket.emit(CONSTANTS.GET_ROOMS);
        });

        // List the rooms when coming to the home screen
        this.socket.on(CONSTANTS.LIST_ROOMS, data => {
            // Reset rooms
            controller.rooms = {};

            console.log('list rooms data:');
            console.log(data);

            Object.keys(data).forEach(room => {
                console.log(room);
                emitter.emit(CONSTANTS.CREATE_NEW_ROOM, data[room]);
            });
        });

        // Have player join a room
        if (!controller.events.includes(CONSTANTS.JOIN_ROOM)) {
            emitter.on(CONSTANTS.JOIN_ROOM, async (data) => {
                console.log('player joins');
                console.log(data.player);
                console.log(data.side);
                console.log(data.roomID);

                // Remove the player from other rooms
                if (controller.currentRoom != null) {

                }

                if (data.side === CONSTANTS.LEFT) {
                    controller.rooms[data.roomID].player1 = data.player;
                } else if (data.side === CONSTANTS.RIGHT) {
                    controller.rooms[data.roomID].player2 = data.player;
                }

                console.log(controller.rooms);
                controller.currentRoom = controller.rooms[data.roomID];
                console.log(controller.currentRoom);
                // game.player.armies[data.armyId] = data;
                this.socket.emit(CONSTANTS.JOIN_ROOM, data);
            });

            controller.events.push(CONSTANTS.JOIN_ROOM);
        }

        // Add a player to the room
        this.socket.on('addPlayerToRoom', (data) => {


            if (data.side === CONSTANTS.LEFT) {
                controller.rooms[data.roomID].player1 = data.player;
            } else if (data.side === CONSTANTS.RIGHT) {
                controller.rooms[data.roomID].player2 = data.player;
            }
        });

        // Have a player leave a room
        if (!controller.events.includes(CONSTANTS.LEAVE_ROOM)) {
            emitter.on(CONSTANTS.LEAVE_ROOM, async (data) => {
                // console.log('player leaves');
                // console.log(data.player);
                // console.log(data.side);
                // console.log(data.roomID);

                // if (data.side === CONSTANTS.LEFT) {
                //     controller.rooms[data.roomID].player1 = data.player;
                // } else if (data.side === CONSTANTS.RIGHT) {
                //     controller.rooms[data.roomID].player2 = data.player;
                // }

                // console.log(controller.rooms)
                // // game.player.armies[data.armyId] = data;
                // this.socket.emit(CONSTANTS.LEAVE_ROOM, data);
            });

            controller.events.push(CONSTANTS.LEAVE_ROOM);
        }

        // Return when army is saved
        this.socket.on(CONSTANTS.ARMY_SAVED, () => {
            emitter.emit(CONSTANTS.ARMY_SAVED_NOTICE);
        });

        // Delete this army
        if (!controller.events.includes(CONSTANTS.DELETE_ARMY)) {
            emitter.on(CONSTANTS.DELETE_ARMY, async (data) => {
                console.log('delete Army');

                game.player.armies = game.player.armies.filter(army => {
                    return army.armyId != data.armyId;
                })
                console.log(game.player);
                this.socket.emit(CONSTANTS.DELETE_ARMY, data);
            });

            controller.events.push(CONSTANTS.DELETE_ARMY);
        }

        this.socket.on(CONSTANTS.ARMY_DELETED, () => {
            emitter.emit(CONSTANTS.ARMY_DELETED_NOTICE);
        });

        // Disconnect a player and delete their ID
        this.socket.on(CONSTANTS.DISCONNECT_PLAYER, (socketId) => {
            console.log('Player disconnected');
            console.log(socketId);
            console.log(controller.otherPlayers);

            delete controller.otherPlayers[socketId];
        });
    }
}