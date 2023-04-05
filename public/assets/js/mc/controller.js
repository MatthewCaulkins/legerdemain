class Controller {
    constructor() {
        emitter.on('gameLoaded', this.connectSocket);
        
        this.otherPlayers = [];
    }

    // Pay attention to the socket for every new player
    connectSocket() {
        const self = this;
        this.socket = io();

        console.log('this');
        console.log(this);
        console.log('game');
        console.log(game);
        console.log(controller);

        this.socket.on('currentPlayers', players => {
            console.log('Current players called');
            console.log(players);

            const playerId = players.pop();

            console.log('player ID');
            console.log(playerId);

            // game.allPlayers = players;
            // game.player = currentPlayer;
            // console.log(self);
            Object.keys(players).forEach(id => {
                for (const [key, value] of Object.entries(players[id])) {
                    if(key === playerId) {
                        game.player = value;
                        console.log('Player is found');
                        console.log('Game Scene');
                        console.log(game.scene);

                        emitter.emit('createHUD');
                        return;
                    } else {
                        controller.otherPlayers.push(value);
                    }
                }
            });
        });

        this.socket.emit('gameScreenReached');

        this.socket.on('newPlayer', player => {
            if (player !== game.player) {
                controller.otherPlayers.push(player);
                console.log('New Player connected');
            }

            console.log(controller.otherPlayers);
        });

        emitter.on('saveArmy', async (data) => {
            console.log(data);
            console.log('Save Army');
            this.socket.emit('saveArmy', data);
        });

        
        this.socket.on('armySaved', () => {
            console.log('Army Saved');
            emitter.emit('armySaved');
        })
    }
}