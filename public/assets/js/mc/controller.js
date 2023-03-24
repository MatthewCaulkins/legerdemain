class Controller {
    constructor() {
        // emitter.on(CONSTANTS.ATTACK_SOUND, this.playAttackSound);
        this.connectSocket();
    }

    // Pay attention to the socket for every new player
    connectSocket() {
        console.log('create function');
        const self = this;
        this.socket = io();
        this.socket.on('currentPlayers', players => {
            console.log('Current players called');
            console.log(players);
            Object.keys(players).forEach(id => {
                if (players[id].playerId === self.socket.io) {

                    console.log('add player');
                    // addPlayer(self, players[id]);
                };
            });
        });

        this.socket.on('newPlayer', players => {
            console.log('New Player connected');
        })
    }
}