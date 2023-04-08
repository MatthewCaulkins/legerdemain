class GameBoardTile extends Tile {
    constructor(config) {
        super(config);

        this.setRotation(CONSTANTS.BOARD_ORIENTATION);

        this.on(CONSTANTS.POINTER_OVER, this.pointerover);
        this.on(CONSTANTS.POINTER_OUT, this.pointerout);
        this.on(CONSTANTS.POINTER_DOWN, this.pointerdown);
        
        // Whether or not we are about to do special stuff to the tile
        this.active = false;
        this.inRange = false;
        
        // The path to get to this tile
        this.path = [];
    }

    pointerover() {
    } 

    pointerout() {
    }

    pointerdown() {
        if (this === this.scene.selectedTileFrom) {
        //    this.active = false;
            this.scene.selectedTileFrom = null;
            this.scene.removeAllHighlights();
        
        } else {
            if (this.unit) {
                this.scene.selectedTileFrom = this;

                this.setTint(CONSTANTS.RED_TINT);
                // Highlight all tiles within unit's range
                this.scene.highlightTilesInRange(this);
            }
        }    
    }
}