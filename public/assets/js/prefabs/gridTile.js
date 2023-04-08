class GridTile extends Tile {
    constructor(config) {
        super(config);
        this.unitsBoardCounterpart = null;

        this.setRotation(CONSTANTS.GRID_ORIENTATION);
        
        this.on(CONSTANTS.POINTER_OVER, this.pointerover);
        this.on(CONSTANTS.POINTER_OUT, this.pointerout);
        this.on(CONSTANTS.POINTER_DOWN, this.pointerdown);
    }

    pointerover() {
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

    pointerout() {
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

    pointerdown() {
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

    select() {
        
    }

    setHighlight() {

    }

    clearHighlight() {

    }
}