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
        if (this.scene.phase != CONSTANTS.GAME_PHASE) return; // Only do actions during game phase   

        if (this.unit) {
            this.scene.updateDetailsView(this.unit);
        }

        if (this.scene.playerAction === CONSTANTS.MID_ACTION) return;
        if (this.scene.playerTurn != this.scene.playerSide) return;

        if (this.scene.playerAction === CONSTANTS.SELECTION_ACTION || this.scene.playerAction === CONSTANTS.DIRECTION_ACTION) {
            if (this.unit) {
                if (this.unit.playerId != game.player.playerId) return;

                if (this.scene.turnUnit && this.scene.turnUnitLocked) {

                } else {
                    this.setTint(CONSTANTS.GREEN_TINT);
                }
            }
        } else if (this.scene.playerAction === CONSTANTS.MOVEMENT_ACTION) {  // Selection phase
            if (this.unit && this.unit.playerId != game.player.playerId) return;

            if (this.scene.turnUnit) {  // there is a selected tile
                // it's this tile
                //     this.setTint(CONSTANTS.RED_TINT);
                // } else { // selected tile is another tile
                    if (this.unit) {
                        if (this.scene.turnUnit != this.unit && !this.scene.turnUnitLocked) {
                            this.setTint(CONSTANTS.GREEN_TINT);
                        }
                    } else {
                        if (this.inRange) {
                            this.setTint(CONSTANTS.ORANGE_TINT);
                        }
                    }
                // }
            } else {
                if (this.unit) {
                    this.setTint(CONSTANTS.GREEN_TINT);
                }
            }
        } else if (this.scene.playerAction === CONSTANTS.ACTION_ACTION) {
            if (this.scene.turnUnit) {  // there is a selected tile
                // if (this.unit) {
                //     if (this.scene.turnUnit != this.unit && !this.scene.turnUnitLocked) {
                //         this.setTint(CONSTANTS.GREEN_TINT);
                //     }
                // } else {
                    if (this.inRange) {
                        this.setTint(CONSTANTS.ORANGE_TINT);
                    }
                // }
            } 
        }
        
        if (this.unit) {
            if (this.scene.turnUnit === this.unit) {
                if (this.scene.turnUnitLocked) {
                    this.setTint(CONSTANTS.BLUE_TINT);
                } else {
                    this.setTint(CONSTANTS.RED_TINT);
                }
            }
        }
    } 

    pointerout() {
        if (this.scene.phase != CONSTANTS.GAME_PHASE) return; // Only do actions during game phase   

        if (this.unit) {
            this.scene.hideDetailsView(this.unit);
        }

        if (this.scene.playerTurn != this.scene.playerSide) return;        
        if (this.scene.playerAction === CONSTANTS.MID_ACTION) return;
        
        if (this.scene.playerAction === CONSTANTS.SELECTION_ACTION || this.scene.playerAction === CONSTANTS.DIRECTION_ACTION) {
            if (this.unit) {
                if (this.unit.playerId != game.player.playerId) return;
               
                if (this.scene.turnUnit && this.scene.turnUnit.tile === this) {

                } else { 
                    this.clearTint();
                }
            }
        } else if (this.scene.playerAction === CONSTANTS.MOVEMENT_ACTION) {  // Selection phase
            if (this.unit && this.unit.playerId != game.player.playerId) return;
            
            if (this.scene.turnUnit) {  // there is a selected tile
                // if (this.scene.turnUnit === this.unit) { // it's this tile
                //     if (!this.scene.turnUnitLocked) {
                //     //     this.setTint(CONSTANTS.BLUE_TINT);
                //     // } else {
                //         this.setTint(CONSTANTS.RED_TINT);
                //     // }
                // } else {
                    if (this.inRange) {
                        if (this.scene.selectedToTile === this) {
                            this.setTint(CONSTANTS.ORANGE_TINT);
                        } else {
                            this.setTint(CONSTANTS.YELLOW_TINT);
                        }
                    } else {
                        this.clearTint();
                    }
                // }
            } else {
                this.clearTint();
            }
        } else if (this.scene.playerAction === CONSTANTS.ACTION_ACTION) {
            if (this.scene.turnUnit) {
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
        }
        
        if (this.unit) {
            if (this.scene.turnUnit === this.unit) {
                if (this.scene.turnUnitLocked) {
                    this.setTint(CONSTANTS.BLUE_TINT);
                } else {
                    this.setTint(CONSTANTS.RED_TINT);
                }
            }
        }
    }

    pointerdown() {
        if (this.scene.phase != CONSTANTS.GAME_PHASE) return; // Only do actions during game phase   

        if (this.scene.playerAction === CONSTANTS.MID_ACTION) return;
        if (this.scene.playerTurn != this.scene.playerSide) return;

        if (this.scene.playerAction === CONSTANTS.SELECTION_ACTION) {
            if (this.unit && this.unit.playerId != game.player.playerId) return;

            console.log('selection pointer down');
            if (this.unit) {
                if (!this.scene.turnUnitLocked) {
                    this.scene.clearPaths(false);
                    
                    if (this.scene.turnUnit) { // clear old turn unit
                        this.scene.turnUnit.tile.clearTint();
                    }

                    if (this.scene.selectedFromTile === this) {
                        console.log('A');
                        // this.scene.turnUnit.hideHealthbar();
                        this.scene.turnUnit = null;
                        this.scene.selectedFromTile = null;
                        this.setTint(CONSTANTS.GREEN_TINT);
                    } else {
                        console.log('B');
                        if (this.scene.turnUnit) { // clear old turn unit
                            this.scene.turnUnit.showHealthbar(false);
                        } else {
                            this.setTint(CONSTANTS.RED_TINT);
                        }

                        this.scene.turnUnit = this.unit;
                        this.scene.selectedFromTile = this;
                    }
                    
                    this.scene.positionDirections(this.scene.turnUnit);
                }
            }
        } else if (this.scene.playerAction === CONSTANTS.MOVEMENT_ACTION) {  // Movement phase  
            if (this.unit && this.unit.playerId != game.player.playerId) return;

            if (this.scene.turnUnit) { // tile from selected
                if (this.scene.turnUnit === this.unit) { // this unit; remove the selection
                    if (!this.scene.turnUnitLocked) {
                //    this.active = false;
                        this.setTint(CONSTANTS.GREEN_TINT);
                        this.scene.turnUnit = null;
                        this.scene.selectedFromTile = null;
                        this.scene.clearPaths();
                    }
                    // this.scene.removeAllHighlights();
                } else { // Another space
                    if (!this.scene.turnUnitLocked) {
                        if (this.unit) { // Space has one of your units on it
                            console.log('switch to this tile');

                            this.scene.clearPaths();
                            this.scene.turnUnit.showHealthbar(false);
                            this.scene.turnUnit.tile.clearTint();
                            // Highlight all tiles within unit's range

                            this.scene.selectedFromTile = this;
                            this.scene.turnUnit = this.unit;
                            this.scene.positionDirections(this.scene.turnUnit);
                            this.setTint(CONSTANTS.RED_TINT);
                            this.scene.highlightTilesInMovementRange(this);                   
                        }
                    }
                    if (this.inRange) { // space is in range
                        console.log('move unit');
                        this.scene.selectedToTile = this;
                        this.scene.turnUnit = this.scene.selectedFromTile.unit;
                        this.scene.turnUnitLocked = true;
                        // this.scene.playerAction = CONSTANTS.MOVEMENT_ACTION;
                        // TODO: lock scene
                        
                        this.scene.activeActionButton = null;
                        this.scene.startMoveUnit(this.scene.selectedFromTile, this.scene.selectedToTile);
                    }
                }    
            } else { // no unit selected
                if (this.unit) { // this tile has a unit; set it to selected from tile
                    this.scene.selectedFromTile = this;
                    this.scene.turnUnit = this.unit;
                    this.scene.positionDirections(this.scene.turnUnit);

                    this.setTint(CONSTANTS.RED_TINT);
                    // Highlight all tiles within unit's range
                    this.scene.highlightTilesInMovementRange(this);
                }
            }
        } else if (this.scene.playerAction === CONSTANTS.ACTION_ACTION) {
            if (this.scene.turnUnit) { // tile from selected
                if (this.scene.turnUnit === this.unit) { // this unit; remove the selection
                    if (!this.scene.turnUnitLocked) {
                //    this.active = false;
                        this.scene.turnUnit = null;
                        // this.scene.positionDirections(this.scene.turnUnit);
                        this.scene.selectedFromTile = null;
                        this.scene.clearPaths();
                        this.setTint(CONSTANTS.GREEN_TINT);
                    }
                    // this.scene.removeAllHighlights();
                } else { // Another space
                    // if (!this.scene.turnUnitLocked) {
                        // if (this.unit) { // Space has one of your units on it
                            if (this.inRange) { // Attack, regardless who's unit it is and lock the unit
                                console.log('attack unit');
                                this.scene.selectedToTile = this;
                                // this.scene.turnUnit = this.scene.selectedFromTile.unit;
                                this.scene.turnUnitLocked = true;
                        
                                this.scene.activeActionButton = null;
                                this.scene.startUnitAction(this.scene.turnUnit, this.scene.selectedToTile);
                            } else {
                                if (this.unit && this.unit.playerId === game.player.playerId && !this.scene.turnUnitLocked) {
                                    console.log('switch to this tile');

                                    this.scene.clearPaths();
                                    this.scene.turnUnit.tile.clearTint();
                                    this.scene.turnUnit.showHealthbar(false);
                                    // Highlight all tiles within unit's range

                                    this.scene.turnUnit = this.unit;
                                    this.scene.positionDirections(this.scene.turnUnit);
                                    this.scene.selectedFromTile = this;
                                    this.setTint(CONSTANTS.RED_TINT);      
                                    
                                    this.scene.highlightTilesInActionRange(this);
                                }          
                            }
                        // }
                    // }
                }
            } else {
                // no unit selected
                if (this.unit) { // this tile has a unit; set it to selected from tile
                    this.scene.selectedFromTile = this;
                    this.scene.turnUnit = this.unit;
                    this.scene.positionDirections(this.scene.turnUnit);

                    this.setTint(CONSTANTS.RED_TINT);
                    // Highlight all tiles within unit's range
                    this.scene.highlightTilesInActionRange(this);
                }
            }
        }
    }
}