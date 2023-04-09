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
        if (this.scene.phase === CONSTANTS.GAME_PHASE) { // Only do actions during game phase   
            if (this.scene.selectedFromtTile) {  // there is a selected tile
                if (this === this.scene.selectedFromTile) { // it's this tile

                } else { // selected tile is another tile
                    this.setTint(CONSTANTS.GREEN_TINT);
                }
            } else {

            }
        }
    } 

    pointerout() {
    }

    pointerdown() {
        if (this.scene.playerAction === CONSTANTS.SELECTION_ACTION) {  // Selection phase
            if (this.scene.selectedFromTile) { // tile from selected
                if (this === this.scene.selectedFromTile) { // this unit; remove the selection
                //    this.active = false;
                    this.scene.selectedFromTile = null;
                    this.scene.removeAllHighlights();
                } else { // Another space
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