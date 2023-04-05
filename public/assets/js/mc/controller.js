class Controller {
    constructor() {
        emitter.on('gameLoaded', this.connectSocket);
    }

    // Pay attention to the socket for every new player
    connectSocket() {
        const self = this;
        this.socket = io();

        console.log('this');
        console.log(this);
        console.log('game');
        console.log(game);

        this.socket.on('currentPlayers', players => {
            console.log('Current players called');
            console.log(players);

            const playerId = players[players.length - 1];

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
                    }
                }
                game.otherPlayers = [];
                console.log('other players');
                console.log(game.otherPlayers);
            });
        });

        this.socket.emit('gameScreenReached');

        this.socket.on('newPlayer', player => {
            console.log(player);
            console.log('game');
            console.log(game);
            if (player !== game.player) {
                game.otherPlayers.push(player);
                console.log('New Player connected');
            }

            console.log(game.otherPlayers);
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