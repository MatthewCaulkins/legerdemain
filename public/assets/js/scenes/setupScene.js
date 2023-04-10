class SetupScene extends Phaser.Scene {
    constructor() {
        super({key: CONSTANTS.SETUP_SCENE}); 
    }

    preload() {
        // this.load.html(CONSTANTS.ARMY_NAME, "form.html");
    }

    create() {
        model.currentScene = this;

        // Tiles currently active
        this.boardTile = null; 
        this.selectGridTile = null;
        this.hoverTile = null;

        this.currentArmy = 0;
        this.totalArmies = 4;

        // Create arrays for the armies
        // this.armyName = [];
        this.armyOrbs = [];
        this.unitsPlaced = [];
        this.boardContainer = [];
        this.generatedBoard = [];
        this.unitsBoard = [];
        this.selectGridContainer = [];
        this.selectGrid = [];
        this.armyDeployment = [];        
        
        // Alignment grid
        this.alignmentGrid = new AlignmentGrid({rows: 11, columns: 11, scene: this});
        this.alignmentGrid.showCellIndex();

        // Add placement counter
        this.counter = this.add.text(0, 0, '0 / 10', CONSTANTS.HUD_STYLE);
        this.counter.setOrigin(.5, .5);

        this.alignmentGrid.positionItemAtIndex(12, this.counter);

        // this.createDetailsView();
        this.unitStats = new UnitStats(this);
        this.alignmentGrid.positionItemAtIndex(72, this.unitStats);

        // stores all created phaser texts
        // let createdTexts = {};
        
        // // creates a new phaser text
        // const createText = (name, i) => {
        //     let text = createdTexts[name] || this.add.text(10, 100 + 20 * i, '');
        //     createdTexts[name] = text;
        //     return text;
        // }

        // Add form input from DOM
        // TODO: Example of input box for login purposes and chat
        // this.add
        // .text(0, this.cameras.main.height / 2, 'ClickMe', { fontSize: 52 })
        // .setOrigin(0.5)
        // .setInteractive()
        // .on('pointerdown', () => {
        //     let element = document.getElementById('input-box');
        //     if (element && element.style.display === 'none') {
        //         element.style.display = 'block'

        //         for (let i = 0; i < element.children.length; i++) {
                    
        //             // it is an input element
        //             if (element.children[i].tagName === 'INPUT') {
        //                 let text = createText(element.children[i].name, i)
        //                 element.children[i].addEventListener('input', () => {
        //                     text.setText(element.children[i].value)
        //                 })
        //             }

        //             // it is the button
        //             else {
        //                 element.children[i].addEventListener('click', () => {
        //                     element.style.display = 'none'
        //                 })
        //             }
        //         }
        //     }
        // });

        this.armyNameInputBox = document.getElementById('input-box');
        //if (element && element.style.display === 'none') {
        this.armyNameInputBox.style.display = 'block'

        for (let i = 0; i < this.armyNameInputBox.children.length; i++) {
            // it is an input element
            if (this.armyNameInputBox.children[i].tagName === 'INPUT') {
                //let text = createText(element.children[i].name, i)
                this.armyNameInput = this.armyNameInputBox.children[i];
                // this.armyNameInput.addEventListener('input', () => {
                // //    text.setText(element.children[i].value)
                // })
            }
        }
        
        // this.alignmentGrid.positionItemAtIndex(96, this.armyNameInputBox);

        // this.armyNameInput = document.getElementById(CONSTANTS.ARMY_NAME);
        // this.armyNameText = this.add.text(640, 360);//.createFromCache(CONSTANTS.ARMY_NAME);
        // this.armyNameInput.addEventListener('input', () => {
        //     this.armyNameText.setText(this.armyNameInput.value);
        // });
        // this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        // this.returnKey.on(CONSTANTS.DOWN, event => {
        //     let name = this.armyNameInput.text;
        //     if(name.value != "") {
        //         this.armyName[this.currentArmy] = name.value;
        //     }
        // });




        // Spritesheets
        // Arrows
        // let config = {
        //     key: 'off',
        //     frames: this.anims.generateFrameNumbers('arrow', { start: 0, end: 0, first: 0 }),
        //     frameRate: 1,
        //     repeat: 0
        // };
        // this.anims.create(config);
        // config = {
        //     key: 'on',
        //     frames: this.anims.generateFrameNumbers('arrow', { start: 1, end: 1, first: 1 }),
        //     frameRate: 1,
        //     repeat: 0
        // };
        // this.anims.create(config);

        // Setup the alignment grid for testing purposes
        for (let army = 0; army < this.totalArmies; army ++) {
            this.currentArmy = army;

            // TODO: switch this based on if the army is saved
            this.armyOrbs[army] = new Orb(this, army);
            this.alignmentGrid.positionItemAtIndex(army + 6, this.armyOrbs[army]);

            this.unitsPlaced[army] = 0;

            // Create the container for the board and generate it
            this.boardContainer[army] = this.add.container(0, 0);
            // this.boardContainer[army].setInteractive();

            const boardConfig = {
                tileWidth: 75,
                tileHeight: 75,
                mapRows: 4,
                mapColumns: 11,
                scale: .75,
                scene: this,
                container: this.boardContainer[army],
                army: army
                // orientation: CONSTANTS.BOARD_ORIENTATION
            }

            this.generatedBoard[army] = new GenerateBoard(boardConfig);

            // Add interactivity to each of the tiles in the board container
            // this.boardContainer[army].iterate(this.addInteractionToBoardTiles);

            // Add a container for the units
            this.unitsBoard[army] = this.add.container(0, 0);

            // Player Select Units container
            this.selectGridContainer[army] = this.add.container(0, 0);
            // this.selectGridContainer[army].setInteractive();
            
            // Position the units board

            console.log(game.player);

            const selectGridConfig = {
                scene: this,
                // alignmentGrid: this.alignmentGrid,
                tileWidth: 100,
                tileHeight: 100,
                gridRows: 4,
                gridColumns: 6,
                scale: 1,
                container: this.selectGridContainer[army],
                units: game.player.units,
                player: game.player,
                army: army
            }
            this.selectGrid[army] = new SelectUnitsGrid(selectGridConfig);
            this.alignmentGrid.positionItemAtIndex(17, this.selectGridContainer[army]);

            // this.selectGridContainer[army].iterate(this.addInteractionToGridTiles);
            // const armyUnits = game.player.armies[army];

            // Army Deployment
            const armyDeploymentConfig = {
                scene: this,
                army: army,
                armyUnits: game.player.armies[army],
                selectGrid: this.selectGrid[army],
                generatedBoard: this.generatedBoard[army],
                unitsBoard: this.unitsBoard[army],
            }
            this.armyDeployment[army] = new ArmyDeployment(armyDeploymentConfig);

            // armyUnits.units.forEach(unit => {
            //     //let gridTile = null;
            //     this.selectGridTile = null;
            //     let n = 0;

            //     do {
            //         if (unit.unit === this.selectGrid[army].units[n] && this.selectGrid[army].tiles[n].unitsBoardCounterpart === null) {
            //             this.selectGridTile = this.selectGrid[army].tiles[n];
            //         }

            //         // console.log(unit)
            //         // console.log(this.selectGrid[army].units[n]);
            //         // console.log(this.selectGrid[army].tiles[n]);
            //         // console.log(n);
            //         //console.log(gridTile);
            //         n++;
            //     } while (!this.selectGridTile);

            //     this.addUnitToBoard(this.generatedBoard[army].tiles[unit.tileNum]);//, gridTile, true)
            // });

            this.selectGridTile = null;
        }


        // // Hide the other layers
        this.currentArmy = 0;
        console.log('active army' + this.currentArmy);
        this.armyOrbs[0].setActive(this.currentArmy);

        for (let i = 1; i < this.totalArmies; i++) {
            // this.unitsPlaced[i].setVisible(false);
            this.boardContainer[i].setVisible(false);
            // this.generatedBoard[i].setVisible(false);
            this.unitsBoard[i].setVisible(false);
            this.selectGridContainer[i].setVisible(false);
            this.armyOrbs[i].setActive(this.currentArmy);
            // this.selectGrid[i].setVisible(false);
        }

        // The button to get back to the home page
        this.homeButton = new Button({
            scene: this, 
            key: CONSTANTS.TILE,
            text: 'Back',
            textConfig: CONSTANTS.LIGHT_TEXT_STYLE,
            event: CONSTANTS.BACK_TO_HOME,
            alignmentGrid: this.alignmentGrid,
            index: 100
        });
        emitter.once(CONSTANTS.BACK_TO_HOME, this.loadHomeScene);

        // The button to get Save out the army
        this.acceptButton = new Button({
            scene: this, 
            key: 'tile',
            text: 'Accept',
            textConfig: CONSTANTS.LIGHT_TEXT_STYLE,
            event: CONSTANTS.ACCEPT_BOARD_PLACEMENT,
            alignmentGrid: this.alignmentGrid,
            index: 101
        });
        emitter.on(CONSTANTS.ACCEPT_BOARD_PLACEMENT, this.acceptBoardPlacement.bind(this));

        // The button to delete army
        this.clearButton = new Button({
            scene: this, 
            key: 'tile',
            text: 'Clear',
            textConfig: CONSTANTS.LIGHT_TEXT_STYLE,
            event: CONSTANTS.CLEAR_ARMY,
            alignmentGrid: this.alignmentGrid,
            index: 102
        });
        emitter.on(CONSTANTS.CLEAR_ARMY, this.clearArmy.bind(this));

        // Add Save Notice
        this.noticeText = this.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
        this.noticeText.setOrigin(.5, .5);
        this.noticeText.setVisible(false);

        this.alignmentGrid.positionItemAtIndex(60, this.noticeText);

        // Setup notice events
        emitter.on(CONSTANTS.ARMY_SAVED_NOTICE, () => {
            this.noticeText.text = CONSTANTS.ARMY_SAVED_NOTICE_TEXT;
            this.noticeText.setVisible(true);

            this.time.addEvent({delay: 2000, callback: this.hidenoticeText, callbackScope: this, loop: false});
        });
        emitter.on(CONSTANTS.ARMY_DELETED_NOTICE, () => {
            this.noticeText.text = CONSTANTS.ARMY_DELETED_NOTICE_TEXT;
            this.noticeText.setVisible(true);

            this.time.addEvent({delay: 2000, callback: this.hidenoticeText, callbackScope: this, loop: false});
        });
        emitter.on(CONSTANTS.NEED_UNITS_NOTICE, () => {
            this.noticeText.text = CONSTANTS.NEED_UNITS_NOTICE_TEXT;
            this.noticeText.setVisible(true);

            this.time.addEvent({delay: 2000, callback: this.hidenoticeText, callbackScope: this, loop: false});
        });
        emitter.on(CONSTANTS.NEED_NAME_NOTICE, () => {
            this.noticeText.text = CONSTANTS.NEED_NAME_NOTICE_TEXT;
            this.noticeText.setVisible(true);

            this.time.addEvent({delay: 2000, callback: this.hidenoticeText, callbackScope: this, loop: false});
        });

        // Shift army logic
        // this.leftArrow.setInteractive();
        // this.leftArrow.on(CONSTANTS.POINTER_OVER, () => {
        //     this.leftArrow.play('on');
        // });
        // this.leftArrow.on(CONSTANTS.POINTER_OUT, () => {
        //     this.leftArrow.play('off');
        // });
        // this.leftArrow.on(CONSTANTS.POINTER_DOWN, this.shiftArmyLeft);

        // this.rightArrow.setInteractive();
        // this.rightArrow.on(CONSTANTS.POINTER_OVER, () => {
        //     this.rightArrow.play('on');
        // });
        // this.rightArrow.on(CONSTANTS.POINTER_OUT, () => {
        //     this.rightArrow.play('off');
        // });
        // this.rightArrow.on(CONSTANTS.POINTER_DOWN, this.shiftArmyRight);

        // Add the details view

        // Add army selection arrows
       // this.armyOrbs[this.currentArmy].play('active');
        
        this.leftArrow = new ScrollArrow(this, 'left');
        this.rightArrow = new ScrollArrow(this, 'right');

        this.alignmentGrid.positionItemAtIndex(38, this.leftArrow);
        this.alignmentGrid.positionItemAtIndex(43, this.rightArrow);
    }

        
    update() {
        // This will let me iterate over all items inside this container
        // this.boardContainer.iterate(this.rollTile);
        // if (this.hoverTile) {
        //     updateDetailsView(this.hoverTile.unit);
        // } else if (this.selectGridTile) {
        //     updateDetailsView(this.selectGridTile.unit);
        // } else {
        //     this.hideStats();
        // }
    }

    shiftArmy() {
        console.log('Shift army' + this.armyName);
        for (let i = 0; i < this.totalArmies; i++) {
            this.boardContainer[i].setVisible(false);
            // this.generatedBoard[i].setVisible = false;
            this.unitsBoard[i].setVisible(false);
            this.selectGridContainer[i].setVisible(false);
            // this.selectGrid[i].setVisible = false;

            this.armyOrbs[i].setActive(this.currentArmy);
        }


        this.boardContainer[this.currentArmy].setVisible(true);
        // this.generatedBoard[this.currentArmy].setVisible = true;
        this.unitsBoard[this.currentArmy].setVisible(true);
        this.selectGridContainer[this.currentArmy].setVisible(true);
        // this.selectGrid[this.currentArmy].setVisible = true;

        // release scene tiles
        if (this.boardTile) {
            if (this.boardTile.unit) {
                this.boardTile.unit.y += 3;
                this.boardTile.unit.alpha = 1;
            }
            this.boardTile.clearTint();
            this.boardTile = null; 
        }
        if (this.selectGridTile) {
            if (this.selectGridTile.unitsBoardCounterpart) {
                this.selectGridTile.setTint(CONSTANTS.ORANGE_TINT);
            } else {
                this.selectGridTile.unit.alpha = 1;
                this.selectGridTile.clearTint();
            }
            this.selectGridTile = null;
        }

        // Update UI
        this.armyNameInput.value = game.player.armies[this.currentArmy] ? game.player.armies[this.currentArmy].name : '';
        this.updateCounter();
    }

    hidenoticeText() {
        this.noticeText.setVisible(false);
    }

    acceptBoardPlacement() {
        const unitPlacements = [];

        console.log(this);

        for (let i = 0; i < this.generatedBoard[this.currentArmy].mapRows; i++) {
            for (let j = 0; j < this.generatedBoard[this.currentArmy].mapColumns; j++) {
                const tile = this.generatedBoard[this.currentArmy].board[i][j];

                if (tile.unit) {
                    unitPlacements.push({
                        unit: tile.unit.type,
                        tileNum: tile.number
                    });
                }

            }
        }

        if (unitPlacements.length === 0) {
            console.log('0units');
            emitter.emit(CONSTANTS.NEED_UNITS_NOTICE);
            return;
        }  

        if (this.armyNameInput.value === '') {
            console.log('noname');
            emitter.emit(CONSTANTS.NEED_NAME_NOTICE);
            return;
        }
        
        const data = {
            units: unitPlacements,
            name: this.armyNameInput.value,
            playerId: this.game.player.playerId,
            armyId: this.currentArmy
        }

        // Save the board placements to the database
        emitter.emit(CONSTANTS.SAVE_ARMY, data);
    }

    clearArmy() {
        // TODO: make this clear the board and remove from game.players data
        console.log('clear army hit');
        this.armyDeployment[this.currentArmy].clearGameBoard();

        const data = {
            playerId: this.game.player.playerId,
            armyId: this.currentArmy
        };
        emitter.emit(CONSTANTS.DELETE_ARMY, data);

        this.unitsPlaced[this.currentArmy] = 0;
        this.updateCounter();
    }

    loadHomeScene() {
        let element = document.getElementById('input-box');
        if (element && element.style.display === 'block') {
            element.style.display = 'none';
        }

        game.scene.start(CONSTANTS.HOME_SCENE);
        game.scene.stop(CONSTANTS.SETUP_SCENE);
    }

    // Grid Tile Interaction
    // addInteractionToGridTiles(tile) {
    //     tile.on(CONSTANTS.POINTER_OVER, tile.scene.gridPointerover.bind(tile));
    //     tile.on(CONSTANTS.POINTER_OUT, tile.scene.gridPointerout.bind(tile));
    //     tile.on(CONSTANTS.POINTER_DOWN, tile.scene.gridPointerdown.bind(tile));
    // }

    // gridPointerover() {
    //     if (!this.scene.selectGridTile) { // Is a previously activated tile
    //         if (this.unitsBoardCounterpart) {
    //             this.setTint(CONSTANTS.GREEN_TINT);
    //             this.unitsBoardCounterpart.setTint(CONSTANTS.GREEN_TINT);
    //         } else { // non-active tile
    //             if (this.scene.unitsPlaced[this.scene.currentArmy] < 10) {
    //                 this.setTint(CONSTANTS.GREEN_TINT);
    //                 this.unit.alpha = .5;
    //             }
    //         }
    //     } else {
    //         if (this.scene.selectGridTile == this) {
    //             // this is the actively selected tile
    //             this.setTint(CONSTANTS.RED_TINT);
    //         } else {
    //             if (this.unitsBoardCounterpart) {
    //                 this.setTint(CONSTANTS.GREEN_TINT);
    //                 this.unitsBoardCounterpart.setTint(CONSTANTS.GREEN_TINT);
    //             } else { 
    //                 this.setTint(CONSTANTS.GREEN_TINT);
    //                 this.unit.alpha = .5;
    //             }
    //         }
    //     }
    // }

    // gridPointerout() {
    //     if (!this.scene.selectGridTile) {
    //         if (!this.unitsBoardCounterpart) {
    //             this.clearTint();
    //             this.unit.alpha = 1;
    //         } else {
    //             if (this.unitsBoardCounterpart) {
    //                 this.setTint(CONSTANTS.ORANGE_TINT);
    //                 this.unitsBoardCounterpart.clearTint();
    //             }
    //         }
    //     } else { // Someone is selected
    //         if (!this.unitsBoardCounterpart) {  // Doesn't have a selected board tile
    //             if (this.scene.selectGridTile === this) {  // Is this tile
    //                 this.setTint(CONSTANTS.GREEN_TINT);
    //             } else {    // Is another blank tile
    //                 this.clearTint()
    //                 this.unit.alpha = 1;
    //             }
    //         } else {  // Has board tile counterpart
    //             if (this.scene.selectGridTile === this) {  // Is this tile
    //                 this.setTint(CONSTANTS.RED_TINT);
    //             } else {  // Is another tile with counterpart
    //                 this.setTint(CONSTANTS.ORANGE_TINT);
    //                 this.unitsBoardCounterpart.clearTint();
    //             }
    //         }
    //     }
    // }

    // gridPointerdown() {
    //     if (!this.scene.selectGridTile) {  // If no grid selected
    //         if (this.scene.unitsPlaced[this.scene.currentArmy] < 10) { // If units less than 10
    //             if (this.unitsBoardCounterpart) {
    //                 this.setTint(CONSTANTS.RED_TINT);
    //                 this.unitsBoardCounterpart.setTint(CONSTANTS.RED_TINT);
    //                 //this.scene.boardTileSelected = true; 
    //                 this.scene.boardTile = this.unitsBoardCounterpart;
    //                 this.scene.selectGridTile = this;
    //                 this.unitsBoardCounterpart.unit.y -= 3;
    //                 this.unitsBoardCounterpart.unit.alpha = .5;

    //                 this.scene.updateDetailsView(this.unit);
    //             } else {
    //                 this.scene.selectGridTile = this;
    //                 this.setTint(CONSTANTS.RED_TINT);

    //                 this.scene.updateDetailsView(this.unit);
    //             }
    //         } else {
    //             if (this.unitsBoardCounterpart) {
    //                 this.setTint(CONSTANTS.RED_TINT);
    //                 this.unitsBoardCounterpart.setTint(CONSTANTS.RED_TINT);
    //                 this.unitsBoardCounterpart.unit.y -= 3;
    //                 this.unitsBoardCounterpart.unit.alpha = .5;

    //                 //this.scene.boardTileSelected = true;
    //                 this.scene.boardTile = this.unitsBoardCounterpart;
    //                 this.scene.selectGridTile = this;
                    
    //                 this.scene.updateDetailsView(this.unit);
    //             }
    //         }
    //     } else { // There is a grid tile selected
    //         if (this.scene.selectGridTile != this) { // Another tile was selected, switch to this one
    //             if (this.scene.boardTile) { // If the other tile has someone on the board
    //                 this.scene.selectGridTile.setTint(CONSTANTS.ORANGE_TINT);
    //                 this.scene.updateDetailsView(this.unit);
    //                 this.scene.boardTile.unit.alpha = 1;
    //                 this.scene.boardTile.unit.y += 3;
    //                 this.scene.boardTile.clearTint();
    //             } else { // If not
    //                 this.scene.selectGridTile.unit.alpha = 1;
    //                 this.scene.selectGridTile.clearTint();

    //                 this.scene.selectGridTile = this;
    //                 this.scene.updateDetailsView(this.unit);

    //                 this.unit.alpha = .5;
    //             }

    //             this.scene.boardTile = null;
    //             this.scene.selectGridTile = this;
    //             this.setTint(CONSTANTS.RED_TINT);

    //             if (this.unitsBoardCounterpart) { // If this one has a corresponding tile
    //                 this.scene.boardTile = this.unitsBoardCounterpart;
    //                 this.scene.boardTile.setTint(CONSTANTS.RED_TINT);
    //                 this.scene.boardTile.unit.y -= 3;
    //                 this.scene.boardTile.unit.alpha = .5;    
                    

    //                 this.scene.updateDetailsView(this.unit);
    //             } else { // If not

    //                 this.scene.updateDetailsView(this.unit);
    //             }
               
               
    //         } else { // Is this tile
    //             if (this.unitsBoardCounterpart) {    // if it has a counterpart - activate it and it's counterpart, release this
                    

    //                 this.unitsBoardCounterpart.unit.destroy();
    //                 this.unitsBoardCounterpart.unit = null;
    //                 this.unitsBoardCounterpart.selectGridCounterpart = null;
    //                 this.unitsBoardCounterpart.clearTint();
                    
    //                 this.setTint(CONSTANTS.GREEN_TINT);
    //                 this.scene.boardTile = null;
    //                 this.scene.selectGridTile = null;
    //                 this.unitsBoardCounterpart = null;
    //                 this.scene.boardTile = null;
    //                 this.scene.selectGridTile = null;

    //                 // this.scene.unitsPlaced[this.scene.currentArmy] --;
    //                 this.scene.updateCounter();
    //                 this.scene.updateDetailsView(this.unit);
    //             //    this.boardTileSelected = false;
    //             } else {    // if it doesn't - activate it, release this
    //                 //this.unit.alpha = 1;
    //                 this.setTint(CONSTANTS.GREEN_TINT);
    //                 this.scene.boardTile = null;
    //                 this.scene.selectGridTile = null;
                    
    //                 this.scene.updateDetailsView(this.unit);
    //             }
    //         }
            
    //     }
    // }


    // Board Tile Interaction
    // addInteractionToBoardTiles(tile) {
    //     tile.on(CONSTANTS.POINTER_OVER, tile.scene.boardPointerover.bind(tile));
    //     tile.on(CONSTANTS.POINTER_OUT, tile.scene.boardPointerout.bind(tile));
    //     tile.on(CONSTANTS.POINTER_DOWN, tile.scene.boardPointerdown.bind(tile));
    // }

    // rollTile(tile) {
    //     const rotation = tile.rotation;
    //     tile.setRotation(rotation + .01);
    // }

    // boardPointerover() {
    //     if (this.scene.selectGridTile || this.scene.unitsPlaced[this.scene.currentArmy] > 0) {
            
    //         if (this.unit) { // If there is a unit on this tile
    //             // If it is there is no selected unit or it isn't on this tile
    //             if (!this.scene.boardTile) {//Selected === false) {// || this.scene.boardTile != this) {
    //                 this.setTint(CONSTANTS.GREEN_TINT);
    //             } else {
    //                 if (this.scene.boardTile != this) {
    //                     this.setTint(CONSTANTS.GREEN_TINT);
    //                     this.selectGridCounterpart.setTint(CONSTANTS.GREEN_TINT);
    //                 } else {
    //                     this.setTint(CONSTANTS.RED_TINT);
    //                 }
    //             }
    //         } else {
    //             if (!this.scene.boardTile) {
    //                 if (this.scene.selectGridTile) {
    //                     this.setTint(CONSTANTS.GREEN_TINT);
    //                 } else {

    //                 }
    //             } else {
    //                 this.setTint(CONSTANTS.ORANGE_TINT);
    //             }
    //         }
    //     }
    //     // this.y -= 3;
    // } 

    // boardPointerout() {
    //     if (this.scene.selectGridTile || this.scene.unitsPlaced[this.scene.currentArmy] > 0) {
    //         if (this != this.scene.boardTile) {
    //             this.clearTint();
    //             if (this.selectGridCounterpart) {
    //                 this.selectGridCounterpart.setTint(CONSTANTS.ORANGE_TINT);
    //             }
    //         } else {
    //             this.setTint(CONSTANTS.RED_TINT);
    //             // leave tint until they choose another tile
    //         }
    //     }
    //     // TODO: MOVE THIS TO PLAY SCENE
    //     // if (this.unit) {
    //     //     this.unit.healthBar.container.setVisible(false);
    //     //     this.unit.healthBar.bar.setVisible(false);
    //     // }
    //     // this.y += 3;
    // }

    // boardPointerdown() {

    //     // If there is no unit on this tile
    //     if (this.scene.selectGridTile || this.scene.unitsPlaced[this.scene.currentArmy] > 0) {
    //         if (!this.unit) { 
    //             // If there is no unit selected - add the selected unit to this tile
    //             if (!this.scene.boardTile) {// Selected === false) {
    //                 if (this.scene.selectGridTile) {
    //                     console.log('Add unit');
    //                     // Try to get this automatically set somewhere
    //                     this.scene.addUnitToBoard(this);
    //                     this.setTint(CONSTANTS.GREEN_TINT);
    //                     this.scene.updateDetailsView(this.unit);
    //                 }
    //             } else { // switch the unit to here
                    
    //                 this.unit = this.scene.boardTile.unit;
    //                 this.unit.x = this.x;
    //                 this.unit.y = this.y;
    //                 this.unit.alpha = 1;
    //                 this.unit.tile = this;

    //                 // Switch the grid connection
    //                 this.selectGridCounterpart = this.scene.boardTile.selectGridCounterpart;
    //                 this.scene.selectGridTile.unitsBoardCounterpart = this;
    //                 this.selectGridCounterpart.setTint(CONSTANTS.ORANGE_TINT);
    //                 this.scene.boardTile.selectGridCounterpart = null;
    //                 this.scene.selectGridTile = null;

    //                 // Clear and set the new tints
    //                 this.scene.boardTile.unit = null;
    //                 this.scene.boardTile.clearTint();

    //                 this.setTint(CONSTANTS.GREEN_TINT);
    //                 this.scene.boardTile = null;
    //                 //this.scene.boardTileSelected = false;
    //             }
    //         } else { // If there is a unit on this tile
    //             if (this === this.scene.boardTile) { // If this tile has a unit and it is the linked to the selectGrid, remove it
    //                     this.scene.boardTile = null;
    //                     this.clearTint();


    //                     // this.scene.unitsBoard.remove(this.unit);
    //                     this.unit.destroy();
    //                     this.unit = null;

    //                     // clear links 
    //                     this.selectGridCounterpart.unit.alpha = 1;
    //                     this.selectGridCounterpart.clearTint();
    //                     this.selectGridCounterpart.unitsBoardCounterpart = null;
    //                     this.selectGridCounterpart = null;
    //                     this.scene.selectGridTile = null;

    //                     this.scene.unitsPlaced[this.scene.currentArmy] --;
    //                     this.scene.updateCounter();
    //                 // }
    //             } else { // If this tile has a unit and it's not connected to the selectGrid unit
    //                 // If there is no selected tile to move from - set this unit to the selected unit
    //                 if (this.scene.boardTile === null) {
    //                     if (this.scene.selectGridTile != this.selectGridCounterpart) {
    //                         if (this.scene.selectGridTile === null) {
    //                             //this.scene.boardT
    //                             //this.scene.boardTileSelected = true;
    //                             this.scene.boardTile = this;

    //                             this.unit.y -= 3;
    //                             this.unit.alpha = .5;

    //                             this.setTint(CONSTANTS.RED_TINT);

    //                             this.selectGridCounterpart.setTint(CONSTANTS.RED_TINT);
    //                             this.scene.selectGridTile = this.selectGridCounterpart;
    //                             this.scene.updateDetailsView(this.unit);
    //                         } else {
    //                             if (this.scene.selectGridTile.unitsBoardCounterpart != this) {
    //                                 this.setTint(CONSTANTS.GREEN_TINT);

    //                                 this.selectGridCounterpart.unit.alpha = 1;
    //                                 this.selectGridCounterpart.clearTint();
    //                                 this.selectGridCounterpart.unitsBoardCounterpart = null;

    //                                 this.unit.destroy();

    //                                 this.scene.selectGridTile.unitsBoardCounterpart = this;
    //                                 this.scene.addUnitToBoard(this, this.selectGridTile, false);

    //                                 // this.scene.unitsPlaced[this.scene.currentArmy] --;
    //                                 // this.scene.updateCounter();
    //                             } 
    //                         }
    //                         // Highlight all tiles within unit's range
    //                         // this.scene.highlightTilesInRange(this);
    //                     } 
                     
    //                 } else { // If this is the another unit - swap them 
    //                     this.scene.boardTile.clearTint();
    //                     this.scene.boardTile.unit.y += 3;
    //                     this.scene.boardTile.unit.alpha = 1; 

    //                     const tempTile = this.scene.boardTile;
    //                     const tempUnit = tempTile.unit;

    //                     this.scene.boardTile.unit = this.unit;
    //                     this.scene.boardTile.unit.x = this.scene.boardTile.x;
    //                     this.scene.boardTile.unit.y = this.scene.boardTile.y;

    //                     this.selectGridCounterpart.setTint(CONSTANTS.ORANGE_TINT);
    //                     this.unit = tempUnit;
    //                     this.unit.x = this.x;
    //                     this.unit.y = this.y;

    //                     // Switch the grid board connections
    //                     const tempGridTile = this.scene.boardTile.selectGridCounterpart;
    //                     this.scene.boardTile.selectGridCounterpart = this.selectGridCounterpart;
    //                     this.selectGridCounterpart.unitsBoardCounterpart = this.scene.boardTile;

    //                     this.selectGridCounterpart = tempGridTile;
    //                     tempGridTile.unitsBoardCounterpart = this;
    //                     this.scene.selectGridTile.setTint(CONSTANTS.ORANGE_TINT);
    //                     this.scene.selectGridTile = null;


    //                     this.setTint(CONSTANTS.GREEN_TINT);
    //                     this.scene.boardTile = null;
    //                 }
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

    updateCounter() {
        this.counter.text = `${this.unitsPlaced[this.currentArmy]} / 10`;
    }

    // createDetailsView() {
    //     this.type = this.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
    //     this.alignmentGrid.positionItemAtIndex(80, this.type);

    //     this.description = this.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
    //     this.alignmentGrid.positionItemAtIndex(91, this.description);

    //     this.health = this.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
    //     this.alignmentGrid.positionItemAtIndex(102, this.health);
        
    //     this.offense = this.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
    //     this.alignmentGrid.positionItemAtIndex(103, this.offense);
        
    //     this.defense = this.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
    //     this.alignmentGrid.positionItemAtIndex(104, this.defense);

    //     this.range = this.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
    //     this.alignmentGrid.positionItemAtIndex(105, this.range);
        
    //     this.movement = this.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
    //     this.alignmentGrid.positionItemAtIndex(113, this.movement);
        
    //     this.dodge = this.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
    //     this.alignmentGrid.positionItemAtIndex(114, this.dodge);

    //     this.block = this.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
    //     this.alignmentGrid.positionItemAtIndex(115, this.block);

    //     this.cooldown = this.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
    //     this.alignmentGrid.positionItemAtIndex(116, this.cooldown);
        
    //     this.stats = [
    //         this.type, this.description, this.health, this.defense, this.offense,
    //         this.range, this.movement, this.dodge, this.block, this.cooldown
    //     ];
    // }

    updateDetailsView(unit) {
        this.unitStats.updateStats(unit);
        // if (unit) {
        //     this.type.text = `${unit.type}`;
        //     this.description.text = `${unit.description}`;
        //     this.health.text = `${CONSTANTS.HEALTH}: ${unit.health}`;
        //     this.defense.text = `${CONSTANTS.DEFENSE}: ${100 * unit.defense}%`;
        //     this.offense.text = `${CONSTANTS.OFFENSE}: ${unit.offense}`;
        //     this.range.text = `${CONSTANTS.RANGE}: ${unit.range}`;
        //     this.movement.text = `${CONSTANTS.MOVEMENT}: ${unit.movement}`;
        //     this.dodge.text = `${CONSTANTS.DODGE}: ${100 * unit.dodge}%`;
        //     this.block.text = `${CONSTANTS.BLOCK}: ${100 * unit.block}%`;
        //     this.cooldown.text = `${CONSTANTS.COOLDOWN}: ${unit.cooldown} [+1 after move and attack]`;

        //     this.stats.forEach(stat => {
        //         stat.setVisible(true);
        //     })
        // }
    }

    hideStats() {
        this.unitStats.hideStats();
        // if (this.stats) {
        //     this.stats.forEach(stat => {
        //         stat.setVisible(false);
        //     });
        // }
    }

    // // Set the highlight to all tiles in range
    // highlightTilesInRange(tile) {
    //     // Get the range
    //     const unit = tile.unit;
    //     const movement = unit.movement;
    //     const generatedBoard = tile.scene.generatedBoard;
    //     // const scene = tile.scene;
    //     // const number = tile.number;
    //     let questionedTile;

    //     tile.path = [];

    //     const tilesOfInterest = [tile];

    //     console.log(generatedBoard);
    //     for (let i = 0; i < movement; i++) {
    //         tilesOfInterest.forEach(tileOfInterest => {

    //             // console.log(tileOfInterest);

    //             console.log(`Column ${tileOfInterest.column}  Row ${tileOfInterest.row}`)
    //             if (tileOfInterest.column - 1 >= 0) {
    //                 questionedTile = generatedBoard.board[tileOfInterest.row][tileOfInterest.column - 1];

    //                 // console.log(questionedTile);

    //                 // Will have to take into account friendly units in the Play Scene
    //                 if (questionedTile.unit === null) {
    //                     if (!tilesOfInterest.includes(questionedTile)) {
    //                         questionedTile.path = tileOfInterest.path;
    //                         questionedTile.path.push('up');
    //                         tilesOfInterest.push(questionedTile);
    //                     }
    //                 }
    //             }
                
    //             if (tileOfInterest.row + 1 < generatedBoard.mapRows) {
    //                 questionedTile = generatedBoard.board[tileOfInterest.row + 1][tileOfInterest.column]
    //                 if (questionedTile.unit === null) {
    //                     if (!tilesOfInterest.includes(questionedTile)) {
    //                         questionedTile.path = tileOfInterest.path;
    //                         questionedTile.path.push('right');
    //                         tilesOfInterest.push(questionedTile);
    //                     }
    //                 }
    //             }

    //             if (tileOfInterest.column + 1 < generatedBoard.mapColumns) {
    //                 questionedTile = generatedBoard.board[tileOfInterest.row][tileOfInterest.column + 1]
    //                 if (questionedTile.unit === null) {
    //                     if (!tilesOfInterest.includes(questionedTile)) {
    //                         questionedTile.path = tileOfInterest.path;
    //                         questionedTile.path.push('down');
    //                         tilesOfInterest.push(questionedTile);
    //                     }
    //                 }
    //             }
                
    //             if (tileOfInterest.row - 1 >= 0) {
    //                 questionedTile = generatedBoard.board[tileOfInterest.row - 1][tileOfInterest.column]
    //                 if (questionedTile.unit === null) {
    //                     if (!tilesOfInterest.includes(questionedTile)) {
    //                         questionedTile.path = tileOfInterest.path;
    //                         questionedTile.path.push('left');
    //                         tilesOfInterest.push(questionedTile);
    //                     }
    //                 }
    //             }
    //         });
    //     }

    //     tilesOfInterest.forEach(tileOfInterest => {
    //         if (tileOfInterest != tile) {
    //             tileOfInterest.setTint(CONSTANTS.YELLOW_TINT);
    //         }
    //     });

    //     // for (let i = 0; i < scene.boardContainer.mapRows; i++) {
    //     //     for (let j = 0; j < scene.boardContainer.mapColumns; j++) {
    //     //         const boardTile = scene.boardContainer.board[j][i];

    //     //         if (number - range < boardTile.number < number + range) {
    //     //             boardTile.inRange = true;
    //     //             boardTile.setTint(CONSTANTS.YELLOW_TINT);
    //     //         }
    //     //     }
    //     // }
    // }

    // // Iterate over all tiles and remove the tint
    // removeAllHighlights(tile) {
    //     const scene = tile.scene;
    //     const boardContainer = scene.boardContainer;

    //     for (let i = 0; i < boardContainer.rows; i++) {
    //         for (let j = 0; j < boardContainer.columns; j++) {
    //             boardContainer[i][j].clearTint();
    //         }
    //     }
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