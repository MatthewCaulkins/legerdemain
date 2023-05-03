class Controller {
    constructor() {
    }

    init(config) {
        this.scene = config.scene;

        this.selectedPhaseButton = null;
        this.selectedFromTile = null;
        this.selectedToTile = null;
        this.targetTile = null;
        this.currentTile = null;

        this.players = config.players;
        this.playerTurn = 1;
        this.playerPhase = CONSTANTS.SELECTION_ACTION;
        
        this.generatedBoard = config.generatedBoard;
        this.unitStats = config.unitStats;
        this.actionButtonContainer = config.actionButtonContainer;
    }


    updateDetailsView(unit) {
        this.unitStats.updateStats(unit);
    }

    hideStats() {
        this.unitStats.hideStats();
    }


    // Set the highlight to all tiles in range
    highlightTilesInRange(tile) {
        // Get the range
        const unit = tile.unit;
        const movement = unit.movement;
        const generatedBoard = this.generatedBoard;
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
        //this.playerAction = CONSTANTS.SELECTION_ACTION;
        this.removeAllHighlights();
    }

    // Iterate over all tiles and remove the tint
    removeAllHighlights() {
        // console.log(this.generatedBoard);
        this.generatedBoard.tiles.forEach((tile) => {
            tile.clearTint();
        });
    }

}