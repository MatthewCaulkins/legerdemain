class SetupScene extends Phaser.Scene {
    constructor() {
        super({key: 'SetupScene'}); 
    }

    // init(config) {
    //     this.message = config.message;
    // }

    preload() {
        this.load.image('tile', 'assets/img/tile.png');
        
        this.load.image('lanceCharacter', 'assets/img/characterHolder.png');
        this.load.image('lanceTint', 'assets/img/characterTint.png');
    }

    create() {
        model.currentScene = this;

        // Flags for states of the scene
        this.boardTileSelected = false;
        this.boardTile = null; 
        // this.selectedTileTo = null; 

        // The tile of the unit to place
        this.selectGridTile = null;

        this.unitsPlaced = 0;

        // this.selectGridTile = new Lance({
        //     scene: this.scene, 
        //     player: game.player,
        //     tile: this,
        //     container: this.scene.unitsBoard
        // });
        
        // Setup the alignment grid for testing purposes
        this.alignmentGrid = new AlignmentGrid({rows: 11, columns: 11, scene: this});
        this.alignmentGrid.showCellIndex();

        // Create the container for the board and generate it
        this.boardContainer = this.add.container(0, 0);
        this.boardContainer.setInteractive();

        const boardConfig = {
            tileWidth: 75,
            tileHeight: 75,
            mapRows: 3,
            mapColumns: 11,
            scale: .75,
            scene: this,
            container: this.boardContainer,
            orientation: CONSTANTS.BOARD_ORIENTATION
        }

        this.generatedBoard = new GenerateBoard(boardConfig);

        // Add interactivity to each of the tiles in the board container
        this.boardContainer.iterate(this.addInteractionToBoardTiles);

        // Add a container for the units
        this.unitsBoard = this.add.container(0, 0);


        // Make a Unit Board class
        // const unitsBoardConfig = {
        //     tileWidth: this.alignmentGrid.cellWidth,
        //     tileHeight: this.alignmentGrid.cellHeight,
        //     mapRows: 3,
        //     mapColumns: 4,
        //     scale: 1,
        //     scene: this,
        //     container: this.boardContainer
        // }

        // this.unitsBoard = new GenerateBoard(unitsBoardConfig);
        // Parse units
        this.units = [];
        game.player.units.forEach(unit => {            
            switch(unit.unit) {
                case 'axe':
                    for (let i = 0; i < unit.num; i ++) {
                        this.units.push('axe');
                    }
                    break;
                case 'bow':
                    for (let i = 0; i < unit.num; i ++) {
                        this.units.push('bow');
                    }
                    break;
                case 'control':
                    for (let i = 0; i < unit.num; i ++) {
                        this.units.push('control');
                    }
                    break;
                case 'dagger':
                    for (let i = 0; i < unit.num; i ++) {
                        this.units.push('dagger');
                    }
                    break;
                case 'healing':
                    for (let i = 0; i < unit.num; i ++) {
                        this.units.push('healing');
                    }
                    break;
                case 'lance':
                    for (let i = 0; i < unit.num; i ++) {
                        this.units.push('lance');
                    }
                    break;
                case 'shield':
                    for (let i = 0; i < unit.num; i ++) {
                        this.units.push('shield');
                    }
                    break;
                case 'sorcery':
                    for (let i = 0; i < unit.num; i ++) {
                        this.units.push('sorcery');
                    }
                    break;
                case 'sword':
                    for (let i = 0; i < unit.num; i ++) {
                        this.units.push('sword');
                    }
                    break;
            }
        });


        // Player Select Units container
        this.selectGridContainer = this.add.container(0, 0);
        this.selectGridContainer.setInteractive();
        
        // Position the units board
        const selectGridConfig = {
            scene: this,
            // alignmentGrid: this.alignmentGrid,
            tileWidth: 100,
            tileHeight: 100,
            gridRows: 3,
            gridColumns: 6,
            scale: 1,
            container: this.selectGridContainer,
            units: this.units,
            player: game.player
        }
        this.selectGrid = new SelectUnitsGrid(selectGridConfig);
        
        this.alignmentGrid.positionItemAtIndex(19, this.selectGridContainer);

        this.selectGridContainer.iterate(this.addInteractionToGridTiles);
        

        // The button to get back to the home page
        this.acceptButton = new Button({
            scene: this, 
            key: 'tile',
            text: 'Accept',
            textConfig: CONSTANTS.TEXT_STYLE,
            event: 'AcceptBoardPlacement',
            alignmentGrid: this.alignmentGrid,
            index: 100
        });
        emitter.on('AcceptBoardPlacement', this.acceptBoardPlacement);

        
        // Add placement counter
        this.counter = this.add.text(0, 0, '0 / 10');
        this.counter.setOrigin(.5, .5);

        this.alignmentGrid.positionItemAtIndex(12, this.counter);
    }

    acceptBoardPlacement() {
        // Save the board placements to the database

        game.scene.start('HomeScene');
        game.scene.stop('SetupScene');
    }
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

    update() {
        // This will let me iterate over all items inside this container
        // this.boardContainer.iterate(this.rollTile);
    }


    // Grid Tile Interaction
    addInteractionToGridTiles(tile) {
        tile.on('pointerover', tile.scene.gridPointerover.bind(tile));
        tile.on('pointerout', tile.scene.gridPointerout.bind(tile));
        tile.on('pointerdown', tile.scene.gridPointerdown.bind(tile));
    }

    gridPointerover() {
        if (!this.scene.selectGridTile) {
            // a previously activated tile
            if (this.unitsBoardCounterpart) {

                this.setTint(CONSTANTS.GREEN_TINT);
            } else {
                // non-active tile
                if (this.scene.unitsPlaced < 10) { 
                    this.setTint(CONSTANTS.BLUE_TINT);
                    this.unit.alpha = .75;
                }
            }
        } else {
            if (this.scene.selectGridTile == this) {
                // this is the actively selected tile
                this.setTint(CONSTANTS.RED_TINT);
            } else {

            }
        }
    }

    gridPointerout() {
        if (!this.scene.selectGridTile) {
            if (!this.unitsBoardCounterpart) {
                this.clearTint();
                this.unit.alpha = 1;
            } else {
                if (this.unitsBoardCounterpart) {

                // } else {
                    this.setTint(CONSTANTS.ORANGE_TINT);
                }
            }
        } else {
            if (!this.unitsBoardCounterpart) {
                if (this.scene.selectGridTile === this) {
                    this.setTint(CONSTANTS.GREEN_TINT);
                } else {
                    
                }
            } else {
                this.setTint(CONSTANTS.RED_TINT);
            }
        }
    }

    gridPointerdown() {
        if (!this.scene.selectGridTile) {
            if (this.scene.unitsPlaced < 10) {
                if (this.unitsBoardCounterpart) {
                    this.setTint(CONSTANTS.RED_TINT);
                    this.unitsBoardCounterpart.setTint(CONSTANTS.RED_TINT);
                    this.scene.boardTileSelected = true; 
                    this.scene.boardTile = this.unitsBoardCounterpart;
                    this.scene.selectGridTile = this;
                } else {
                    this.scene.selectGridTile = this;
                    this.setTint(CONSTANTS.GREEN_TINT);
                }
            } else {
                if (this.unitsBoardCounterpart) {
                    this.setTint(CONSTANTS.RED_TINT);
                    this.unitsBoardCounterpart.setTint(CONSTANTS.RED_TINT);
                    this.unitsBoardCounterpart.unit.y -= 3;
                    this.unitsBoardCounterpart.unit.alpha = .5;

                    this.scene.boardTileSelected = true;
                    this.scene.boardTile = this.unitsBoardCounterpart;
                    this.scene.selectGridTile = this;
                }
            }
        } else {
            // Another tile was selected, switch to this one

            // if it has a counterpart - activate it and it's counterpart, release this

            // if it doesn't - activate it, release this
        }
    }


    // Board Tile Interaction
    addInteractionToBoardTiles(tile) {
        tile.on('pointerover', tile.scene.boardPointerover.bind(tile));
        tile.on('pointerout', tile.scene.boardPointerout.bind(tile));
        tile.on('pointerdown', tile.scene.boardPointerdown.bind(tile));
    }

    // rollTile(tile) {
    //     const rotation = tile.rotation;
    //     tile.setRotation(rotation + .01);
    // }

    boardPointerover() {
        if (this.scene.selectGridTile || this.scene.unitsPlaced > 0) {
            // TODO: MOVE THIS TO PLAY SCENE
            // this.unit.healthBar.container.setVisible(true);
            // this.unit.healthBar.bar.setVisible(true);

            // If there is a unit on this tile
            if (this.unit) {
                // If it is there is no selected unit or it isn't on this tile
                if (this.scene.boardTileSelected === false) {// || this.scene.boardTile != this) {
                    this.setTint(CONSTANTS.GREEN_TINT);
                } else {
                    if (this.scene.boardTile != this) {
                        
                        this.setTint(CONSTANTS.RED_TINT);
                    }
                }
            } else {
                if (!this.scene.boardTileSelected) {
                    if (this.scene.selectGridTile) {
                        this.setTint(CONSTANTS.BLUE_TINT);
                    } else {

                    }
                } else {
                    this.setTint(CONSTANTS.ORANGE_TINT);
                }
            }
        }
        // this.y -= 3;
    } 

    boardPointerout() {
        if (this.scene.selectGridTile || this.scene.unitsPlaced > 0) {
            if (!this.scene.boardTileSelected || this != this.scene.boardTile) {
                this.clearTint();
            } else {
                // leave tint until they choose another tile
            }
        }
        // TODO: MOVE THIS TO PLAY SCENE
        // if (this.unit) {
        //     this.unit.healthBar.container.setVisible(false);
        //     this.unit.healthBar.bar.setVisible(false);
        // }
        // this.y += 3;
    }

    boardPointerdown() {
        // const x = this.x;
        // const y = this.y;

        // If there is no unit on this tile
        if (this.scene.selectGridTile || this.scene.unitsPlaced > 0) {
            if (!this.unit) { 
                // If there is no unit selected - add the selected unit to this tile
                if (this.scene.boardTileSelected === false) {
                    console.log('Add unit');
                    // Try to get this automatically set somewhere
                    this.scene.addUnitToBoard(this);
                    this.setTint(CONSTANTS.GREEN_TINT);
                } else {
                    // switch the unit to here
                    this.unit = this.scene.boardTile.unit;
                    this.unit.x = this.x;
                    this.unit.y = this.y;
                    this.unit.alpha = 1;
                    this.unit.tile = this;

                    // Switch the grid connection
                    this.selectGridCounterpart = this.scene.boardTile.selectGridCounterpart;
                    this.scene.selectGridTile.unitsBoardCounterpart = this;
                    this.selectGridCounterpart.setTint(CONSTANTS.ORANGE_TINT);
                    this.scene.boardTile.selectGridCounterpart = null;
                    this.scene.selectGridTile = null;

                    // Clear and set the new tints
                    this.scene.boardTile.unit = null;
                    this.scene.boardTile.clearTint();

                    this.setTint(CONSTANTS.GREEN_TINT);
                    this.scene.boardTile = null;
                    this.scene.boardTileSelected = false;
                }
            // If there is a unit on this tile
            } else {
                // if (this.active) {
                    // If this tile has a unit and it is the active unit - remove it's activity
                if (this === this.scene.boardTile) {
                    //    this.active = false;
                        this.scene.boardTileSelected = false;
                        this.scene.boardTile = null;
                        this.clearTint();


                        // this.scene.unitsBoard.remove(this.unit);
                        this.unit.destroy();
                        this.unit = null;

                        // clear links 
                        this.selectGridCounterpart.unit.alpha = 1;
                        this.selectGridCounterpart.clearTint();
                        this.selectGridCounterpart.unitsBoardCounterpart = null;
                        this.selectGridCounterpart = null;
                        this.scene.selectGridTile = null;

                        this.scene.unitsPlaced --;
                        this.scene.updateCounter();
                    // }
                    // If this tile has a unit and it's not the active unit
                } else {
                    // If there is no selected tile to move from - set this unit to the selected unit
                    if (this.scene.boardTile === null) {
                        this.scene.boardTileSelected = true;
                        this.scene.boardTile = this;

                        this.unit.y -= 3;
                        this.unit.alpha = .5;

                        this.setTint(CONSTANTS.RED_TINT);

                        this.selectGridCounterpart.setTint(CONSTANTS.RED_TINT);
                        this.scene.selectGridTile = this.selectGridCounterpart;
                        // Highlight all tiles within unit's range
                        // this.scene.highlightTilesInRange(this);

                    // If this is the another unit - swap them  
                    } else {
                        this.scene.boardTile.clearTint();
                        this.scene.boardTile.unit.y += 3;
                        this.scene.boardTile.unit.alpha = 1; 

                        const tempTile = this.scene.boardTile;
                        const tempUnit = tempTile.unit;

                        this.scene.boardTile.unit = this.unit;
                        this.scene.boardTile.unit.x = this.scene.boardTile.x;
                        this.scene.boardTile.unit.y = this.scene.boardTile.y;

                        this.unit = tempUnit;
                        this.unit.x = this.x;
                        this.unit.y = this.y;

                        // Switch the grid board connections
                        const tempGridTile = this.scene.boardTile.selectGridCounterpart;
                        this.scene.boardTile.selectGridCounterpart = this.selectGridCounterpart;
                        this.selectGridCounterpart.unitsBoardCounterpart = this.scene.boardTile;

                        this.selectGridCounterpart = tempGridTile;
                        tempGridTile.unitsBoardCounterpart = this;
                        this.scene.selectGridTile.setTint(CONSTANTS.ORANGE_TINT);
                        this.scene.selectGridTile = null;


                        this.setTint(CONSTANTS.GREEN_TINT);
                        this.scene.boardTile = null;
                        this.scene.boardTileSelected = false;
                        // this.scene.boardTile = null;

                        // this.scene.boardTile = this;
                        // this.scene.boardTileSelected = false;
                        
                        // this.scene.boardTile.unit.y -= 3;
                        // this.scene.boardTile.unit.alpha = .5;
                        // this.setTint(CONSTANTS.GREEN_TINT);

                        // Actually want to switch these two units
                    }
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

    updateCounter() {
        console.log(this);

        this.counter.text = `${this.unitsPlaced} / 10`;
    }

    addUnitToBoard(tile) {
        const type = this.selectGridTile.unit.type;

        // Link the two tiles
        this.selectGridTile.unitsBoardCounterpart = tile;
        tile.selectGridCounterpart = this.selectGridTile;

        // Clear the select grid tile but leave it knowing it is active
        this.selectGridTile.setTint(CONSTANTS.ORANGE_TINT);
        // this.selectGridTile.active = true;
        this.selectGridTile = null;

        switch(type) {
            case 'axe':
                tile.unit = this.add.existing(new Axe({
                    scene: this, 
                    player: game.player,
                    tile: tile,
                    container: this.unitsBoard
                }));
            break;
            case 'bow':
                tile.unit = this.add.existing(new Bow({
                    scene: this, 
                    player: game.player,
                    tile: tile,
                    container: this.unitsBoard
                }));
            break;
            case 'control':
                tile.unit = this.add.existing(new Control({
                    scene: this, 
                    player: game.player,
                    tile: tile,
                    container: this.unitsBoard
                }));
            break;
            case 'dagger':
                tile.unit = this.add.existing(new Dagger({
                    scene: this, 
                    player: game.player,
                    tile: tile,
                    container: this.unitsBoard
                }));
            break;
            case 'healing':
                tile.unit = this.add.existing(new Healing({
                    scene: this, 
                    player: game.player,
                    tile: tile,
                    container: this.unitsBoard
                }));
            break;
            case 'lance':
                tile.unit = this.add.existing(new Lance({
                    scene: this, 
                    player: game.player,
                    tile: tile,
                    container: this.unitsBoard
                }));
            break;
            case 'shield':
                tile.unit = this.add.existing(new Shield({
                    scene: this, 
                    player: game.player,
                    tile: tile,
                    container: this.unitsBoard
                }));
            break;
            case 'sorcery':
                tile.unit = this.add.existing(new Sorcery({
                    scene: this, 
                    player: game.player,
                    tile: tile,
                    container: this.unitsBoard
                }));
            break;
            case 'sword':
                tile.unit = this.add.existing(new Sword({
                    scene: this, 
                    player: game.player,
                    tile: tile,
                    container: this.unitsBoard
                }));
            break;
        }

        this.unitsPlaced ++;
        this.updateCounter();
    }
    // // Set the highlight to all tiles in range
    // highlightTilesInRange(tile) {
    //     // Get the range
    //     const unit = tile.unit;
    //     const movement = unit.movement;
    //     const generatedBoard = tile.scene.generatedBoard;
    //     // const scene = tile.scene;
    //     // const number = tile.number;
    //     let questionedTile;

    //     tile.path = [];

    //     const tilesOfInterest = [tile];

    //     console.log(generatedBoard);
    //     for (let i = 0; i < movement; i++) {
    //         tilesOfInterest.forEach(tileOfInterest => {

    //             // console.log(tileOfInterest);

    //             console.log(`Column ${tileOfInterest.column}  Row ${tileOfInterest.row}`)
    //             if (tileOfInterest.column - 1 >= 0) {
    //                 questionedTile = generatedBoard.board[tileOfInterest.row][tileOfInterest.column - 1];

    //                 // console.log(questionedTile);

    //                 // Will have to take into account friendly units in the Play Scene
    //                 if (questionedTile.unit === null) {
    //                     if (!tilesOfInterest.includes(questionedTile)) {
    //                         questionedTile.path = tileOfInterest.path;
    //                         questionedTile.path.push('up');
    //                         tilesOfInterest.push(questionedTile);
    //                     }
    //                 }
    //             }
                
    //             if (tileOfInterest.row + 1 < generatedBoard.mapRows) {
    //                 questionedTile = generatedBoard.board[tileOfInterest.row + 1][tileOfInterest.column]
    //                 if (questionedTile.unit === null) {
    //                     if (!tilesOfInterest.includes(questionedTile)) {
    //                         questionedTile.path = tileOfInterest.path;
    //                         questionedTile.path.push('right');
    //                         tilesOfInterest.push(questionedTile);
    //                     }
    //                 }
    //             }

    //             if (tileOfInterest.column + 1 < generatedBoard.mapColumns) {
    //                 questionedTile = generatedBoard.board[tileOfInterest.row][tileOfInterest.column + 1]
    //                 if (questionedTile.unit === null) {
    //                     if (!tilesOfInterest.includes(questionedTile)) {
    //                         questionedTile.path = tileOfInterest.path;
    //                         questionedTile.path.push('down');
    //                         tilesOfInterest.push(questionedTile);
    //                     }
    //                 }
    //             }
                
    //             if (tileOfInterest.row - 1 >= 0) {
    //                 questionedTile = generatedBoard.board[tileOfInterest.row - 1][tileOfInterest.column]
    //                 if (questionedTile.unit === null) {
    //                     if (!tilesOfInterest.includes(questionedTile)) {
    //                         questionedTile.path = tileOfInterest.path;
    //                         questionedTile.path.push('left');
    //                         tilesOfInterest.push(questionedTile);
    //                     }
    //                 }
    //             }
    //         });
    //     }

    //     tilesOfInterest.forEach(tileOfInterest => {
    //         if (tileOfInterest != tile) {
    //             tileOfInterest.setTint(CONSTANTS.YELLOW_TINT);
    //         }
    //     });

    //     // for (let i = 0; i < scene.boardContainer.mapRows; i++) {
    //     //     for (let j = 0; j < scene.boardContainer.mapColumns; j++) {
    //     //         const boardTile = scene.boardContainer.board[j][i];

    //     //         if (number - range < boardTile.number < number + range) {
    //     //             boardTile.inRange = true;
    //     //             boardTile.setTint(CONSTANTS.YELLOW_TINT);
    //     //         }
    //     //     }
    //     // }
    // }

    // // Iterate over all tiles and remove the tint
    // removeAllHighlights(tile) {
    //     const scene = tile.scene;
    //     const boardContainer = scene.boardContainer;

    //     for (let i = 0; i < boardContainer.rows; i++) {
    //         for (let j = 0; j < boardContainer.columns; j++) {
    //             boardContainer[i][j].clearTint();
    //         }
    //     }
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