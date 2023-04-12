class PlayScene extends Phaser.Scene {
    constructor() {
        super({key: CONSTANTS.PLAY_SCENE});
    }

    preload() {
    }

    create() {
        model.currentScene = this;
        this.phase = CONSTANTS.ARMY_SELECT_PHASE;
        this.playerTurn;
        this.playerAction;

        // Tiles for movement and attack
        this.selectedFromTile = null;
        this.selectedToTile = null;
        this.targetTile = null;
        this.currentTile = null;

        // Set current army for deployment phase
        this.currentArmy = 0;

        // Setup the alignment grid for testing purposes
        this.alignmentGrid = new AlignmentGrid({rows: 11, columns: 11, scene: this});
        this.alignmentGrid.showCellIndex();

        // Create the container for the board and units
        this.boardContainer = this.add.container(0, 0);
        // this.boardContainer.setInteractive();

        const boardConfig = {
            tileWidth: 75,
            tileHeight: 75,
            mapRows: 11,
            mapColumns: 11,
            scale: .70,
            scene: this,
            container: this.boardContainer,
        }
        this.generatedBoard = new GenerateBoard(boardConfig);

        // Add interactivity to each of the tiles in the board container
       //  this.boardContainer.iterate(this.addInteractionToBoardTiles);

        // Add a container for the units
        // this.unitsBoard = this.add.container(0, 0);
        this.unitsBoard = this.add.container(0, 0);

        // TODO: Wait for Socket.IO to return both selected armies

        
        const armyDeploymentConfig = {
            scene: this,
            armyUnits: game.player.armies[this.currentArmy],  
            generatedBoard: this.generatedBoard,
            unitsBoard: this.unitsBoard,
        }
        this.armyDeployment = new ArmyDeployment(armyDeploymentConfig);

        
        // Add arrows to pick army
        this.armyName = this.add.text(0, 0, game.player.armies[this.currentArmy].name, CONSTANTS.HUD_STYLE);
        this.armyName.setOrigin(.5, .5);

        this.leftArrow = new ScrollArrow(this, 'left', .5);
        this.rightArrow = new ScrollArrow(this, 'right', .5);

        this.alignmentGrid.positionItemAtIndex(17, this.leftArrow);
        this.alignmentGrid.positionItemAtIndex(19, this.armyName);
        this.alignmentGrid.positionItemAtIndex(21, this.rightArrow);


        // The button to get back to the home page
        this.quitButton = new Button({
            scene: this, 
            key: 'tile',
            text: 'QUIT',
            textConfig: CONSTANTS.TEXT_STYLE,
            event: CONSTANTS.QUIT_GAME,
            alignmentGrid: this.alignmentGrid,
            index: 12
        });
        emitter.once(CONSTANTS.QUIT_GAME, this.quitGame);

        // The button to accept this setup
        this.acceptButton = new Button({
            scene: this, 
            key: 'tile',
            text: 'Accept',
            textConfig: CONSTANTS.TEXT_STYLE,
            event: CONSTANTS.ACCEPT_ARMY,
            alignmentGrid: this.alignmentGrid,
            index: 41
        });
        emitter.once(CONSTANTS.ACCEPT_ARMY, this.acceptArmy.bind(this));

        // TODO: Add Attack/ Move/ Direction/ Wait buttons
    }

    update() {}

    quitGame() {
        // Save the board placements to the database
        game.scene.start(CONSTANTS.HOME_SCENE);
        game.scene.stop(CONSTANTS.PLAY_SCENE);
    }

    shiftArmy() {
        this.armyName.text = game.player.armies[this.currentArmy].name;
        this.armyDeployment.armyUnits = game.player.armies[this.currentArmy];
        this.armyDeployment.clearGameBoard();
        this.armyDeployment.populateBoard();
    }

    acceptArmy() {
        // TODO: Get both events fired to server and start game

        this.startGame();
    }

    startGame() {
        this.phase = CONSTANTS.GAME_PHASE;

        // TODO: set active player
        this.playerAction = CONSTANTS.SELECTION_ACTION;

        this.armyName.setVisible(false);
        this.acceptButton.setVisible(false);
        this.leftArrow.setVisible(false);
        this.rightArrow.setVisible(false); 
    }
    // onPointerdown() {
    //     // const x = this.x;
    //     // const y = this.y;

    //     // If there is no unit on this tile
    //     if (!this.unit) { 
    //         // If there is no unit selected - add the selected unit to this tile
    //         if (this.scene.unitSelected === false) {
    //             console.log('Add unit');
    //             // Try to get this automatically set somewhere
    //             this.unit = this.scene.add.existing(new Lance({
    //                 scene: this.scene, 
    //                 player: game.player,
    //                 tile: this,
    //                 container: this.scene.unitsBoard
    //             }));
    //             this.setTint(CONSTANTS.ORANGE_TINT);
    //         }
    //     // If there is a unit on this tile
    //     } else {
    //         // if (this.active) {
    //             // If this tile has a unit and it is the active unit - remove it's activity
    //             if (this === this.scene.selectedTileFrom) {
    //             //    this.active = false;
    //                 this.scene.unitSelected = false;
    //                 this.scene.selectedTileFrom = null;
    //                 this.setTint(CONSTANTS.ORANGE_TINT);
    //             // }
    //             // If this tile has a unit and it's not the active unit
    //         } else {
    //             // If there is no selected tile to move from - set this unit to the selected unit
    //             if (this.scene.selectedTileFrom === null) {
    //                 this.scene.unitSelected = true;
    //                 this.scene.selectedTileFrom = this;

    //                 this.setTint(CONSTANTS.RED_TINT);
    //                 // Highlight all tiles within unit's range
    //                 this.scene.highlightTilesInRange(this);

    //             // If this is the another unit - set them to active    
    //             } else {
    //                 this.scene.selectedTileFrom.clearTint();
    //                 this.scene.selectedTileFrom = false;

    //                 this.scene.selectedTileFrom = this;
    //                 this.scene.unitSelected = true;
    //                 this.setTint(CONSTANTS.RED_TINT);
    //             }
    //         }
    //     }

    //     // DO THE STUFF TO MOVE THEM OR REMOVE THEM FROM THE BOARD
    //     // else {

    //     // }
    //     // const character = this.scene.add.existing(new Unit(this.scene, x, y, 'character'));// , 'southEast', 100)));//this.scene.add.image(x, y, 'character');
    //     // character.setOrigin(.5, .5);

    //     // character.y = this.y;
    // }


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

                // console.log(`Column ${tileOfInterest.column}  Row ${tileOfInterest.row}`)
                if (tileOfInterest.column - 1 >= 0) {
                    questionedTile = generatedBoard.board[tileOfInterest.row][tileOfInterest.column - 1];

                    // console.log(questionedTile);

                    // Will have to take into account friendly units in the Play Scene
                    if (questionedTile.unit === null) {
                        if (!tilesOfInterest.includes(questionedTile)) {
                            console.log(tileOfInterest.path);
                            tileOfInterest.path.forEach(path => {
                                questionedTile.path.push(path);
                            })
                            questionedTile.path.push({direction: CONSTANTS.TOP, tile: questionedTile}); //CONSTANTS.TOP);
                            tilesOfInterest.push(questionedTile);
                        } else {
                            console.log('tile included already');
                        }
                    }
                }
                
                if (tileOfInterest.row + 1 < generatedBoard.mapRows) {
                    questionedTile = generatedBoard.board[tileOfInterest.row + 1][tileOfInterest.column]
                    if (questionedTile.unit === null) {
                        if (!tilesOfInterest.includes(questionedTile)) {
                            tileOfInterest.path.forEach(path => {
                                questionedTile.path.push(path);
                            })
                            questionedTile.path.push({direction: CONSTANTS.RIGHT, tile: questionedTile}); //CONSTANTS.RIGHT);
                            tilesOfInterest.push(questionedTile);
                        }
                    }
                }

                if (tileOfInterest.column + 1 < generatedBoard.mapColumns) {
                    questionedTile = generatedBoard.board[tileOfInterest.row][tileOfInterest.column + 1]
                    if (questionedTile.unit === null) {
                        if (!tilesOfInterest.includes(questionedTile)) {
                            tileOfInterest.path.forEach(path => {
                                questionedTile.path.push(path);
                            })
                            questionedTile.path.push({direction: CONSTANTS.DOWN, tile: questionedTile}); // CONSTANTS.DOWN);
                            tilesOfInterest.push(questionedTile);
                        }
                    }
                }
                
                if (tileOfInterest.row - 1 >= 0) {
                    questionedTile = generatedBoard.board[tileOfInterest.row - 1][tileOfInterest.column]
                    if (questionedTile.unit === null) {
                        if (!tilesOfInterest.includes(questionedTile)) {
                            tileOfInterest.path.forEach(path => {
                                questionedTile.path.push(path);
                            })
                            questionedTile.path.push({direction: CONSTANTS.LEFT, tile: questionedTile}); // CONSTANTS.LEFT);
                            tilesOfInterest.push(questionedTile);
                        }
                    }
                }
            });
        }

        tilesOfInterest.forEach(tileOfInterest => {
            if (tileOfInterest != tile) {
                tileOfInterest.inRange = true;
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

    moveUnit(currentTile) {
        this.currentTile = currentTile;
        const unit = currentTile.unit;
        // console.log(unit);

        // let currentTile = this.selectedFromTile;
        const path = this.selectedToTile.path.shift();
        const direction = path.direction;
        // TODO: set direction frames
        if (direction === CONSTANTS.TOP) {
            unit.character.play(CONSTANTS.LANCE_TOP_IDLE);
            unit.tint.play(CONSTANTS.LANCE_TINT_TOP_IDLE);
        } else if (direction === CONSTANTS.RIGHT) {
            unit.character.play(CONSTANTS.LANCE_RIGHT_IDLE);
            unit.tint.play(CONSTANTS.LANCE_TINT_RIGHT_IDLE);
        }

        this.targetTile = path.tile;

        
        this.tweens.add({
            targets: unit, 
            x: this.targetTile.x, 
            y: this.targetTile.y, 
            duration: 500, 
            yoyo: false, 
            repeat: 0,
            onStart: function () {},// console.log('onStart'); console.log(arguments); },
            onComplete: function () { 
                // console.log('onComplete'); 
                // console.log(arguments); 
                const unit = arguments[1][0];
                const scene = unit.scene;
                scene.currentTile.unit = null;
                scene.targetTile.unit = unit;
                // console.log(scene.targetTile.unit.tint.z);
                // console.log(scene.targetTile.unit.character.z);
                // console.log(scene.targetTile.z);
                scene.targetTile.unit.z = scene.targetTile.z;
                // scene.targetTile.unit.tint.setDepth(scene.targetTile.depth);
                // scene.targetTile.unit.character.setDepth(scene.targetTile.depth);
                unit.tile = scene.targetTile;

                // This works, need to use .sort to sort them by depth
                // scene.unitsBoard.sendToBack(unit);
                scene.unitsBoard.sort('z');//, (a, b) => {
                //     a.z > b.z ? 1 : -1;
                // });
                console.log(scene.unitsBoard.list);

                if (scene.selectedToTile.path.length > 0) {
                    scene.moveUnit(scene.targetTile);
                } else {
                    // TODO: unlock scene
                    scene.clearPaths();
                    // scene.removeAllHighlights();
                }
            },
        }); 
            //onStart: function()
            //onComplete: function()
    }

    clearPaths() {
        this.generatedBoard.tiles.forEach((tile) => {
            tile.inRange = false;
            tile.path = [];
        });

        this.selectedToTile = null;
        this.selectedFromTile = null;
        this.playerAction = CONSTANTS.SELECTION_ACTION;
        this.removeAllHighlights();
    }

    // Iterate over all tiles and remove the tint
    removeAllHighlights() {
        // console.log(this.generatedBoard);
        this.generatedBoard.tiles.forEach((tile) => {
            tile.clearTint();
        });
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