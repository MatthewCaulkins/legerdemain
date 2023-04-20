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
                console.log('create a new room');
                this.createNewRoom(room.id, room.player1, room.player2);
            });

            //     controller.events.push(CONSTANTS.CREATE_NEW_ROOM);
            // }
    }

    createNewRoom(roomID, player1, player2) {
        let matchmakingConfig = {
            scene: this.scene,
            container: this,
            roomID: roomID,
            x: this.offset + (this.multiplier * this.column),
            y: this.offset + (this.multiplier * this.row),
            player1: player1,
            player2: player2
        };
        controller.rooms[roomID] = new MatchmakingTile(matchmakingConfig);

        const rooms = Object.keys(controller.rooms).length;
        console.log(rooms);
        this.column = Math.floor(rooms / 2);
        console.log(this.column);
        this.row = rooms % 2;
        console.log(this.row);

        // if (player1) {
        //     controller.rooms[roomID].createUnit(CONSTANTS.LANCE, CONSTANTS.LEFT);
        // }
        // if (player2) {
        //     controller.rooms[roomID].createUnit(CONSTANTS.LANCE, CONSTANTS.RIGHT);
        // }
        // console.log(controller.rooms);
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