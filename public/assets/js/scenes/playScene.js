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

        // Add interactivity to each of the tiles in the board container
       //  this.boardContainer.iterate(this.addInteractionToBoardTiles);

        // Add a container for the units
        this.unitsBoard = this.add.container(0, 0);

        // Wait for Socket.IO to return both selected armies

        // The button to get back to the home page
        this.acceptButton = new Button({
            scene: this, 
            key: 'tile',
            text: 'QUIT',
            textConfig: CONSTANTS.TEXT_STYLE,
            event: 'QuitGame',
            alignmentGrid: this.alignmentGrid,
            index: 12
        });
        emitter.on('QuitGame', this.quitGame);
    }

    quitGame() {
        // Save the board placements to the database

        game.scene.start('HomeScene');
        game.scene.stop('PlayScene');
    }

    update() {
        // this.generateBoard.tileContainer.iterate(this.rotateTile);
        // this.tileContainer.iterate(this.rotateTile);
        // this.rotateTile(this.tileContainer);
    }


    onPointerdown() {
        // const x = this.x;
        // const y = this.y;

        // If there is no unit on this tile
        if (!this.unit) { 
            // If there is no unit selected - add the selected unit to this tile
            if (this.scene.unitSelected === false) {
                console.log('Add unit');
                // Try to get this automatically set somewhere
                this.unit = this.scene.add.existing(new Lance({
                    scene: this.scene, 
                    player: game.player,
                    tile: this,
                    container: this.scene.unitsBoard
                }));
                this.setTint(CONSTANTS.ORANGE_TINT);
            }
        // If there is a unit on this tile
        } else {
            // if (this.active) {
                // If this tile has a unit and it is the active unit - remove it's activity
                if (this === this.scene.selectedTileFrom) {
                //    this.active = false;
                    this.scene.unitSelected = false;
                    this.scene.selectedTileFrom = null;
                    this.setTint(CONSTANTS.ORANGE_TINT);
                // }
                // If this tile has a unit and it's not the active unit
            } else {
                // If there is no selected tile to move from - set this unit to the selected unit
                if (this.scene.selectedTileFrom === null) {
                    this.scene.unitSelected = true;
                    this.scene.selectedTileFrom = this;

                    this.setTint(CONSTANTS.RED_TINT);
                    // Highlight all tiles within unit's range
                    this.scene.highlightTilesInRange(this);

                // If this is the another unit - set them to active    
                } else {
                    this.scene.selectedTileFrom.clearTint();
                    this.scene.selectedTileFrom = false;

                    this.scene.selectedTileFrom = this;
                    this.scene.unitSelected = true;
                    this.setTint(CONSTANTS.RED_TINT);
                }
            }
        }

        // DO THE STUFF TO MOVE THEM OR REMOVE THEM FROM THE BOARD
        // else {

        // }
        // const character = this.scene.add.existing(new Unit(this.scene, x, y, 'character'));// , 'southEast', 100)));//this.scene.add.image(x, y, 'character');
        // character.setOrigin(.5, .5);

        // character.y = this.y;
    }


    // Set the highlight to all tiles in range
    highlightTilesInRange(tile) {
        // Get the range
        const unit = tile.unit;
        const movement = unit.movement;
        const generatedBoard = tile.scene.generatedBoard;
        // const scene = tile.scene;
        // const number = tile.number;
        let questionedTile;

        tile.path = [];

        const tilesOfInterest = [tile];

        console.log(generatedBoard);
        for (let i = 0; i < movement; i++) {
            tilesOfInterest.forEach(tileOfInterest => {

                // console.log(tileOfInterest);

                console.log(`Column ${tileOfInterest.column}  Row ${tileOfInterest.row}`)
                if (tileOfInterest.column - 1 >= 0) {
                    questionedTile = generatedBoard.board[tileOfInterest.row][tileOfInterest.column - 1];

                    // console.log(questionedTile);

                    // Will have to take into account friendly units in the Play Scene
                    if (questionedTile.unit === null) {
                        if (!tilesOfInterest.includes(questionedTile)) {
                            questionedTile.path = tileOfInterest.path;
                            questionedTile.path.push('up');
                            tilesOfInterest.push(questionedTile);
                        }
                    }
                }
                
                if (tileOfInterest.row + 1 < generatedBoard.mapRows) {
                    questionedTile = generatedBoard.board[tileOfInterest.row + 1][tileOfInterest.column]
                    if (questionedTile.unit === null) {
                        if (!tilesOfInterest.includes(questionedTile)) {
                            questionedTile.path = tileOfInterest.path;
                            questionedTile.path.push('right');
                            tilesOfInterest.push(questionedTile);
                        }
                    }
                }

                if (tileOfInterest.column + 1 < generatedBoard.mapColumns) {
                    questionedTile = generatedBoard.board[tileOfInterest.row][tileOfInterest.column + 1]
                    if (questionedTile.unit === null) {
                        if (!tilesOfInterest.includes(questionedTile)) {
                            questionedTile.path = tileOfInterest.path;
                            questionedTile.path.push('down');
                            tilesOfInterest.push(questionedTile);
                        }
                    }
                }
                
                if (tileOfInterest.row - 1 >= 0) {
                    questionedTile = generatedBoard.board[tileOfInterest.row - 1][tileOfInterest.column]
                    if (questionedTile.unit === null) {
                        if (!tilesOfInterest.includes(questionedTile)) {
                            questionedTile.path = tileOfInterest.path;
                            questionedTile.path.push('left');
                            tilesOfInterest.push(questionedTile);
                        }
                    }
                }
            });
        }

        tilesOfInterest.forEach(tileOfInterest => {
            if (tileOfInterest != tile) {
                tileOfInterest.setTint(CONSTANTS.YELLOW_TINT);
            }
        });

        // for (let i = 0; i < scene.boardContainer.mapRows; i++) {
        //     for (let j = 0; j < scene.boardContainer.mapColumns; j++) {
        //         const boardTile = scene.boardContainer.board[j][i];

        //         if (number - range < boardTile.number < number + range) {
        //             boardTile.inRange = true;
        //             boardTile.setTint(CONSTANTS.YELLOW_TINT);
        //         }
        //     }
        // }
    }

    // Iterate over all tiles and remove the tint
    removeAllHighlights(tile) {
        const scene = tile.scene;
        const boardContainer = scene.boardContainer;

        for (let i = 0; i < boardContainer.rows; i++) {
            for (let j = 0; j < boardContainer.columns; j++) {
                boardContainer[i][j].clearTint();
            }
        }
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