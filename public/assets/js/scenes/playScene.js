class PlayScene extends Phaser.Scene {
    constructor() {
        super({key: CONSTANTS.PLAY_SCENE});
    }

    preload() {
    }

    create() {
        console.log('Player');
        console.log(game.player);
        console.log(game.player.armies.length);

        model.currentScene = this;
        this.phase = CONSTANTS.ARMY_SELECT_PHASE;
        this.playerTurn = CONSTANTS.LEFT;
        this.playerAction = '';
        this.activeActionButton = null;
        this.playerSide = CONSTANTS.LEFT;

        console.log("CONTROLLER");
        console.log(controller);
        if (controller.gameRoom) {
            this.player1 = controller.gameRoom.player1;
            this.player2 = controller.gameRoom.player2;
        
            // if (this.player1.playerId === game.player.playerId) {
            //     this.playerSide = CONSTANTS.LEFT;
            // } else 
            if (this.player2.playerId === game.player.playerId) {
                this.playerSide = CONSTANTS.RIGHT;
            }
        }

        // Unit this turn only focuses on
        this.turnUnit = null;
        this.turnUnitLocked = false;

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

        // Only have armies that are created
        // console.log(game.player.armies);
        this.playerArmies = [];
        game.player.armies.forEach(army => {
            this.playerArmies.push(army);
        })

        // console.log(this.playerArmies);

        const armyDeploymentConfig = {
            scene: this,
            armyUnits: this.playerArmies[this.currentArmy],  
            generatedBoard: this.generatedBoard,
            unitsBoard: this.unitsBoard,
            playerSide: this.playerSide
        }
        this.armyDeployment = new ArmyDeployment(armyDeploymentConfig);

        
        // Add UI for selecting army phase
        this.armyName = this.add.text(0, 0, this.playerArmies[this.currentArmy].name, CONSTANTS.HUD_STYLE);
        this.armyName.setOrigin(.5, .5);
        let acceptIndex = 41;
        
        this.selectArmyText = this.add.text(0, 0, 'Select your army', CONSTANTS.HUD_STYLE);
        this.selectArmyText.setOrigin(.5, .5);

        this.opponentSelectArmyText = this.add.text(0, 0, 'Opponent is selecting their army', CONSTANTS.HUD_STYLE);
        this.opponentSelectArmyText.setOrigin(.5, .5);

        if (this.playerSide === CONSTANTS.LEFT) {
            this.alignmentGrid.positionItemAtIndex(19, this.selectArmyText);
            this.alignmentGrid.positionItemAtIndex(96, this.opponentSelectArmyText);
            this.alignmentGrid.positionItemAtIndex(30, this.armyName);
        } else { 
            this.alignmentGrid.positionItemAtIndex(85, this.selectArmyText);
            this.alignmentGrid.positionItemAtIndex(30, this.opponentSelectArmyText);
            this.alignmentGrid.positionItemAtIndex(96, this.armyName);
            acceptIndex = 107;
        }

        if (this.playerArmies.length > 1) {
            this.leftArrow = new ScrollArrow(this, 'left', .5);
            this.rightArrow = new ScrollArrow(this, 'right', .5);

            if (this.playerSide === CONSTANTS.LEFT) {
                this.alignmentGrid.positionItemAtIndex(28, this.leftArrow);
                this.alignmentGrid.positionItemAtIndex(32, this.rightArrow);
            } else {
                this.alignmentGrid.positionItemAtIndex(94, this.leftArrow);
                this.alignmentGrid.positionItemAtIndex(98, this.rightArrow);
            }
        }

        // The button to get back to the home page
        this.quitButton = new Button({
            scene: this, 
            key: 'tile',
            text: 'Quit Game',
            textConfig: CONSTANTS.LIGHT_TEXT_STYLE,
            event: CONSTANTS.QUIT_GAME_SELECTED,
            alignmentGrid: this.alignmentGrid,
            index: 12
        });
        emitter.once(CONSTANTS.QUIT_GAME_SELECTED, this.quitGame);

        // The button to accept this setup
        this.acceptButton = new Button({
            scene: this, 
            key: CONSTANTS.TILE,
            text: 'Select Army',
            textConfig: CONSTANTS.LIGHT_TEXT_STYLE,
            event: CONSTANTS.ACCEPT_ARMY,
            alignmentGrid: this.alignmentGrid,
            index: acceptIndex
        });
        emitter.once(CONSTANTS.ACCEPT_ARMY, this.acceptArmy.bind(this));

        // Add direction buttons
        this.directions = new DirectionButtonContainer({
            scene: this,
            // unit: this,
            scale: .7
        });
        // this.add(this.directions);
        this.directions.setVisible(false);

        // Add event listeners for battle actions
        emitter.on(CONSTANTS.MOVE_UNIT_CONFIRMED, (data) => {
            this.moveUnitConfirmed(data);
        });

        emitter.on(CONSTANTS.UNIT_ACTION_CONFIRMED, (data) => {
            console.log('Unit action');
            console.log(data);

            // let path = [];

            // data.path.forEach(step => {
            //     const stepTile = this.generatedBoard.getTile(step.tileNum);
            //     path.push({direction: step.direction, tile: stepTile});
            // });

            // const startTile = this.generatedBoard.getTile(data.currentTileNum);
            // const endTile = this.generatedBoard.getTile(data.selectedToTileNum);
            // endTile.path = path;

            // console.log(endTile);
            // data.selectedToTile.path = data.path;
            this.unitAction(data);
        });

        emitter.on(CONSTANTS.CHANGE_DIRECTION_CONFIRMED, (data) => {
            this.changeDirectionConfirmed(data);
        });

        
        emitter.on(CONSTANTS.END_TURN_CONFIRMED, (data) => {
            console.log('end turn');
            this.endTurn(data);
        });

        // Add the opponents army
        emitter.on(CONSTANTS.ARMIES_SELECTED, () => {
            this.armiesSelected();
        });

        emitter.on(CONSTANTS.QUIT_GAME_CONFIRMED, () => {
            console.log('quit confirmed emitter on');
            this.quitGameConfirmed();
        });
        

        this.player1Name = this.add.text(0, 0, controller.gameRoom.player1.name, CONSTANTS.HUD_STYLE);
        this.player1Name.setOrigin(0, 1);
        this.player1Name.setRotation(-CONSTANTS.BOARD_ORIENTATION);
        this.alignmentGrid.positionItemAtIndex(44, this.player1Name);
        this.player1Name.x += 10;
        this.player1Name.y -= 20;
        
        this.player2Name = this.add.text(0, 0, controller.gameRoom.player2.name, CONSTANTS.HUD_STYLE);
        this.player2Name.setOrigin(1, 0);
        this.player2Name.setRotation(-CONSTANTS.BOARD_ORIENTATION);
        this.alignmentGrid.positionItemAtIndex(73, this.player2Name);
        this.player2Name.x -= 65;
        this.player2Name.y += 15;
    }

    // update() {}


    quitGame() {
        console.log('quit game');
        // Remove event listeners

        emitter.emit(CONSTANTS.QUIT_GAME, {roomID: controller.gameRoom.roomID});
    }

    quitGameConfirmed() {
        console.log('quit confirmed');

        emitter.removeListener(CONSTANTS.ACCEPT_ARMY);
        emitter.removeListener(CONSTANTS.QUIT_GAME_SELECTED);
        emitter.removeListener(CONSTANTS.MOVE_UNIT_CONFIRMED);
        emitter.removeListener(CONSTANTS.CHANGE_DIRECTION_CONFIRMED);
        emitter.removeListener(CONSTANTS.UNIT_ACTION_CONFIRMED);
        emitter.removeListener(CONSTANTS.END_TURN_CONFIRMED);
        emitter.removeListener(CONSTANTS.ARMIES_SELECTED);
        emitter.removeListener(CONSTANTS.QUIT_GAME_CONFIRMED);

        controller.gameRoom = null;

        // Save the board placements to the database
        game.scene.start(CONSTANTS.HOME_SCENE);
        game.scene.stop(CONSTANTS.PLAY_SCENE);
    }

    shiftArmy() {
        console.log(this.playerArmies);
        console.log(this.currentArmy);
        this.armyName.text = this.playerArmies[this.currentArmy].name;
        this.armyDeployment.armyUnits = this.playerArmies[this.currentArmy];
        this.armyDeployment.clearGameBoard();
        this.armyDeployment.populateBoard();
    }

    acceptArmy() {
        // TODO: Get both events fired to server and start game
        this.armyName.destroy();
        this.acceptButton.destroy();

        if (this.playerArmies.length > 1) {
            this.leftArrow.destroy();
            this.rightArrow.destroy(); 
        }

        this.selectArmyText.text = 'Waiting for opponent to finish selecting their army';
        if (this.playerSide === CONSTANTS.LEFT) {
            this.alignmentGrid.positionItemAtIndex(30, this.selectArmyText);
        } else { 
            this.alignmentGrid.positionItemAtIndex(96, this.selectArmyText);
        }
        // TODO: remove the else stuff for testing
        // if (controller.gameRoom) {
        console.log('Army Units');
        console.log(this.armyDeployment.armyUnits);
        console.log(controller.gameRoom);
        emitter.emit(CONSTANTS.SELECTED_ARMY, {roomID: controller.gameRoom.roomID, player: this.playerSide, army: this.armyDeployment.armyUnits});
        // } else {
        //     this.startGame();
        // }
    }

    armiesSelected() {
        console.log('ARMIES SELECTED');
        if (this.playerSide === CONSTANTS.LEFT) {
            this.opponentArmy = controller.gameRoom.player2Army;
            this.opponentArmyCount = this.opponentArmy.units.length;
            this.opponentId = controller.gameRoom.player2.playerId;

            this.playerArmyCount = controller.gameRoom.player1Army.units.length;
        } else {
            this.opponentArmy = controller.gameRoom.player1Army;
            this.opponentArmyCount = this.opponentArmy.units.length;
            this.opponentId = controller.gameRoom.player1.playerId;

            this.playerArmyCount = controller.gameRoom.player2Army.units.length;
        }

        console.log(controller);
        this.armyDeployment.opponentArmyUnits = this.opponentArmy;
        this.armyDeployment.populateOpponentBoard(this.opponentId);
        
        this.startGame();
    }

    startGame() {
        this.selectArmyText.destroy();
        this.opponentSelectArmyText.destroy();

        this.phase = CONSTANTS.GAME_PHASE;

        // TODO: set active player
        this.playerAction = CONSTANTS.SELECTION_ACTION;
        
        // TODO: Add Attack/ Move/ Direction/ Wait buttons
        this.addActionButtons();

        // Add unit stats component
        this.unitStats = new UnitStats(this);
        this.alignmentGrid.positionItemAtIndex(84, this.unitStats);

        if (this.playerSide === CONSTANTS.LEFT) {
            this.actionButtonContainer.setActive(CONSTANTS.MOVE_BUTTON);
        }
        // this.player2Name = this.add.text(0, 0, game.player.name, CONSTANTS.HUD_STYLE);
        // this.add(this.player2Name);
        // this.alignmentGrid.positionItemAtIndex(100, this.player2Name);

        // Add game controller
    }

    addActionButtons() {
        const config = {
            scene: this, 
            playerSide: this.playerSide,
        }

        this.currentPlayerText = this.add.text(0, 0, controller.gameRoom.player1.name + "'s Turn", CONSTANTS.HUD_STYLE);
        this.currentPlayerText.setOrigin(.5, .5);
        this.alignmentGrid.positionItemAtIndex(19, this.currentPlayerText);

        this.actionButtonContainer = new ActionButtonContainer(config);
        this.alignmentGrid.positionItemAtIndex(29, this.actionButtonContainer);
        // this.actionButtonContainer.x += this.alignmentGrid.cellWidth / 2;
        this.actionButtonContainer.y -= this.alignmentGrid.cellHeight / 2;
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

    
    updateDetailsView(unit) {
        this.unitStats.updateStats(unit);
        unit.showHealthbar(true);
    }

    hideDetailsView(unit) {
        this.unitStats.hideStats();

        if (unit != this.turnUnit && !unit.active) {
            unit.showHealthbar(false);
        }
    }


    // Set the highlight to all tiles in range
    highlightTilesInMovementRange(tile) {
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
                            questionedTile.path.push({direction: CONSTANTS.TOP, tileNum: questionedTile.number}); //CONSTANTS.TOP); //tile: questionedTile, 
                            tilesOfInterest.push(questionedTile);
                        // } else {
                        //     console.log('tile included already');
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
                            questionedTile.path.push({direction: CONSTANTS.RIGHT, tileNum: questionedTile.number}); //CONSTANTS.RIGHT); //tile: questionedTile, 
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
                            questionedTile.path.push({direction: CONSTANTS.BOTTOM, tileNum: questionedTile.number}); // CONSTANTS.DOWN); //tile: questionedTile, 
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
                            questionedTile.path.push({direction: CONSTANTS.LEFT, tileNum: questionedTile.number}); // CONSTANTS.LEFT); //tile: questionedTile, 
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

    startMoveUnit(currentTile, selectedToTile) {
        this.playerAction = CONSTANTS.MID_ACTION;
        this.removeAllHighlights(selectedToTile.path);

        emitter.emit(CONSTANTS.MOVE_UNIT, {
            roomID: controller.gameRoom.roomID,
            currentTileNum: currentTile.number, 
            selectedToTileNum: selectedToTile.number,
            path: selectedToTile.path
        });
        // this.moveUnit(currentTile);
    }

    moveUnitConfirmed(data) {
        console.log('Move Unit');
        console.log(data);

        let path = [];

        data.path.forEach(step => {
            const stepTile = this.generatedBoard.getTile(step.tileNum);
            path.push({direction: step.direction, tile: stepTile});
        });

        const startTile = this.generatedBoard.getTile(data.currentTileNum);
        const endTile = this.generatedBoard.getTile(data.selectedToTileNum);
        endTile.path = path;

        console.log(endTile);
        // data.selectedToTile.path = data.path;

        if (!this.turnUnit) {
            this.turnUnit = startTile.unit;
        }
        this.moveUnit(startTile, endTile);
    }

    moveUnit(currentTile, selectedToTile) {
        this.actionButtonContainer.setUsed(CONSTANTS.MOVE_BUTTON);
        // TODO: Clear everything but the path

        this.currentTile = currentTile;
        const unit = currentTile.unit;
        // console.log(unit);
        // console.log(unit.character);

        // let currentTile = this.selectedFromTile;
        this.selectedToTile = selectedToTile;
        const path = this.selectedToTile.path.shift();
        const direction = path.direction;

        unit.setDirection(direction);

        // TODO: set direction frames
        // switch (direction) {
        //     case CONSTANTS.TOP:
        //         unit.character.play(unit.topIdle);
        //         unit.tint.play(unit.topTintIdle);
        //         break;
        //     case CONSTANTS.RIGHT:
        //         unit.character.play(unit.rightIdle);
        //         unit.tint.play(unit.rightTintIdle);
        //         break;
        //     case CONSTANTS.BOTTOM:
        //         unit.character.play(unit.bottomIdle);
        //         unit.tint.play(unit.bottomTintIdle);
        //         break;
        //     case CONSTANTS.LEFT:
        //         unit.character.play(unit.leftIdle);
        //         unit.tint.play(unit.leftTintIdle);
        //         break;
        // }

        this.targetTile = path.tile;

        // Remove tints as the character moves
        this.currentTile.clearTint();

        
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
                scene.selectedFromTile = scene.targetTile;
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
                    scene.moveUnit(scene.targetTile, scene.selectedToTile);
                } else {
                    // TODO: unlock scene
                    scene.clearPaths();
                    
                    scene.playerAction = CONSTANTS.SELECTION_ACTION;

                    unit.tile.setTint(CONSTANTS.BLUE_TINT);

                    scene.positionDirections(unit);
                    // scene.removeAllHighlights();
                }
            },
        }); 
            //onStart: function()
            //onComplete: function()
    }

    
    // Set the highlight to all tiles in range
    highlightTilesInActionRange(tile) {
        // Get the range
        const unit = tile.unit;
        const range = unit.range;
        const generatedBoard = tile.scene.generatedBoard;
        // const scene = tile.scene;
        // const number = tile.number;
        let questionedTile;

        tile.path = [];

        const tilesOfInterest = [tile];

        // console.log(generatedBoard);
        for (let i = 0; i < range; i++) {
            tilesOfInterest.forEach(tileOfInterest => {

                // console.log(tileOfInterest);

                // console.log(`Column ${tileOfInterest.column}  Row ${tileOfInterest.row}`)
                if (tileOfInterest.column - 1 >= 0) {
                    questionedTile = generatedBoard.board[tileOfInterest.row][tileOfInterest.column - 1];

                    // console.log(questionedTile);

                    // Will have to take into account friendly units in the Play Scene
                    // if (questionedTile.unit === null) {
                        if (!tilesOfInterest.includes(questionedTile)) {
                            console.log(tileOfInterest.path);
                            tileOfInterest.path.forEach(path => {
                                questionedTile.path.push(path);
                            })
                            questionedTile.path.push({direction: CONSTANTS.TOP, tileNum: questionedTile.number}); //CONSTANTS.TOP); //tile: questionedTile, 
                            tilesOfInterest.push(questionedTile);
                        // } else {
                        //     console.log('tile included already');
                        }
                    // }
                }
                
                if (tileOfInterest.row + 1 < generatedBoard.mapRows) {
                    questionedTile = generatedBoard.board[tileOfInterest.row + 1][tileOfInterest.column]
                    // if (questionedTile.unit === null) {
                        if (!tilesOfInterest.includes(questionedTile)) {
                            tileOfInterest.path.forEach(path => {
                                questionedTile.path.push(path);
                            })
                            questionedTile.path.push({direction: CONSTANTS.RIGHT, tileNum: questionedTile.number}); //CONSTANTS.RIGHT);
                            tilesOfInterest.push(questionedTile);
                        }
                    // }
                }

                if (tileOfInterest.column + 1 < generatedBoard.mapColumns) {
                    questionedTile = generatedBoard.board[tileOfInterest.row][tileOfInterest.column + 1]
                    // if (questionedTile.unit === null) {
                        if (!tilesOfInterest.includes(questionedTile)) {
                            tileOfInterest.path.forEach(path => {
                                questionedTile.path.push(path);
                            })
                            questionedTile.path.push({direction: CONSTANTS.BOTTOM, tileNum: questionedTile.number}); // CONSTANTS.DOWN);
                            tilesOfInterest.push(questionedTile);
                        }
                    // }
                }
                
                if (tileOfInterest.row - 1 >= 0) {
                    questionedTile = generatedBoard.board[tileOfInterest.row - 1][tileOfInterest.column]
                    // if (questionedTile.unit === null) {
                        if (!tilesOfInterest.includes(questionedTile)) {
                            tileOfInterest.path.forEach(path => {
                                questionedTile.path.push(path);
                            })
                            questionedTile.path.push({direction: CONSTANTS.LEFT, tileNum: questionedTile.number}); // CONSTANTS.LEFT);
                            tilesOfInterest.push(questionedTile);
                        }
                    // }
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

    startUnitAction(selectedToTile) {
        //start action
        // TODO: determine which action to take based on unit
        const path = selectedToTile.path;
        const direction = path.direction;

        const actionUnit = {
            tileNum: this.turnUnit.tile.number,
            // type: this.turnUnit.type,
            offense: this.turnUnit.offense,
            action: this.turnUnit.action,
            // cooldown: this.turnUnit.cooldown,
            direction: direction,
            path: path
        };
        this.playerAction = CONSTANTS.MID_ACTION;
        this.removeAllHighlights([{tile: this.turnUnit.tile}, {tile: selectedToTile}]);

        const recievingUnit = selectedToTile.unit ? 
            {
                tileNum: selectedToTile.number,
                // type: selectedToTile.unit.type, 
                currentHealth: selectedToTile.unit.currentHealth,
                defense: selectedToTile.unit.defense, 
                dodge: selectedToTile.unit.dodge, 
                block: selectedToTile.unit.block, 
                direction: selectedToTile.unit.currentDirection
            } : null;

        emitter.emit(CONSTANTS.UNIT_ACTION, {
            roomID: controller.gameRoom.roomID,
            // currentTileNum: currentTile.number, 
            actionUnit: actionUnit,
            // selectedToTileNum: selectedToTile.number,
            recievingUnit: recievingUnit,
            // path: selectedToTile.path
        });
    }

    unitAction(data) {
        this.actionButtonContainer.setUsed(CONSTANTS.ACTION_BUTTON);

        // TODO: make this an array for multiple units
       
        console.log('Unit Action Confirmed');
        console.log(data);

        const actionUnit = this.generatedBoard.getTile(data.actionUnit.tileNum).unit;
        // actionUnit.setActive(true);
        actionUnit.setDirection(data.actionUnit.path[0].direction);
        if (!this.turnUnit) {
            this.turnUnit = actionUnit;
        }

        let recievingUnit;
        if (data.recievingUnit) {
            recievingUnit = this.generatedBoard.getTile(data.recievingUnit.tileNum).unit;
            recievingUnit.setActive(true);

            console.log(actionUnit);
            console.log(recievingUnit);

            recievingUnit.resolveAction(data.result.value, data.result.action, data.result.turn, data.actionUnit.path[0].direction, data.result.text);
            this.updateDetailsView(recievingUnit);
            
        }

        let destroyed = data.result ? data.result.destroyed : null;
        this.time.addEvent({ delay: 1400, repeat: 0, callback: this.finishAction, callbackScope: this, args: [recievingUnit, destroyed]});
        // TODO: Make all the animations and stuff happen
        // this.playerAction = CONSTANTS.SELECTION_ACTION;
        // if (recievingUnit) {
        //     recievingUnit.setActive(false);
        // }
        // actionUnit.setActive(false);
    }

    finishAction(recievingUnit, destroyed) {
        console.log(this.playerAction);
        console.log('UNLOCK SCENE');
        console.log(recievingUnit);
        console.log(destroyed);
        this.playerAction = CONSTANTS.SELECTION_ACTION;
        console.log(this.playerAction);

        if (recievingUnit) {
            recievingUnit.setActive(false);
            recievingUnit.tile.clearTint();

            if (destroyed) {
                recievingUnit.tile.unit = null;
                recievingUnit.destroy();

                if (this.playerTurn === this.playerSide) {
                    this.opponentArmyCount -= 1;

                    if (this.opponentArmyCount === 0) {
                        this.endGame(true);
                        // console.log('VICTORY');

                        
                        // TODO: victory popup
                    }
                } else {
                    this.playerArmyCount -= 1;

                    if (this.playerArmyCount === 0) {
                        this.endGame(false);
                        // console.log('DEFEAT');

                        // TODO: defeat popup
                    }
                }
            }
        } else {
            if (this.selectedToTile) {
                this.selectedToTile.clearTint();
            }
        }
    }

    endGame(victory) {
        // Remove Interactivity
        this.generatedBoard.tiles.forEach((tile) => {
            tile.disableInteractive();
        });
        this.quitButton.image.disableInteractive();
        this.actionButtonContainer.removeInteractive();

        let config;
        config = {
            scene: this,
            imageKey: 'lance',
            buttonKey: 'tile',
            buttonText: 'Accept',
            buttonTextConfig: CONSTANTS.LIGHT_TEXT_STYLE,
            buttonEvent: CONSTANTS.ACCEPT_GAME_OVER,
        }

        emitter.on(CONSTANTS.ACCEPT_GAME_OVER, this.leaveGame);

        if (victory) {
            config.imageKey = 'lance';
        } else {
            config.imageKey = 'lance';
        }

        const overlay = new Overlay(config);
    }

    leaveGame() {
        emitter.removeListener(CONSTANTS.ACCEPT_ARMY);
        emitter.removeListener(CONSTANTS.QUIT_GAME_SELECTED);
        emitter.removeListener(CONSTANTS.MOVE_UNIT_CONFIRMED);
        emitter.removeListener(CONSTANTS.CHANGE_DIRECTION_CONFIRMED);
        emitter.removeListener(CONSTANTS.UNIT_ACTION_CONFIRMED);
        emitter.removeListener(CONSTANTS.END_TURN_CONFIRMED);
        emitter.removeListener(CONSTANTS.ARMIES_SELECTED);
        emitter.removeListener(CONSTANTS.QUIT_GAME_CONFIRMED);
        emitter.removeListener(CONSTANTS.ACCEPT_GAME_OVER);

        controller.gameRoom = null;

        // Save the board placements to the database
        game.scene.start(CONSTANTS.HOME_SCENE);
        game.scene.stop(CONSTANTS.PLAY_SCENE);
    }

    positionDirections(unit) {
        this.directions.setUnit(unit);
    }

    changeDirectionConfirmed(data) {
        console.log('Change directions');
        console.log(data);

        const tile = this.generatedBoard.getTile(data.currentTileNum);

        this.directions.setVisible(false);
    // this.scene.turnUnit.directions.setVisible(false);
        tile.unit.setDirection(data.direction);
    }

    clearPaths(clearSelections = true) {
        // console.log('clearPaths');
        // console.log('clear selections: ' + clearSelections);
        this.generatedBoard.tiles.forEach((tile) => {
            tile.inRange = false;
            tile.path = [];
        });

        if (clearSelections) {
            this.selectedToTile = null;
            this.selectedFromTile = null;
        }

        //this.playerAction = CONSTANTS.SELECTION_ACTION;
        this.removeAllHighlights();
    }

    // Iterate over all tiles and remove the tint
    removeAllHighlights(exclude = null) {
        // console.log(this.generatedBoard);
        // console.log('Path');
        // console.log(exclude);
                

        this.generatedBoard.tiles.forEach((tile) => {
            let clear = true;
            if (exclude) {
                exclude.forEach(excludeTile => {
                    if (excludeTile.tile === tile) {
                        clear = false;
                    }                    
                });

                if (clear) {
                    tile.clearTint();
                }
            } else {
                //console.log('This should clear');
                if (this.selectedFromTile != tile && (tile.unit === null || this.turnUnit != tile.unit)) {
                    //console.log('Tile is not important');
                    tile.clearTint();
                }
            }
        });
    }

    endTurn(data) {
        console.log('got to end turn');
        this.playerAction = CONSTANTS.SELECTION_ACTION;
        this.activeActionButton = null;

        // Lower all cooldowns by 1
        this.unitsBoard.iterate((unit) => {
            if (this.playerTurn === CONSTANTS.LEFT && controller.gameRoom.player1.playerId === unit.playerId) {
                unit.lowerCooldown();
            }

            if (this.playerTurn === CONSTANTS.RIGHT && controller.gameRoom.player2.playerId === unit.playerId) {
                unit.lowerCooldown();
            }
        });

        // Set cooldown 
        // let fullCooldown = false;
        // if (this.actionButtonContainer.movementButton.used && this.actionButtonContainer.actionButton.used) {
        //     fullCooldown = true;
        // }
        console.log('turn unit');
        console.log(this.turnUnit);
        if (this.turnUnit) {
            this.turnUnit.setCooldown(data.fullCooldown);
        }

        this.playerTurn = this.playerTurn === CONSTANTS.LEFT ? CONSTANTS.RIGHT : CONSTANTS.LEFT;
        this.currentPlayerText.text = this.playerTurn === CONSTANTS.LEFT ? controller.gameRoom.player1.name + "'s Turn" : controller.gameRoom.player2.name + "'s Turn";

        if (this.turnUnit) {
            this.turnUnit.showHealthbar(false);
        }
        this.turnUnit = null;
        this.turnUnitLocked = false;

        // Tiles for movement and attack
        this.selectedFromTile = null;
        this.selectedToTile = null;
        this.targetTile = null;
        this.currentTile = null;

        this.actionButtonContainer.reset();
        this.clearPaths();

        if (this.playerSide === this.playerTurn) {
            this.actionButtonContainer.setActive(CONSTANTS.MOVE_BUTTON);
        }
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