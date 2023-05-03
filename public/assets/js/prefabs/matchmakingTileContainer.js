class MatchmakingTileContainer extends Phaser.GameObjects.Container {
    constructor(config) {
        const x = config.x;
        const y = config.y;
        const width = config.width;
        const height = config.height;

        super(config.scene, x, y);
        this.setSize(width, height);

        this.multiplier = 240;
        this.offset = 100; 
        this.row = 0;
        this.column = 0;
        // this.setOrigin(0, 0);

        // Add Background so it's easy to find
        const background = this.scene.make.graphics({add: false})
            .fillStyle(0xffffff, 1)
            .fillRect(0, 0, width, height);
        this.add(background);

        // Add a mask to this container
        const mask = this.scene.make.graphics({add: false})
            .fillStyle(0xffffff, .5)
            .fillRect(x, y, width, height);
        this.mask = new Phaser.Display.Masks.GeometryMask(this, mask);

        // Add to the scene
        this.scene.add.existing(this);

        // TODO: Create all active rooms


            // Keep a record of all active games
            // this.rooms = {};

            // TODO: make this triggered by socket io and given a room ID
            // let roomID = 1;

            // if (!controller.events.includes(CONSTANTS.CREATE_NEW_ROOM)) {
            emitter.on(CONSTANTS.CREATE_NEW_ROOM, room => {
                // console.log('create a new room');
                // console.log(room);
                this.createNewRoom(room);
            });

            emitter.on(CONSTANTS.CREATE_ROOMS, async data => {
                await Object.keys(data).forEach(async (room) => {
                    await this.createNewRoom(data[room]);
                });

                emitter.emit(CONSTANTS.MATCHMAKING_TILES_CREATED);
            })

            // Update rooms with new players
            emitter.on(CONSTANTS.UPDATE_ROOMS, data => {
                Object.keys(data).forEach(roomID => {
                    // console.log(data[room]);
                    const room = data[roomID];

                    controller.rooms[room.roomID].updateRoom(room);
                });
            });
            
            //     controller.events.push(CONSTANTS.CREATE_NEW_ROOM);
            // }
    }

    createNewRoom(room) {
        const roomObj = Object.keys(controller.rooms).length;
        // console.log(rooms);
        this.column = roomObj === 0 ? 0 : Math.floor(roomObj / 2);
        // console.log(this.column);
        this.row = roomObj % 2;
        // console.log(this.row);
        // console.log('PLAYER 1 MATCHMAKING TILE CONTAINER');
        // console.log(player1);
        // console.log('PLAYER 2 MATCHMAKING TILE CONTAINER');
        // console.log(player2);

        let matchmakingConfig = {
            scene: this.scene,
            container: this,
            roomID: room.roomID,
            x: this.offset + (this.multiplier * this.column),
            y: this.offset + (this.multiplier * this.row),
            player1: room.player1,
            player1Army: room.player1Army,
            player2: room.player2,
            player2Army: room.player2Army,
        };
        const matchmakingTile = new MatchmakingTile(matchmakingConfig);
        // console.log(matchmakingTile);
        controller.rooms[room.roomID] = matchmakingTile;
        // console.log(controller.rooms[roomID]);

        // if (player1) {
        //     controller.rooms[roomID].createUnit(CONSTANTS.LANCE, CONSTANTS.LEFT, player1);
        // }
        // if (player2) {
        //     controller.rooms[roomID].createUnit(CONSTANTS.LANCE, CONSTANTS.RIGHT, player2);
        // }

        return;
    }

    
    // moveContainers() {
    //     // console.log('move container '+ this.rooms['container1'].x);
    //     // this.rooms['container1'].x -= 5;
    //     // this.rooms['container1'].y -= 5;

    //     // if (this.rooms['container1'].x < -150) {
    //     //     this.rooms['container1'].x = gameWidth;
    //     // }
    //     // if (this.rooms['container1'].y < -150) {
    //     //     this.rooms['container1'].y = gameHeight;
    //     // }
    // }
}