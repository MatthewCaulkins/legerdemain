class GameBoardTile extends Tile {
    constructor(config) {
        super(config);

        this.setRotation(CONSTANTS.BOARD_ORIENTATION);

        this.on(CONSTANTS.POINTER_OVER, this.pointerover);
        this.on(CONSTANTS.POINTER_OUT, this.pointerout);
        this.on(CONSTANTS.POINTER_DOWN, this.pointerdown);
        
        // Player number used for turn order
        this.playerNumber;
        
        // Whether or not we are about to do special stuff to the tile
        this.active = false;
        this.inRange = false;
        
        // The path to get to this tile
        this.path = [];
    }

    pointerover() {
        if (this.scene.phase != CONSTANTS.GAME_PHASE) { // Only do actions during game phase   
            return;
        }

        if (this.scene.playerAction === CONSTANTS.SELECTION_ACTION) {  // Selection phase
            if (this.scene.selectedFromTile) {  // there is a selected tile
                if (this === this.scene.selectedFromTile) { // it's this tile
                    this.setTint(CONSTANTS.RED_TINT);
                } else { // selected tile is another tile
                    if (this.unit) {
                        this.setTint(CONSTANTS.GREEN_TINT);
                    } else {
                        if (this.inRange) {
                            this.setTint(CONSTANTS.ORANGE_TINT);
                        }
                    }
                }
            } else {
                if (this.unit) {
                    this.setTint(CONSTANTS.GREEN_TINT);
                }
            }
        }
    } 

    pointerout() {
        if (this.scene.phase != CONSTANTS.GAME_PHASE) { // Only do actions during game phase   
            return;
        }

        if (this.scene.playerAction === CONSTANTS.SELECTION_ACTION) {  // Selection phase
            if (this.scene.selectedFromTile) {  // there is a selected tile
                if (this === this.scene.selectedFromTile) { // it's this tile
                    this.setTint(CONSTANTS.RED_TINT);
                } else {
                    if (this.inRange) {
                        if (this.scene.selectedToTile === this) {
                            this.setTint(CONSTANTS.ORANGE_TINT);
                        } else {
                            this.setTint(CONSTANTS.YELLOW_TINT);
                        }
                    } else {
                        this.clearTint();
                    }
                }
            } else {
                this.clearTint();
            }
        }
    }

    pointerdown() {
        if (this.scene.phase != CONSTANTS.GAME_PHASE) { // Only do actions during game phase   
            return;
        }

        if (this.scene.playerAction === CONSTANTS.SELECTION_ACTION) {  // Selection phase
            if (this.scene.selectedFromTile) { // tile from selected
                if (this === this.scene.selectedFromTile) { // this unit; remove the selection
                //    this.active = false;
                    this.scene.selectedFromTile = null;
                    this.scene.clearPaths();
                    // this.scene.removeAllHighlights();
                } else { // Another space
                    if (this.unit) { // Space has one of your units on it
                        console.log('switch to this tile');

                        this.scene.clearPaths();
                        // Highlight all tiles within unit's range

                        this.scene.selectedFromTile = this;
                        this.setTint(CONSTANTS.RED_TINT);
                        this.scene.highlightTilesInRange(this);
                    }
                    if (this.inRange) { // space is in range
                        console.log('move unit');
                        this.scene.selectedToTile = this;
                        this.scene.playerAction = CONSTANTS.MOVEMENT_ACTION;
                        // TODO: lock scene
                        this.scene.moveUnit(this.scene.selectedFromTile);
                    }
                }    
            } else { // no unit selected
                if (this.unit) { // this tile has a unit; set it to selected from tile
                    this.scene.selectedFromTile = this;

                    this.setTint(CONSTANTS.RED_TINT);
                    // Highlight all tiles within unit's range
                    this.scene.highlightTilesInRange(this);
                }
            }
        }
    }
}