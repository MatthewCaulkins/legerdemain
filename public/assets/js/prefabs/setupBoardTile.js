class SetupBoardTile extends Tile {
    constructor(config) { //}, n) {
        super(config);

        // this.scene = config.scene;
        this.selectGridCounterpart = null;

        this.setRotation(CONSTANTS.BOARD_ORIENTATION);

        this.on(CONSTANTS.POINTER_OVER, this.pointerover);
        this.on(CONSTANTS.POINTER_OUT, this.pointerout);
        this.on(CONSTANTS.POINTER_DOWN, this.pointerdown);
    }

    pointerover() {
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

    pointerout() {
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

    pointerdown() {

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
    }
}