class PlayScene extends Phaser.Scene {
    constructor() {
        super({key: 'PlayScene'});
    }

    preload() {
        this.load.image('tile', 'assets/img/tile.png');
        this.load.image('character', 'assets/img/characterHolder.png');
    }

    create() {
        model.currentScene = this;

        // Setup the alignment grid for testing purposes
        this.alignmentGrid = new AlignmentGrid({rows: 11, columns: 11, scene: this});
        this.alignmentGrid.showCellIndex();

        // Create the container for the board and units
        this.boardContainer = this.add.container(0, 0);
        this.boardContainer.setInteractive();

        const boardConfig = {
            tileWidth: 75,
            tileHeight: 75,
            mapRows: 11,
            mapColumns: 11,
            scale: .70,
            scene: this,
            container: this.boardContainer,
            orientation: CONSTANTS.BOARD_ORIENTATION
        }

        this.generateBoard = new GenerateBoard(boardConfig);

        // console.log('create function');
        // const self = this;
        // this.socket = io();
        // this.socket.on('currentPlayers', function(players) {
        //     console.log('Current players called');
        //     console.log(players);
        //     Object.keys(players).forEach(id => {
        //         if (players[id].playerId === self.socket.io) {

        //             console.log('add player');
        //             // addPlayer(self, players[id]);
        //         };
        //     });
        // });
        // Add a container for the tiles and make sure they can be interacted with
        // this.tileContainer = this.add.container(0, 0);
        // this.tileContainer.setInteractive();

        // this.buildMap();
    }

    update() {
        // this.generateBoard.tileContainer.iterate(this.rotateTile);
        // this.tileContainer.iterate(this.rotateTile);
        // this.rotateTile(this.tileContainer);
    }

    // rotateTile(tile) {
    //     const rotation = tile.rotation;

    //     tile.setRotation(rotation + .01);
    // }

    // buildMap() {
    //     const tileWidth = 75;
    //     const tileHeight = 75; // data.tileheight;
    //     const tileOffset = .75;

    //     let tileWidthHalf = tileWidth * 2 / 3;
    //     let tileHeightHalf = tileHeight * 2 / 3;

    //     // const layer = data.layers[0].data;

    //     const mapRows = 3; //5; // data.layers[0].width;
    //     const mapColumns = 8; //5; //data.layers[0].height;

    //     // const centerX = mapRows * tileWidthHalf;
    //     const centerX = (gameWidth / 2) - (.5 * mapRows * tileWidth)
    //     // const centerY = 16;
    //     const centerY = (gameHeight / 2) - (.5 * mapColumns * tileHeight);

    //     let i = 0;

    //     // Need to make this more mobile friendly.  Make the container, fill the things in it, then rotate the container.
    //     for (let y = 0; y < mapColumns; y++)
    //     {
    //         for (let x = 0; x < mapRows; x++)
    //         {
    //             // const id = layer[i] - 1;

    //             const tx = (x - y) * tileWidthHalf;
    //             const ty = (x + y) * tileHeightHalf;

    //             //const tx = (gameWidth / 2) - (.5 * mapRows * tileWidth);
    //             //const ty = (gameHeight / 2) - (.5 * mapColumns * tileHeight);

    //             const tile = this.add.image(tx + centerX, ty + centerY, 'tile'); // centerX + tx, centerY + ty
    //             tile.setInteractive();
    //             tile.on('pointerover', this.onPointerover.bind(tile));
    //             tile.on('pointerout', this.onPointerout.bind(tile));

    //             tile.depth = x + y; // ty
    //             tile.setOrigin(0.5, 0.5);
    //             tile.setRotation(0.785398);

    //             this.tileContainer.add(tile);
    //             i++;
    //         }
    //     }

    //     // Gotta figure out how to make this mobile friendly
    //     // this.tileContainer.scaleX = .5;
    //     // this.tileContainer.scaleY = .5;

    //     // Trying to set the container to be the rotated and scaled to the contents
    //     // this.tileContainer.setSize(tileWidth * mapTileWidth, tileHeight * mapTileHeight);
    //     // this.tileContainer.setOrigin(tileWidth * mapTileWidth * .5, tileHeight * mapTileHeight * .5);
    //     // this.tileContainer.setRotation(.785398);

    //     //this.tileContainer.setPosition(gameWidth - (.5 * mapTileWidth * tileWidth), gameHeight - (.5 * mapTileHeight * tileHeight));

    // }
}