class SetupScene extends Phaser.Scene {
    constructor() {
        super({key: CONSTANTS.SETUP_SCENE}); 
    }

    preload() {
        this.load.image('tile', 'assets/img/tile.png');
        
        // Image (eventually Sprite sheets) for characters
        this.load.image('lanceCharacter', 'assets/img/characterHolder.png');
        this.load.image('lanceTint', 'assets/img/characterTint.png');
        this.load.image('sword', 'assets/img/sword.png');
        this.load.image('swordTint', 'assets/img/swordTint.png');

        // Sprite sheets for arrows
        this.load.spritesheet('arrow', 'assets/img/scrollArrow.png', {frameWidth: 75, frameHeight: 150, endFrame: 1});
        this.load.spritesheet('orb', 'assets/img/orbs.png', {frameWidth: 32, frameHeight: 32, endFrame: 2});
    }

    create() {
        model.currentScene = this;

        this.alignmentGrid = new AlignmentGrid({rows: 11, columns: 11, scene: this});
        this.alignmentGrid.showCellIndex();

        // Spritesheets
        // Arrows
        let config = {
            key: 'off',
            frames: this.anims.generateFrameNumbers('arrow', { start: 0, end: 0, first: 0 }),
            frameRate: 1,
            repeat: 0
        };
        this.anims.create(config);
        config = {
            key: 'on',
            frames: this.anims.generateFrameNumbers('arrow', { start: 1, end: 1, first: 1 }),
            frameRate: 1,
            repeat: 0
        };
        this.anims.create(config);
        this.leftArrow = this.add.sprite(0, 0, 'arrow').play('off');
        this.rightArrow = this.add.sprite(0, 0, 'arrow').play('off');
        this.leftArrow.scaleX = -1;

        this.alignmentGrid.positionItemAtIndex(50, this.leftArrow);
        this.alignmentGrid.positionItemAtIndex(54, this.rightArrow);

        // Tiles currently active
        this.boardTile = null; 
        this.selectGridTile = null;

        this.currentArmy = 0;
        this.totalArmies = 3;

        // Create arrays for the armies
        this.armyOrbs = [];
        this.unitsPlaced = [];
        this.boardContainer = [];
        this.generatedBoard = [];
        this.unitsBoard = [];
        this.selectGridContainer = [];
        this.selectGrid = [];
        
        
        // Setup the alignment grid for testing purposes
        for (let army = 0; army < this.totalArmies; army ++) {
            // TODO: switch this based on if the army is saved
            this.armyOrbs[army] = new Orb(this, army);
            this.alignmentGrid.positionItemAtIndex(army + 7, this.armyOrbs[army]);

            this.unitsPlaced[army] = 0;

            // Create the container for the board and generate it
            this.boardContainer[army] = this.add.container(0, 0);
            this.boardContainer[army].setInteractive();

            const boardConfig = {
                tileWidth: 75,
                tileHeight: 75,
                mapRows: 4,
                mapColumns: 11,
                scale: .75,
                scene: this,
                container: this.boardContainer[army],
                orientation: CONSTANTS.BOARD_ORIENTATION
            }

            this.generatedBoard[army] = new GenerateBoard(boardConfig);

            // Add interactivity to each of the tiles in the board container
            this.boardContainer[army].iterate(this.addInteractionToBoardTiles);

            // Add a container for the units
            this.unitsBoard[army] = this.add.container(0, 0);

            // Player Select Units container
            this.selectGridContainer[army] = this.add.container(0, 0);
            this.selectGridContainer[army].setInteractive();
            
            // Position the units board
            const selectGridConfig = {
                scene: this,
                // alignmentGrid: this.alignmentGrid,
                tileWidth: 100,
                tileHeight: 100,
                gridRows: 3,
                gridColumns: 6,
                scale: 1,
                container: this.selectGridContainer[army],
                units: game.player.units,
                player: game.player
            }
            this.selectGrid[army] = new SelectUnitsGrid(selectGridConfig);
            
            this.alignmentGrid.positionItemAtIndex(18, this.selectGridContainer[army]);

            this.selectGridContainer[army].iterate(this.addInteractionToGridTiles);
        }

        // // Hide the other layers
        for (let i = 1; i < this.totalArmies; i++) {
            // this.unitsPlaced[i].setVisible(false);
            this.boardContainer[i].setVisible(false);
            // this.generatedBoard[i].setVisible(false);
            this.unitsBoard[i].setVisible(false);
            this.selectGridContainer[i].setVisible(false);
            // this.selectGrid[i].setVisible(false);
        }

        // The button to get back to the home page
        this.homeButton = new Button({
            scene: this, 
            key: 'tile',
            text: 'Back',
            textConfig: CONSTANTS.LIGHT_TEXT_STYLE,
            event: CONSTANTS.BACK_TO_HOME,
            alignmentGrid: this.alignmentGrid,
            index: 100
        });
        emitter.on(CONSTANTS.BACK_TO_HOME, this.loadHomeScene);

        // The button to get Save out the army
        this.acceptButton = new Button({
            scene: this, 
            key: 'tile',
            text: 'Accept',
            textConfig: CONSTANTS.LIGHT_TEXT_STYLE,
            event: CONSTANTS.ACCEPT_BOARD_PLACEMENT,
            alignmentGrid: this.alignmentGrid,
            index: 101
        });
        emitter.on(CONSTANTS.ACCEPT_BOARD_PLACEMENT, this.acceptBoardPlacement.bind(this));

        // Add placement counter
        this.counter = this.add.text(0, 0, '0 / 10', CONSTANTS.HUD_STYLE);
        this.counter.setOrigin(.5, .5);

        this.alignmentGrid.positionItemAtIndex(12, this.counter);

        // Ad Save Notice
        this.saveNotice = this.add.text(0, 0, 'Army Saved', CONSTANTS.HUD_STYLE);
        this.saveNotice.setOrigin(.5, .5);
        this.saveNotice.setVisible(false);

        this.alignmentGrid.positionItemAtIndex(60, this.saveNotice);

        emitter.on(CONSTANTS.ARMY_SAVED, () => {
            this.saveNotice.setVisible(true);

            this.time.addEvent({delay: 2000, callback: this.hideSaveNotice, callbackScope: this, loop: false});
        });

        // Shift army logic
        this.leftArrow.setInteractive();
        this.leftArrow.on(CONSTANTS.POINTER_OVER, () => {
            this.leftArrow.play('on');
        });
        this.leftArrow.on(CONSTANTS.POINTER_OUT, () => {
            this.leftArrow.play('off');
        });
        this.leftArrow.on(CONSTANTS.POINTER_DOWN, this.shiftArmyLeft);

        this.rightArrow.setInteractive();
        this.rightArrow.on(CONSTANTS.POINTER_OVER, () => {
            this.rightArrow.play('on');
        });
        this.rightArrow.on(CONSTANTS.POINTER_OUT, () => {
            this.rightArrow.play('off');
        });
        this.rightArrow.on(CONSTANTS.POINTER_DOWN, this.shiftArmyRight);

        // Add the details view
        this.createDetailsView();

        this.armyOrbs[this.currentArmy].play('active');
    }

