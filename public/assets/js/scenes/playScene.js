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
        // this.alignmentGrid.showCellIndex();

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
        this.unitsBoard = this.add.container(0, 0);

        // TODO: Wait for Socket.IO to return both selected armies

        // Only have armies that are created
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
            texture: CONSTANTS.QUIT_BUTTON,
            event: CONSTANTS.QUIT_GAME_SELECTED,
            alignmentGrid: this.alignmentGrid,
            defaultKey: CONSTANTS.QUIT_BUTTON_DEFAULT,
            hoverKey: CONSTANTS.QUIT_BUTTON_HOVER,
            downKey: CONSTANTS.QUIT_BUTTON_DOWN,
            index: 12
        });
        emitter.once(CONSTANTS.QUIT_GAME_SELECTED, this.quitGame);

        // The button to accept this setup
        this.acceptButton = new Button({
            scene: this, 
            texture: CONSTANTS.SELECT_ARMY_BUTTON,
            event: CONSTANTS.ACCEPT_ARMY,
            alignmentGrid: this.alignmentGrid,
            defaultKey: CONSTANTS.SELECT_ARMY_BUTTON_DEFAULT,
            hoverKey: CONSTANTS.SELECT_ARMY_BUTTON_HOVER,
            downKey: CONSTANTS.SELECT_ARMY_BUTTON_DOWN,
            index: acceptIndex
        });
        emitter.once(CONSTANTS.ACCEPT_ARMY, this.acceptArmy.bind(this));

        // Tutorial button
        this.tutorialButton = new Button({
            scene: this, 
            texture: CONSTANTS.TUTORIAL_BUTTON,
            event: CONSTANTS.RUN_TUTORIAL,
            alignmentGrid: this.alignmentGrid,
            defaultKey: CONSTANTS.TUTORIAL_BUTTON_DEFAULT,
            hoverKey: CONSTANTS.TUTORIAL_BUTTON_HOVER,
            downKey: CONSTANTS.TUTORIAL_BUTTON_DOWN,
            index: 13
        });
        emitter.on(CONSTANTS.RUN_TUTORIAL, this.runTutorial, this);

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
        
        if (Object.values(game.player.tutorials).indexOf('game') === -1) {
            this.runTutorial();
        }

        this.background = this.add.image(0, 0, CONSTANTS.GAME_SCREEN_BACKGROUND);
        this.background.setOrigin(0, 0);
        this.background.setVisible(false);
        
        this.border = this.add.image(0, 0, CONSTANTS.SETUP_SCREEN_BORDER);
        this.border.setOrigin(0, 0);
    }

    // Game tutorial
    runTutorial() {
        const underlyingInteractives = [
            this.acceptButton.sprite,
            this.quitButton.sprite,
            this.tutorialButton.sprite,
            this.leftArrow,
            this.rightArrow
        ];

        this.tutorialOverlay = new TutorialOverlay({
            scene: this,
            underlyingInteractives: underlyingInteractives,
            screens: [
                {
                    text: 'This is the game screen, where you engage in matches against an opponent.',
                    imageKey: '',
                    imageIndex: 0,
                }, 
                {
                    text: 'If you have saved more than one army, you can use the arrows to select which to use.  If not, you will not see any arrows.  Hit the Select Army button to set yourself as ready to start.',
                    imageKey: '',
                    imageIndex: 12,
                },
                {
                    text: 'You and your opponent will take turns moving one unit at a time.  On a turn, you can attack, move, change the direction your unit is facing, and end your turn.',
                    imageKey: '',
                    imageIndex: 34,
                },
                {
                    text: 'You cannot move through units, and you can target your own units for attacks, so be careful.  The player who eliminates all of his opponents units first wins.',
                    imageKey: '',
                    imageIndex: 34,
                },
                {
                    text: 'Each unit has unique stats and play style.  Use them all to outmanuever your opponent and claim victory',
                    imageKey: '',
                    imageIndex: 34,
                }       
            ],
            textConfig: CONSTANTS.TUTORIAL_TEXT_STYLE,
            buttonTextConfig: CONSTANTS.LIGHT_TEXT_STYLE,
            alignmentGrid: this.alignmentGrid,
            endEvent: CONSTANTS.GAME_TUTORIAL_RUN
        });
    }


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
        emitter.removeListener(CONSTANTS.RUN_TUTORIAL);

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
        this.tutorialButton.destroy();

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

        emitter.emit(CONSTANTS.SELECTED_ARMY, {roomID: controller.gameRoom.roomID, player: this.playerSide, army: this.armyDeployment.armyUnits});
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

        this.playerAction = CONSTANTS.SELECTION_ACTION;
        this.addActionButtons();
        
        this.background.setVisible(true);

        // Add unit stats component
        this.unitStats = new UnitStats({scene: this, textStyle: CONSTANTS.HUD_STYLE});
        this.alignmentGrid.positionItemAtIndex(73, this.unitStats);

        if (this.playerSide === CONSTANTS.LEFT) {
            this.actionButtonContainer.setActive(CONSTANTS.MOVE_BUTTON);
        }
    }

    addActionButtons() {
        const config = {
            scene: this, 
            playerSide: this.playerSide,
        }

        this.currentPlayerContainer = new CurrentPlayerContainer({
            scene: this,
            text: controller.gameRoom.player1.name + "'s Turn",
            textConfig: CONSTANTS.HUD_STYLE,
            texture: CONSTANTS.CURRENT_PLAYER_CONTAINER
        })

        // this.currentPlayerText = this.add.text(0, 0, controller.gameRoom.player1.name + "'s Turn", );
        // this.currentPlayerText.setOrigin(.5, .5);
        this.alignmentGrid.positionItemAtIndex(19, this.currentPlayerContainer);

        this.actionButtonContainer = new ActionButtonContainer(config);
        this.alignmentGrid.positionItemAtIndex(29, this.actionButtonContainer);
        this.actionButtonContainer.y -= this.alignmentGrid.cellHeight / 2;
    }
    
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
        let questionedTile;

        tile.path = [];

        const tilesOfInterest = [tile];

        console.log(generatedBoard);
        for (let i = 0; i < movement; i++) {
            tilesOfInterest.forEach(tileOfInterest => {

                if (tileOfInterest.column - 1 >= 0) {
                    questionedTile = generatedBoard.board[tileOfInterest.row][tileOfInterest.column - 1];

                    if (questionedTile.unit === null) {
                        if (!tilesOfInterest.includes(questionedTile)) {
                            console.log(tileOfInterest.path);
                            tileOfInterest.path.forEach(path => {
                                questionedTile.path.push(path);
                            })
                            questionedTile.path.push({direction: CONSTANTS.TOP, tileNum: questionedTile.number}); 
                            tilesOfInterest.push(questionedTile);
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
                            questionedTile.path.push({direction: CONSTANTS.RIGHT, tileNum: questionedTile.number}); 
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
                            questionedTile.path.push({direction: CONSTANTS.BOTTOM, tileNum: questionedTile.number}); 
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
                            questionedTile.path.push({direction: CONSTANTS.LEFT, tileNum: questionedTile.number});
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
    }

    moveUnitConfirmed(data) {
        // console.log('Move Unit');
        // console.log(data);

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
        this.selectedToTile = selectedToTile;
        const path = this.selectedToTile.path.shift();
        const direction = path.direction;

        unit.setDirection(direction);
        this.targetTile = path.tile;

        // Remove tints as the character moves
        this.currentTile.clearTint();
        this.sound.play(CONSTANTS.FOOTSTEP);
        
        
        this.tweens.add({
            targets: unit, 
            x: this.targetTile.x, 
            y: this.targetTile.y, 
            duration: CONSTANTS.MOVE_SPEED, 
            yoyo: false, 
            repeat: 0,
            // onStart: function () {},// console.log('onStart'); console.log(arguments); },
            onComplete: function () { 
                const unit = arguments[1][0];
                const scene = unit.scene;
                scene.currentTile.unit = null;
                scene.targetTile.unit = unit;

                scene.selectedFromTile = scene.targetTile;
                scene.targetTile.unit.z = scene.targetTile.z;
                unit.tile = scene.targetTile;

                scene.unitsBoard.sort('z');

                if (scene.selectedToTile.path.length > 0) {
                    scene.moveUnit(scene.targetTile, scene.selectedToTile);
                } else {
                    // TODO: unlock scene
                    scene.clearPaths();
                    
                    scene.playerAction = CONSTANTS.SELECTION_ACTION;

                    unit.tile.setTint(CONSTANTS.BLUE_TINT);

                    scene.positionDirections(unit);
                }
            },
        }); 
    }

    
    // Set the highlight to all tiles in range
    highlightTilesInActionRange(tile) {
        const unit = tile.unit;
        const range = unit.range;
        const generatedBoard = tile.scene.generatedBoard;
        const unitsBoard = tile.scene.unitsBoard;
        const tilesOfInterest = unit.highlightTilesInActionRange(range, generatedBoard, unitsBoard);

        tilesOfInterest.forEach(tileOfInterest => {
            if (tileOfInterest != tile) {
                tileOfInterest.inRange = true;
                tileOfInterest.setTint(CONSTANTS.YELLOW_TINT);
            }
        });
    }

    startUnitAction(selectedToTile) {
        //start action
        const path = selectedToTile.path;
        const direction = path.direction;

        const actionUnit = {
            tileNum: this.turnUnit.tile.number,
            offense: this.turnUnit.offense,
            action: this.turnUnit.action,
            unblockable: this.turnUnit.unblockable,
            synchronous: this.turnUnit.synchronous,
            direction: direction,
            path: path
        };
        this.playerAction = CONSTANTS.MID_ACTION;

        // Get all tiles that should stay active
        let attachedTiles = [{tile: this.turnUnit.tile}, {tile: selectedToTile}];
        if (selectedToTile.attachedTiles) {
            selectedToTile.attachedTiles.forEach(attachedTile => {
                attachedTiles.push({tile: attachedTile});
            });
        }
        this.removeAllHighlights(attachedTiles);

        const recievingTiles = selectedToTile.unit ? 
            [{
                tileNum: selectedToTile.number,
                unit: true,
                currentHealth: selectedToTile.unit.currentHealth,
                defense: selectedToTile.unit.defense, 
                dodge: selectedToTile.unit.dodge, 
                block: selectedToTile.unit.block, 
                direction: selectedToTile.unit.currentDirection,
                directionOfAttack: this.generatedBoard.getAttackDirection(this.turnUnit.tile, selectedToTile)
            }] : [{
                tileNum: selectedToTile.number,
                unit: false
            }];

        if (selectedToTile.attachedTiles) {
            selectedToTile.attachedTiles.forEach(tile => {
                if (tile.unit) {
                    recievingTiles.push({
                        tileNum: tile.number,
                        unit: true,
                        currentHealth: tile.unit.currentHealth,
                        defense: tile.unit.defense, 
                        dodge: tile.unit.dodge, 
                        block: tile.unit.block, 
                        direction: tile.unit.currentDirection,
                        directionOfAttack: this.generatedBoard.getAttackDirection(this.turnUnit.tile, tile)
                    });
                } else {
                    recievingTiles.push({
                        tileNum: tile.number,
                        unit: false
                    });
                }
            })
        }

        emitter.emit(CONSTANTS.UNIT_ACTION, {
            roomID: controller.gameRoom.roomID,
            actionUnit: actionUnit,
            recievingTiles: recievingTiles,
        });
    }

    unitAction(data) {
        this.actionButtonContainer.setUsed(CONSTANTS.ACTION_BUTTON);

        // TODO: make this an array for multiple units
       
        console.log('Unit Action Confirmed');
        console.log(data);

        if (data.result && data.result.tiles) {
            data.result.tiles2 = [];
            data.result.tiles.forEach(tile => {
                data.result.tiles2.push(tile);
            });
        }

        const actionUnit = this.generatedBoard.getTile(data.actionUnit.tileNum).unit;
        if (!this.turnUnit) {
            this.turnUnit = actionUnit;
        }

        if (actionUnit.type === CONSTANTS.SWORD && data.actionUnit.path.length === 2) {
            let direction = null;
            if (data.actionUnit.path[0]) {
                direction = data.actionUnit.path[0].direction;
                actionUnit.setDirection(direction);
            }

            const moveToTile = this.generatedBoard.getTile(data.actionUnit.path[0].tileNum);
            this.tempData = data;

            console.log('FOUND IT - ADD MOVE CODE HERE');

            this.tweens.add({
                targets: actionUnit, 
                x: moveToTile.x, 
                y: moveToTile.y, 
                duration: CONSTANTS.DASH_SPEED, 
                yoyo: false, 
                repeat: 0,
                onComplete: function () { 
                    const unit = arguments[1][0];
                    const scene = unit.scene;

                    // Reset the board data
                    unit.tile.clearTint();
                    unit.tile.unit = null;

                    scene.selectedFromTile = scene.generatedBoard.getTile(scene.tempData.actionUnit.path[0].tileNum);
                    scene.selectedFromTile.unit =  unit;
                    unit.tile = scene.selectedFromTile;
                    unit.tile.setTint(CONSTANTS.BLUE_TINT);
                    scene.tempData.actionUnit.tileNum = unit.tile.number;

                    scene.unitsBoard.sort('z');
                    actionUnit.runActionSound();
                    scene.resolveAction(scene.tempData);
                }
            });
        } else {
            actionUnit.runActionSound();
            this.resolveAction(data);
        }
    }

    resolveAction(data) {
        this.tempData = null;

        console.log(data);

        const actionUnit = this.generatedBoard.getTile(data.actionUnit.tileNum).unit;
        if (!this.turnUnit) {
            this.turnUnit = actionUnit;
        }

        if (!data.actionUnit.synchronous) {
            actionUnit.runActionSound();
        }
        
        let direction = null;
        if (data.actionUnit.path[0]) {
            direction = data.actionUnit.path[0].direction;
            actionUnit.setDirection(direction);
        }
        
        if (data.result && data.result.tiles2) {
                const tile = data.result.tiles2.shift();
                const recievingTile = this.generatedBoard.getTile(tile.tileNum);
                
                if (recievingTile.unit) {
                    const recievingUnit = recievingTile.unit;

                    console.log(actionUnit);
                    console.log(recievingUnit);

                    recievingUnit.resolveAction(tile.value, tile.action, tile.turn, tile.directionOfAttack, tile.text);
                    this.updateDetailsView(recievingUnit);
                }

                if (data.result.tiles2.length > 0) {
                    if (!actionUnit.synchronous) {
                        this.time.addEvent({ delay: 1200, repeat: 0, callback: this.resolveAction, callbackScope: this, args: [data]}); 
                    } else {
                        this.resolveAction(data);
                    }
                } else {
                    this.time.addEvent({ delay: 1400, repeat: 0, callback: this.finishAction, callbackScope: this, args: [data.result.tiles]});
                }
        } else {
            this.time.addEvent({ delay: 1400, repeat: 0, callback: this.finishAction, callbackScope: this, args: [data.result.tiles]});
        }
    }

    finishAction(resultTiles) {
        console.log(this.playerAction);
        console.log('UNLOCK SCENE');
        console.log(resultTiles);
        this.playerAction = CONSTANTS.SELECTION_ACTION;
        this.selectedToTile = null;
        console.log(this.playerAction);

        let unit;
        let tile;

        resultTiles.forEach(resultTile => {

            tile = this.generatedBoard.getTile(resultTile.tileNum);
            tile.clearTint();

            unit = tile.unit;
            if (unit) {
                unit.setActive(false);

                if (resultTile.destroyed) {
                    const playerId = unit.playerId;
                    if (playerId === game.player.playerId) {
                        this.playerArmyCount -= 1;
                    } else {
                        this.opponentArmyCount -= 1;
                    }

                    tile.unit = null;
                    unit.destroy();
                }
            }
            
            // Do this while iterating over the results so the first one to die loses
            if (this.opponentArmyCount === 0) {
                this.endGame(true);
                return;
            }

            if (this.playerArmyCount === 0) {
                this.endGame(false);                            
                return;
            }
        });

        this.generatedBoard.tiles.forEach((tile) => {
            tile.attachedTiles = [];
        });
        
        this.turnUnit.tile.setTint(CONSTANTS.BLUE_TINT);
    }

    endGame(victory) {
        // Remove Interactivity
        this.generatedBoard.tiles.forEach((tile) => {
            tile.disableInteractive();
        });
        this.quitButton.sprite.disableInteractive();
        this.actionButtonContainer.removeInteractive();

        let config;
        config = {
            scene: this,
            buttonTextConfig: CONSTANTS.LIGHT_TEXT_STYLE,
            buttonEvent: CONSTANTS.ACCEPT_GAME_OVER,
        }

        emitter.on(CONSTANTS.ACCEPT_GAME_OVER, this.leaveGame);

        if (victory) {
            config.imageKey = CONSTANTS.VICTORY;
            config.soundKey = CONSTANTS.VICTORY_SOUND;
        } else {
            config.imageKey = CONSTANTS.DEFEAT;
            config.soundKey = CONSTANTS.DEFEAT_SOUND;
        }

        EndGameOverlay(config);
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
        emitter.removeListener(CONSTANTS.RUN_TUTORIAL);

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
            tile.attachedTiles = [];
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
        this.currentPlayerContainer.text = this.playerTurn === CONSTANTS.LEFT ? controller.gameRoom.player1.name + "'s Turn" : controller.gameRoom.player2.name + "'s Turn";

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