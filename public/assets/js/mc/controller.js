class Controller {
    constructor() {
        // emitter.on(CONSTANTS.ATTACK_SOUND, this.playAttackSound);
        this.connectSocket();
    }

    // Pay attention to the socket for every new player
    connectSocket() {
        const self = this;
        this.socket = io();

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
                console.log('PlayerID');
                console.log(id);
                console.log('Player is');
                console.log(players[id]);

                for (const [key, value] of Object.entries(players[id])) {
                    if(key === playerId) {
                        game.player = value;
                        console.log('Player is found');
                        return;
                    }
                    // console.log('Key');
                    // console.log(key);
                    // console.log('Value');
                    // console.log(value);
                }
                // if (players[id].playerId === playerId) {
                //     game.player = players[id];
                // }

                // Object.keys(players[id]).forEach(key => {
                //     console.log('the keys of players');
                //     console.log(key)
                // });
            //     // const player = players[id];
            //     const player = players[playerID];
            //     if (players[id] === players[playerID]) {
            //         console.log('add player');
            //         console.log(player);
            //         // game.player = {
            //         //     name: player.name,
            //         //     units: player.units 
            //         // };
            //         game.player = player;  // self?
                    // addPlayer(self, players[id]);
                // };
            });
        });

        this.socket.emit('gameScreenReached');

        this.socket.on('newPlayer', player => {
            if (player !== game.player) {
                game.otherPlayers.push(player);
                console.log('New Player connected');
            }
        })
    }
}