    shiftArmyLeft() {
        console.log(this);
        this.scene.currentArmy --;
        this.scene.shiftArmy();
    }

    shiftArmyRight() {
        console.log(this);
        this.scene.currentArmy ++;
        this.scene.shiftArmy();
    }

    shiftArmy() {
        console.log(this);
        this.currentArmy = this.currentArmy > 2 ? 0 : this.currentArmy;
        this.currentArmy = this.currentArmy < 0 ? 2 : this.currentArmy;

        for (let i = 0; i < this.totalArmies; i++) {
            this.boardContainer[i].setVisible(false);
            // this.generatedBoard[i].setVisible = false;
            this.unitsBoard[i].setVisible(false);
            this.selectGridContainer[i].setVisible(false);
            // this.selectGrid[i].setVisible = false;

            this.armyOrbs[i].setActive(this.currentArmy);
        }


        this.boardContainer[this.currentArmy].setVisible(true);
        // this.generatedBoard[this.currentArmy].setVisible = true;
        this.unitsBoard[this.currentArmy].setVisible(true);
        this.selectGridContainer[this.currentArmy].setVisible(true);
        // this.selectGrid[this.currentArmy].setVisible = true;

        // release scene tiles
        if (this.boardTile) {
            if (this.boardTile.unit) {
                this.boardTile.unit.y += 3;
                this.boardTile.unit.alpha = 1;
            }
            this.boardTile.clearTint();
            this.boardTile = null; 
        }
        if (this.selectGridTile) {
            if (this.selectGridTile.unitsBoardCounterpart) {
                this.selectGridTile.setTint(CONSTANTS.ORANGE_TINT);
            } else {
                this.selectGridTile.unit.alpha = 1;
                this.selectGridTile.clearTint();
            }
            this.selectGridTile = null;
        }

        this.updateCounter();
    }

