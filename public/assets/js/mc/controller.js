class Controller {
    constructor() {
        emitter.on('gameLoaded', this.connectSocket);
        
        this.otherPlayers = {};
    }

    // Pay attention to the socket for every new player
    connectSocket() {
        const self = this;
        this.socket = io();

        // When a new player connects, get a list of all active players
        this.socket.on(CONSTANTS.CURRENT_PLAYERS, players => {
            game.player = players.pop();
            emitter.emit(CONSTANTS.CREATE_HUD);

            console.log('Connected');
            console.log(controller.otherPlayers);

            Object.keys(players).forEach(id => {
                for (const [key, value] of Object.entries(players[id])) {
                    if (key != game.player.socketId) {
                        controller.otherPlayers[key] = value;
                    }
                }
            });

            // Return that data is loaded
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
            console.log(controller.otherPlayers);

            controller.otherPlayers[player.socketId] = player;
        });

        // Save this army
        emitter.on(CONSTANTS.SAVE_ARMY, async (data) => {
            console.log('save army');
            game.player.armies[data.armyId] = data;
            this.socket.emit(CONSTANTS.SAVE_ARMY, data);
        });

        // Return when army is saved
        this.socket.on(CONSTANTS.ARMY_SAVED, () => {
            emitter.emit(CONSTANTS.ARMY_SAVED_NOTICE);
        });

        // Delete this army
        emitter.on(CONSTANTS.DELETE_ARMY, async (data) => {
            console.log('delete Army');

            game.player.armies = game.player.armies.filter(army => {
                return army.armyId != data.armyId;
            })
            console.log(game.player);
            this.socket.emit(CONSTANTS.DELETE_ARMY, data);
        });

        this.socket.on(CONSTANTS.ARMY_DELETED, () => {
            emitter.emit(CONSTANTS.ARMY_DELETED_NOTICE);
        });

        // Disconnect a player and delete their ID
        this.socket.on(CONSTANTS.DISCONNECT_PLAYER, (socketId) => {
            console.log('Player disconnected');
            console.log(controller.otherPlayers);

            delete controller.otherPlayers[socketId];
        });
    }
}