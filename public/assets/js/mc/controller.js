class Controller {
    constructor() {
        this._id = this.getCookie('_id');

        emitter.on(CONSTANTS.GAME_LOADED, this.connectSocket);

        this.connected = false;
        this.otherPlayers = {};
        this.events = [];

        this.rooms = {};
        // this.currentRoom;

        this.gameRoom;
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
        // console.log('connect to socket');
        // console.log(`id : ${controller._id}`);
        const self = this;
        this.socket = io();
        controller.connected = true;

        this.socket.emit(CONSTANTS.GET_PLAYER_DATA, controller._id);

        // When a new player connects, get a list of all active players
        this.socket.on(CONSTANTS.CURRENT_PLAYERS, players => {
            // console.log(players);
            game.player = players.pop();
            emitter.emit(CONSTANTS.CREATE_HUD);

            console.log('Connected');
            console.log(game.player);
            // console.log(controller.otherPlayers);

            Object.keys(players).forEach(id => {
                for (const [key, value] of Object.entries(players[id])) {
                    // console.log(`key ${key}`);
                    // console.log(`value ${value}`);

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
            emitter.on(CONSTANTS.SAVE_ARMY, (data) => {
                console.log('save army');
                game.player.armies[data.armyId] = data;
                this.socket.emit(CONSTANTS.SAVE_ARMY, data);
            });

            controller.events.push(CONSTANTS.SAVE_ARMY);
        }

        // Add a new room
        this.socket.on(CONSTANTS.CREATE_NEW_ROOM, data => {
            // console.log('New Room Created');

            // controller.rooms[data.roomID] = data;
            // console.log(controller.rooms);
            emitter.emit(CONSTANTS.CREATE_NEW_ROOM, data);
        });

        // Returning to the home page, get all rooms
        if (!controller.events.includes(CONSTANTS.GET_ROOMS)) {
            emitter.on(CONSTANTS.GET_ROOMS, () => {
                this.socket.emit(CONSTANTS.GET_ROOMS);
            });
            controller.events.push(CONSTANTS.GET_ROOMS);
        }

        // List the rooms when coming to the home screen
        this.socket.on(CONSTANTS.LIST_ROOMS, (data) => {
            // console.log(controller.rooms);
            Object.keys(controller.rooms).forEach(room => {
                controller.rooms[room].destroy();
            });
            // console.log(controller.rooms);

            // Reset rooms
            controller.rooms = {};
            // console.log(controller.rooms);

            // console.log('list rooms data:');
            // console.log(data);

            Object.keys(data).forEach(room => {
                // console.log(data[room]);
                emitter.emit(CONSTANTS.CREATE_NEW_ROOM, data[room]);
            });

            // Get the new room reference after units have been added
            // if (controller.currentRoom) {
            //     controller.currentRoom = controller.rooms[controller.currentRoom.roomID];
            // }
        });

        this.socket.on(CONSTANTS.UPDATE_ROOMS, (data) => {
            emitter.emit(CONSTANTS.UPDATE_ROOMS, data);
        });

        // Have player join a room
        if (!controller.events.includes(CONSTANTS.JOIN_ROOM)) {
            emitter.on(CONSTANTS.JOIN_ROOM, (data) => {
                // console.log('player joins');
                // console.log(data);

                // Remove the player from other rooms
                // if (controller.currentRoom != null) {
                //     console.log(controller.currentRoom);
                //     console.log(controller.currentRoom.player1);
                //     let side;
                //     if (controller.currentRoom.player1.playerId === game.player.playerId){
                //         side = CONSTANTS.LEFT;
                //     } else if (controller.currentRoom.player2.playerId === game.player.playerId) {
                //         side = CONSTANTS.RIGHT;
                //     }
                //     const leaveData = {
                //         player: game.player, side: side, roomID: controller.currentRoom.roomID
                //     };
                //     emitter.emit(CONSTANTS.LEAVE_ROOM, leaveData);
                // }

                // if (data.side === CONSTANTS.LEFT) {
                //     controller.rooms[data.roomID].player1 = data.player;
                // } else if (data.side === CONSTANTS.RIGHT) {
                //     controller.rooms[data.roomID].player2 = data.player;
                // }

                // console.log(controller.rooms);
                // controller.currentRoom = controller.rooms[data.roomID];
                // console.log(controller.currentRoom);
                // game.player.armies[data.armyId] = data;
                this.socket.emit(CONSTANTS.JOIN_ROOM, data);
            });

            controller.events.push(CONSTANTS.JOIN_ROOM);
        }

        // Clear the player from all rooms
        if (!controller.events.includes(CONSTANTS.CLEAR_PLAYER_FROM_ROOMS)) {
            emitter.on(CONSTANTS.CLEAR_PLAYER_FROM_ROOMS, () => {
                this.socket.emit(CONSTANTS.CLEAR_PLAYER_FROM_ROOMS, {playerId: game.player.playerId});
            });

            controller.events.push(CONSTANTS.CLEAR_PLAYER_FROM_ROOMS);
        }

        // Have a player leave a room
        if (!controller.events.includes(CONSTANTS.LEAVE_ROOM)) {
            emitter.on(CONSTANTS.LEAVE_ROOM, (data) => {
                // console.log('player leaves');
                // console.log(data.player);
                // console.log(data.side);
                // console.log(data.roomID);

                // if (data.side === CONSTANTS.LEFT) {
                //     controller.rooms[data.roomID].player1 = null;
                // } else if (data.side === CONSTANTS.RIGHT) {
                //     controller.rooms[data.roomID].player2 = null;
                // }

                // console.log(controller.rooms)
                // // game.player.armies[data.armyId] = data;
                // controller.currentRoom = null;
                this.socket.emit(CONSTANTS.LEAVE_ROOM, data);
            });

            controller.events.push(CONSTANTS.LEAVE_ROOM);
        }

        // Start a game
        this.socket.on(CONSTANTS.START_GAME, data => {
            // console.log('startgame');
            // console.log(data);
            controller.gameRoom = data;
            console.log('game room');
            console.log(controller.gameRoom);
            emitter.emit(CONSTANTS.START_GAME);
        });

        // Select your army 
        if (!controller.events.includes(CONSTANTS.SELECTED_ARMY)) {
            emitter.on(CONSTANTS.SELECTED_ARMY, (data) => {
                this.socket.emit(CONSTANTS.SELECTED_ARMY, data);
            });
            controller.events.push(CONSTANTS.SELECTED_ARMY);
        }

        // Both armies selected
        this.socket.on(CONSTANTS.ARMIES_SELECTED, data => {
            console.log('armies selected');
            console.log(data);
            // controller.gameRoom = data;
            controller.gameRoom = data;
            // console.log(controller);
            emitter.emit(CONSTANTS.ARMIES_SELECTED);
        });
        
        // Move a unit
        if (!controller.events.includes(CONSTANTS.MOVE_UNIT)) {
            emitter.on(CONSTANTS.MOVE_UNIT, (data) => {
                this.socket.emit(CONSTANTS.MOVE_UNIT, data);
            });

            controller.events.push(CONSTANTS.MOVE_UNIT);
        }

        this.socket.on(CONSTANTS.MOVE_UNIT_CONFIRMED, (data) => {
            emitter.emit(CONSTANTS.MOVE_UNIT_CONFIRMED, data);
        });

        // Unit action
        if (!controller.events.includes(CONSTANTS.UNIT_ACTION)) {
            emitter.on(CONSTANTS.UNIT_ACTION, (data) => {
                this.socket.emit(CONSTANTS.UNIT_ACTION, data);
            });

            controller.events.push(CONSTANTS.UNIT_ACTION);
        }

        this.socket.on(CONSTANTS.UNIT_ACTION_CONFIRMED, (data) => {
            emitter.emit(CONSTANTS.UNIT_ACTION_CONFIRMED, data);
        });

        // Change unit direction
        if (!controller.events.includes(CONSTANTS.CHANGE_DIRECTION)) {
            console.log('change directions');
            emitter.on(CONSTANTS.CHANGE_DIRECTION, (data) => {
                this.socket.emit(CONSTANTS.CHANGE_DIRECTION, data);
            });

            controller.events.push(CONSTANTS.CHANGE_DIRECTION);
        }

        this.socket.on(CONSTANTS.CHANGE_DIRECTION_CONFIRMED, (data) => {
            console.log('confirmed change direction');
            emitter.emit(CONSTANTS.CHANGE_DIRECTION_CONFIRMED, data);
        });

        // Wait and end turn
        if (!controller.events.includes(CONSTANTS.END_TURN)) {
            console.log('end turn');
            emitter.on(CONSTANTS.END_TURN, (data) => {
                this.socket.emit(CONSTANTS.END_TURN, data);
            });

            controller.events.push(CONSTANTS.END_TURN);
        }

        this.socket.on(CONSTANTS.END_TURN_CONFIRMED, (data) => {
            console.log('confirm end turn');
            emitter.emit(CONSTANTS.END_TURN_CONFIRMED, data);
        });

        // Quit the game
        if (!controller.events.includes(CONSTANTS.QUIT_GAME)) {
            console.log('controller quit game');
            emitter.on(CONSTANTS.QUIT_GAME, (data) => {
                this.socket.emit(CONSTANTS.QUIT_GAME, data);
            });

            controller.events.push(CONSTANTS.QUIT_GAME);
        }

        this.socket.on(CONSTANTS.QUIT_GAME_CONFIRMED, () => {
            console.log('confirm quit game');
            emitter.emit(CONSTANTS.QUIT_GAME_CONFIRMED);
        });

        // Return when army is saved
        this.socket.on(CONSTANTS.ARMY_SAVED, () => {
            emitter.emit(CONSTANTS.ARMY_SAVED_NOTICE);
        });

        // Delete this army
        if (!controller.events.includes(CONSTANTS.DELETE_ARMY)) {
            emitter.on(CONSTANTS.DELETE_ARMY, (data) => {
                // console.log('delete Army');

                game.player.armies = game.player.armies.filter(army => {
                    return army.armyId != data.armyId;
                })
                // console.log(game.player);
                this.socket.emit(CONSTANTS.DELETE_ARMY, data);
            });

            controller.events.push(CONSTANTS.DELETE_ARMY);
        }

        this.socket.on(CONSTANTS.ARMY_DELETED, () => {
            emitter.emit(CONSTANTS.ARMY_DELETED_NOTICE);
        });

        // Disconnect a player and delete their ID
        this.socket.on(CONSTANTS.DISCONNECT_PLAYER, (socketId) => {
            // console.log('Player disconnected');
            // console.log(socketId);
            // console.log(controller.otherPlayers);

            if (controller.gameRoom) {
                if (controller.gameRoom.player1.playerId === game.player.playerId) {
                    if (controller.gameRoom.player2.socketId === socketId) {
                        emitter.emit(CONSTANTS.QUIT_GAME, {roomID: controller.gameRoom.roomID});
                    }
                } else if (controller.gameRoom.player2.playerId === game.player.playerId) {
                    if (controller.gameRoom.player1.socketId === socketId) {
                        emitter.emit(CONSTANTS.QUIT_GAME, {roomID: controller.gameRoom.roomID});
                    }
                }
            }

            

            delete controller.otherPlayers[socketId];
        });

        this.socket.on('disconnect', () => {
            console.log('disconnect');

            console.log(window);

            window.location.replace('/'); //index.html
        });
    }
}