    hideSaveNotice() {
        this.saveNotice.setVisible(false);
    }

    acceptBoardPlacement() {
        const unitPlacements = [];

        console.log(this);

        for (let i = 0; i < this.generatedBoard[this.currentArmy].mapRows; i++) {
            for (let j = 0; j < this.generatedBoard[this.currentArmy].mapColumns; j++) {
                const tile = this.generatedBoard[this.currentArmy].board[i][j];

                if (tile.unit) {
                    unitPlacements.push({
                        unit: tile.unit.type,
                        tileNum: tile.number
                    });
                }

            }
        }

        const data = {
            units: unitPlacements,
            name: 'test',
            playerId: this.game.player.playerId,
            armyId: this.currentArmy
        }

        // Save the board placements to the database
        emitter.emit(CONSTANTS.SAVE_ARMY, data);
    }

    loadHomeScene() {
        game.scene.start(CONSTANTS.HOME_SCENE);
        game.scene.stop(CONSTANTS.SETUP_SCENE);
    }
        
    update() {
        // This will let me iterate over all items inside this container
        // this.boardContainer.iterate(this.rollTile);
        if (!this.boardTile && !this.selectGridTile) {
            this.hideDetailsView();
        }
    }

    // Grid Tile Interaction
    addInteractionToGridTiles(tile) {
        tile.on(CONSTANTS.POINTER_OVER, tile.scene.gridPointerover.bind(tile));
        tile.on(CONSTANTS.POINTER_OUT, tile.scene.gridPointerout.bind(tile));
        tile.on(CONSTANTS.POINTER_DOWN, tile.scene.gridPointerdown.bind(tile));
    }

