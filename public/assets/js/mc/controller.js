class Controller {
    constructor() {
        emitter.on('gameLoaded', this.connectSocket);
        
        this.otherPlayers = {};
        this.playerArmies = [];
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
            controller.playerArmies = armies;
        });


        // Add a new player to the object
        this.socket.on(CONSTANTS.NEW_PLAYER, player => {
            console.log('New Player Connected');
            console.log(controller.otherPlayers);

            controller.otherPlayers[player.socketId] = player;
        });

        // Save this army
        emitter.on(CONSTANTS.SAVE_ARMY, async (data) => {
            controller.playerArmies[data.armyId] = data;
            this.socket.emit(CONSTANTS.SAVE_ARMY, data);
        });

        // Return when army is saved
        this.socket.on(CONSTANTS.ARMY_SAVED, () => {
            emitter.emit(CONSTANTS.ARMY_SAVED);
        });

        // Disconnect a player and delete their ID
        this.socket.on(CONSTANTS.DISCONNECT_PLAYER, (socketId) => {
            console.log('Player disconnected');
            console.log(controller.otherPlayers);

            delete controller.otherPlayers[socketId];
        });
    }
}