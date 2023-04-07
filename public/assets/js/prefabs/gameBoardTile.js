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
}