    gridPointerover() {
        if (!this.scene.selectGridTile) { // Is a previously activated tile
            if (this.unitsBoardCounterpart) {
                this.setTint(CONSTANTS.GREEN_TINT);
                this.unitsBoardCounterpart.setTint(CONSTANTS.GREEN_TINT);
            } else { // non-active tile
                if (this.scene.unitsPlaced[this.scene.currentArmy] < 10) {
                    this.setTint(CONSTANTS.GREEN_TINT);
                    this.unit.alpha = .5;
                }
            }
        } else {
            if (this.scene.selectGridTile == this) {
                // this is the actively selected tile
                this.setTint(CONSTANTS.RED_TINT);
            } else {
                if (this.unitsBoardCounterpart) {
                    this.setTint(CONSTANTS.GREEN_TINT);
                    this.unitsBoardCounterpart.setTint(CONSTANTS.GREEN_TINT);
                } else { 
                    this.setTint(CONSTANTS.GREEN_TINT);
                    this.unit.alpha = .5;
                }
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
                    this.setTint(CONSTANTS.ORANGE_TINT);
                    this.unitsBoardCounterpart.clearTint();
                }
            }
        } else { // Someone is selected
            if (!this.unitsBoardCounterpart) {  // Doesn't have a selected board tile
                if (this.scene.selectGridTile === this) {  // Is this tile
                    this.setTint(CONSTANTS.GREEN_TINT);
                } else {    // Is another blank tile
                    this.clearTint()
                    this.unit.alpha = 1;
                }
            } else {  // Has board tile counterpart
                if (this.scene.selectGridTile === this) {  // Is this tile
                    this.setTint(CONSTANTS.RED_TINT);
                } else {  // Is another tile with counterpart
                    this.setTint(CONSTANTS.ORANGE_TINT);
                    this.unitsBoardCounterpart.clearTint();
                }
            }
        }
    }

    gridPointerdown() {
        if (!this.scene.selectGridTile) {  // If no grid selected
            if (this.scene.unitsPlaced[this.scene.currentArmy] < 10) { // If units less than 10
                if (this.unitsBoardCounterpart) {
                    this.setTint(CONSTANTS.RED_TINT);
                    this.unitsBoardCounterpart.setTint(CONSTANTS.RED_TINT);
                    //this.scene.boardTileSelected = true; 
                    this.scene.boardTile = this.unitsBoardCounterpart;
                    this.scene.selectGridTile = this;
                    this.unitsBoardCounterpart.unit.y -= 3;
                    this.unitsBoardCounterpart.unit.alpha = .5;

                    this.scene.updateDetailsView(this.unit);
                } else {
                    this.scene.selectGridTile = this;
                    this.setTint(CONSTANTS.RED_TINT);

                    this.scene.updateDetailsView(this.unit);
                }
            } else {
                if (this.unitsBoardCounterpart) {
                    this.setTint(CONSTANTS.RED_TINT);
                    this.unitsBoardCounterpart.setTint(CONSTANTS.RED_TINT);
                    this.unitsBoardCounterpart.unit.y -= 3;
                    this.unitsBoardCounterpart.unit.alpha = .5;

                    //this.scene.boardTileSelected = true;
                    this.scene.boardTile = this.unitsBoardCounterpart;
                    this.scene.selectGridTile = this;
                    
                    this.scene.updateDetailsView(this.unit);
                }
            }
        } else { // There is a grid tile selected
            if (this.scene.selectGridTile != this) { // Another tile was selected, switch to this one
                if (this.scene.boardTile) { // If the other tile has someone on the board
                    this.scene.selectGridTile.setTint(CONSTANTS.ORANGE_TINT);
                    this.scene.updateDetailsView(this.unit);
                    this.scene.boardTile.unit.alpha = 1;
                    this.scene.boardTile.unit.y += 3;
                    this.scene.boardTile.clearTint();
                } else { // If not
                    this.scene.selectGridTile.unit.alpha = 1;
                    this.scene.selectGridTile.clearTint();

                    this.scene.selectGridTile = this;
                    this.scene.updateDetailsView(this.unit);

                    this.unit.alpha = .5;
                }

                this.scene.boardTile = null;
                this.scene.selectGridTile = this;
                this.setTint(CONSTANTS.RED_TINT);

                if (this.unitsBoardCounterpart) { // If this one has a corresponding tile
                    this.scene.boardTile = this.unitsBoardCounterpart;
                    this.scene.boardTile.setTint(CONSTANTS.RED_TINT);
                    this.scene.boardTile.unit.y -= 3;
                    this.scene.boardTile.unit.alpha = .5;    
                    

                    this.scene.updateDetailsView(this.unit);
                } else { // If not

                    this.scene.updateDetailsView(this.unit);
                }
               
               
            } else { // Is this tile
                if (this.unitsBoardCounterpart) {    // if it has a counterpart - activate it and it's counterpart, release this
                    

                    this.unitsBoardCounterpart.unit.destroy();
                    this.unitsBoardCounterpart.unit = null;
                    this.unitsBoardCounterpart.selectGridCounterpart = null;
                    this.unitsBoardCounterpart.clearTint();
                    
                    this.setTint(CONSTANTS.GREEN_TINT);
                    this.scene.boardTile = null;
                    this.scene.selectGridTile = null;
                    this.unitsBoardCounterpart = null;
                    this.scene.boardTile = null;
                    this.scene.selectGridTile = null;

                    // this.scene.unitsPlaced[this.scene.currentArmy] --;
                    this.scene.updateCounter();
                    this.scene.updateDetailsView(this.unit);
                //    this.boardTileSelected = false;
                } else {    // if it doesn't - activate it, release this
                    //this.unit.alpha = 1;
                    this.setTint(CONSTANTS.GREEN_TINT);
                    this.scene.boardTile = null;
                    this.scene.selectGridTile = null;
                    
                    this.scene.updateDetailsView(this.unit);
                }
            }
            
        }
    }


    // Board Tile Interaction
    addInteractionToBoardTiles(tile) {
        tile.on(CONSTANTS.POINTER_OVER, tile.scene.boardPointerover.bind(tile));
        tile.on(CONSTANTS.POINTER_OUT, tile.scene.boardPointerout.bind(tile));
        tile.on(CONSTANTS.POINTER_DOWN, tile.scene.boardPointerdown.bind(tile));
    }

    // rollTile(tile) {
    //     const rotation = tile.rotation;
    //     tile.setRotation(rotation + .01);
    // }

    boardPointerover() {
        if (this.scene.selectGridTile || this.scene.unitsPlaced[this.scene.currentArmy] > 0) {
            
            if (this.unit) { // If there is a unit on this tile
                // If it is there is no selected unit or it isn't on this tile
                if (!this.scene.boardTile) {//Selected === false) {// || this.scene.boardTile != this) {
                    this.setTint(CONSTANTS.GREEN_TINT);
                } else {
                    if (this.scene.boardTile != this) {
                        this.setTint(CONSTANTS.GREEN_TINT);
                        this.selectGridCounterpart.setTint(CONSTANTS.GREEN_TINT);
                    } else {
                        this.setTint(CONSTANTS.RED_TINT);
                    }
                }
            } else {
                if (!this.scene.boardTile) {
                    if (this.scene.selectGridTile) {
                        this.setTint(CONSTANTS.GREEN_TINT);
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
        if (this.scene.selectGridTile || this.scene.unitsPlaced[this.scene.currentArmy] > 0) {
            if (this != this.scene.boardTile) {
                this.clearTint();
                if (this.selectGridCounterpart) {
                    this.selectGridCounterpart.setTint(CONSTANTS.ORANGE_TINT);
                }
            } else {
                this.setTint(CONSTANTS.RED_TINT);
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

        // If there is no unit on this tile
        if (this.scene.selectGridTile || this.scene.unitsPlaced[this.scene.currentArmy] > 0) {
            if (!this.unit) { 
                // If there is no unit selected - add the selected unit to this tile
                if (!this.scene.boardTile) {// Selected === false) {
                    if (this.scene.selectGridTile) {
                        console.log('Add unit');
                        // Try to get this automatically set somewhere
                        this.scene.addUnitToBoard(this);
                        this.setTint(CONSTANTS.GREEN_TINT);
                        this.scene.updateDetailsView(this.unit);
                    }
                } else { // switch the unit to here
                    
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
                    //this.scene.boardTileSelected = false;
                }
            } else { // If there is a unit on this tile
                if (this === this.scene.boardTile) { // If this tile has a unit and it is the linked to the selectGrid, remove it
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

                        this.scene.unitsPlaced[this.scene.currentArmy] --;
                        this.scene.updateCounter();
                    // }
                } else { // If this tile has a unit and it's not connected to the selectGrid unit
                    // If there is no selected tile to move from - set this unit to the selected unit
                    if (this.scene.boardTile === null) {
                        if (this.scene.selectGridTile != this.selectGridCounterpart) {
                            if (this.scene.selectGridTile === null) {
                                //this.scene.boardT
                                //this.scene.boardTileSelected = true;
                                this.scene.boardTile = this;

                                this.unit.y -= 3;
                                this.unit.alpha = .5;

                                this.setTint(CONSTANTS.RED_TINT);

                                this.selectGridCounterpart.setTint(CONSTANTS.RED_TINT);
                                this.scene.selectGridTile = this.selectGridCounterpart;
                                this.scene.updateDetailsView(this.unit);
                            } else {
                                if (this.scene.selectGridTile.unitsBoardCounterpart != this) {
                                    this.setTint(CONSTANTS.GREEN_TINT);

                                    this.selectGridCounterpart.unit.alpha = 1;
                                    this.selectGridCounterpart.clearTint();
                                    this.selectGridCounterpart.unitsBoardCounterpart = null;

                                    this.unit.destroy();

                                    this.scene.selectGridTile.unitsBoardCounterpart = this;
                                    this.scene.addUnitToBoard(this, this.selectGridTile, false);

                                    // this.scene.unitsPlaced[this.scene.currentArmy] --;
                                    // this.scene.updateCounter();
                                } 
                            }
                            // Highlight all tiles within unit's range
                            // this.scene.highlightTilesInRange(this);
                        } 
                     
                    } else { // If this is the another unit - swap them 
                        this.scene.boardTile.clearTint();
                        this.scene.boardTile.unit.y += 3;
                        this.scene.boardTile.unit.alpha = 1; 

                        const tempTile = this.scene.boardTile;
                        const tempUnit = tempTile.unit;

                        this.scene.boardTile.unit = this.unit;
                        this.scene.boardTile.unit.x = this.scene.boardTile.x;
                        this.scene.boardTile.unit.y = this.scene.boardTile.y;

                        this.selectGridCounterpart.setTint(CONSTANTS.ORANGE_TINT);
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
        this.counter.text = `${this.unitsPlaced[this.currentArmy]} / 10`;
    }

    addUnitToBoard(boardTile, selectGridTile = this.selectGridTile, incrementCounter = true) {
        if (this.selectGridTile) {
            const type = selectGridTile.unit.type;

            // Link the two tiles
            selectGridTile.unitsBoardCounterpart = boardTile;
            boardTile.selectGridCounterpart = selectGridTile;

            // Clear the select grid tile but leave it knowing it is active
            selectGridTile.setTint(CONSTANTS.ORANGE_TINT);

            switch(type) {
                case CONSTANTS.AXE:
                    boardTile.unit = new Axe({
                        scene: this, 
                        player: game.player,
                        tile: boardTile,
                        container: this.unitsBoard[this.currentArmy]
                    });
                break;
                case CONSTANTS.BOW:
                    boardTile.unit = new Bow({
                        scene: this, 
                        player: game.player,
                        tile: boardTile,
                        container: this.unitsBoard[this.currentArmy]
                    });
                break;
                case CONSTANTS.CONTROL:
                    boardTile.unit = new Control({
                        scene: this, 
                        player: game.player,
                        tile: boardTile,
                        container: this.unitsBoard[this.currentArmy]
                    });
                break;
                case CONSTANTS.DAGGER:
                    boardTile.unit = new Dagger({
                        scene: this, 
                        player: game.player,
                        tile: boardTile,
                        container: this.unitsBoard[this.currentArmy]
                    });
                break;
                case CONSTANTS.HEALING:
                    boardTile.unit = new Healing({
                        scene: this, 
                        player: game.player,
                        tile: boardTile,
                        container: this.unitsBoard[this.currentArmy]
                    });
                break;
                case CONSTANTS.LANCE:
                    boardTile.unit = new Lance({
                        scene: this, 
                        player: game.player,
                        tile: boardTile,
                        container: this.unitsBoard[this.currentArmy]
                    });
                break;
                case CONSTANTS.SHIELD:
                    boardTile.unit = new Shield({
                        scene: this, 
                        player: game.player,
                        tile: boardTile,
                        container: this.unitsBoard[this.currentArmy]
                    });
                break;
                case CONSTANTS.SORCERY:
                    boardTile.unit = new Sorcery({
                        scene: this, 
                        player: game.player,
                        tile: boardTile,
                        container: this.unitsBoard[this.currentArmy]
                    });
                break;
                case CONSTANTS.SWORD:
                    boardTile.unit = new Sword({
                        scene: this, 
                        player: game.player,
                        tile: boardTile,
                        container: this.unitsBoard[this.currentArmy]
                    });
                break;
            }

            this.selectGridTile = null;
            this.boardTile = null;

            if (incrementCounter) {
                this.unitsPlaced[this.currentArmy] ++;
                this.updateCounter();
                this.hideDetailsView();
            }
        }
    }


    createDetailsView() {
        this.type = this.add.text(0, 0, '');
        this.alignmentGrid.positionItemAtIndex(80, this.type, CONSTANTS.HUD_STYLE);

        this.description = this.add.text(0, 0, '');
        this.alignmentGrid.positionItemAtIndex(91, this.description, CONSTANTS.HUD_STYLE);

        this.health = this.add.text(0, 0, '');
        this.alignmentGrid.positionItemAtIndex(102, this.health, CONSTANTS.HUD_STYLE);
        
        this.offense = this.add.text(0, 0, '');
        this.alignmentGrid.positionItemAtIndex(103, this.offense, CONSTANTS.HUD_STYLE);
        
        this.defense = this.add.text(0, 0, '');
        this.alignmentGrid.positionItemAtIndex(104, this.defense, CONSTANTS.HUD_STYLE);

        this.range = this.add.text(0, 0, '');
        this.alignmentGrid.positionItemAtIndex(105, this.range, CONSTANTS.HUD_STYLE);
        
        this.movement = this.add.text(0, 0, '');
        this.alignmentGrid.positionItemAtIndex(113, this.movement, CONSTANTS.HUD_STYLE);
        
        this.dodge = this.add.text(0, 0, '');
        this.alignmentGrid.positionItemAtIndex(114, this.dodge, CONSTANTS.HUD_STYLE);

        this.block = this.add.text(0, 0, '');
        this.alignmentGrid.positionItemAtIndex(115, this.block, CONSTANTS.HUD_STYLE);

        this.cooldown = this.add.text(0, 0, '');
        this.alignmentGrid.positionItemAtIndex(116, this.cooldown, CONSTANTS.HUD_STYLE);
    }

    updateDetailsView(unit) {
        if (unit) {
            this.type.text = `${unit.type}`;
            this.description.text = `${unit.description}`;
            this.health.text = `${CONSTANTS.HEALTH}: ${unit.health}`;
            this.defense.text = `${CONSTANTS.DEFENSE}: ${100 * unit.defense}%`;
            this.offense.text = `${CONSTANTS.OFFENSE}: ${unit.offense}`;
            this.range.text = `${CONSTANTS.RANGE}: ${unit.range}`;
            this.movement.text = `${CONSTANTS.MOVEMENT}: ${unit.movement}`;
            this.dodge.text = `${CONSTANTS.DODGE}: ${100 * unit.dodge}%`;
            this.block.text = `${CONSTANTS.BLOCK}: ${100 * unit.block}%`;
            this.cooldown.text = `${CONSTANTS.COOLDOWN}: ${unit.cooldown} [+1 after move and attack]`;

            this.type.setVisible(true);
            this.description.setVisible(true);
            this.health.setVisible(true);
            this.defense.setVisible(true);
            this.offense.setVisible(true);
            this.range.setVisible(true);
            this.movement.setVisible(true);
            this.dodge.setVisible(true);
            this.block.setVisible(true);
            this.cooldown.setVisible(true);
        }
    }

    hideDetailsView() {
        this.type.setVisible(false);
        this.description.setVisible(false);
        this.health.setVisible(false);
        this.defense.setVisible(false);
        this.offense.setVisible(false);
        this.range.setVisible(false);
        this.movement.setVisible(false);
        this.dodge.setVisible(false);
        this.block.setVisible(false);
        this.cooldown.setVisible(false);
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