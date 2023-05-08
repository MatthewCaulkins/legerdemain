class SetupScene extends Phaser.Scene {
    constructor() {
        super({key: CONSTANTS.SETUP_SCENE}); 
    }

    preload() {
        // this.load.html(CONSTANTS.ARMY_NAME, "form.html");
    }

    create() {
        model.currentScene = this;

        this.background = this.add.image(0, 0, CONSTANTS.SETUP_SCREEN_BACKGROUND);
        this.background.setOrigin(0, 0);

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
        // this.alignmentGrid.showCellIndex();

        
        // The button to get back to the home page
        this.homeButton = new Button({
            scene: this, 
            texture: CONSTANTS.BACK_BUTTON,
            event: CONSTANTS.BACK_TO_HOME,
            alignmentGrid: this.alignmentGrid,
            defaultKey: CONSTANTS.BACK_BUTTON_DEFAULT,
            hoverKey: CONSTANTS.BACK_BUTTON_HOVER,
            downKey: CONSTANTS.BACK_BUTTON_DOWN,
            index: 12
        });
        emitter.once(CONSTANTS.BACK_TO_HOME, this.loadHomeScene, this);

        // The button to get Save out the army
        this.saveButton = new Button({
            scene: this, 
            texture: CONSTANTS.SAVE_ARMY_BUTTON,
            event: CONSTANTS.ACCEPT_BOARD_PLACEMENT,
            alignmentGrid: this.alignmentGrid,
            defaultKey: CONSTANTS.SAVE_ARMY_BUTTON_DEFAULT,
            hoverKey: CONSTANTS.SAVE_ARMY_BUTTON_HOVER,
            downKey: CONSTANTS.SAVE_ARMY_BUTTON_DOWN,
            index: 100
        });
        emitter.on(CONSTANTS.ACCEPT_BOARD_PLACEMENT, this.acceptBoardPlacement, this);
        
        // The button to delete army
        this.clearButton = new Button({
            scene: this, 
            texture: CONSTANTS.CLEAR_ARMY_BUTTON,
            event: CONSTANTS.CLEAR_ARMY,
            alignmentGrid: this.alignmentGrid,
            defaultKey: CONSTANTS.CLEAR_ARMY_BUTTON_DEFAULT,
            hoverKey: CONSTANTS.CLEAR_ARMY_BUTTON_HOVER,
            downKey: CONSTANTS.CLEAR_ARMY_BUTTON_DOWN,
            index: 101
        });
        emitter.on(CONSTANTS.CLEAR_ARMY, this.clearArmy, this);
        
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

        // Add placement counter
        this.counter = this.add.text(0, 0, 'Army Size: 0 / 10', CONSTANTS.HUD_STYLE);
        // this.counter.setOrigin(.5, .5);

        this.alignmentGrid.positionItemAtIndex(79, this.counter);

        // this.createDetailsView();
        this.unitStats = new UnitStats({scene: this, textStyle: CONSTANTS.HUD_STYLE_DARK});
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
        this.armyNameInputBox.style.display = 'block';
        this.armyNameInput = document.getElementById('armyName');

        // for (let i = 0; i < this.armyNameInputBox.children.length; i++) {
        //     // it is an input element
        //     if (this.armyNameInputBox.children[i].tagName === 'INPUT') {
        //         //let text = createText(element.children[i].name, i)
        //         this.armyNameInput = this.armyNameInputBox.children[i];
        //         // this.armyNameInput.addEventListener('input', () => {
        //         // //    text.setText(element.children[i].value)
        //         // })
        //     }
        // }
        
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

            console.log(game.player.armies)
            const armyUnits = game.player.armies.find(playerArmy => {
                console.log(playerArmy);
                console.log(army);
                if (playerArmy) {
                    return playerArmy.armyId === army;
                }
            });
            console.log(armyUnits);
            
            // Army Deployment
            const armyDeploymentConfig = {
                scene: this,
                army: army,
                armyUnits: armyUnits,
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

        const selectedArmy = game.player.armies.find(army => {
            if (army) {
                return army.armyId === this.currentArmy;
            }
        });
        this.armyNameInput.value = selectedArmy ? selectedArmy.name : '';

        for (let i = 1; i < this.totalArmies; i++) {
            // this.unitsPlaced[i].setVisible(false);
            this.boardContainer[i].setVisible(false);
            // this.generatedBoard[i].setVisible(false);
            this.unitsBoard[i].setVisible(false);
            this.selectGridContainer[i].setVisible(false);
            this.armyOrbs[i].setActive(this.currentArmy);
            // this.selectGrid[i].setVisible(false);
        }


        // Add Notice
        this.addNoticeElement();
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

        if (Object.values(game.player.tutorials).indexOf('setup') === -1) {
            this.runTutorial();
        }
        // this.bringToTop(this.background);
        // this.saveButton.bringToTop();
        // this.clearButton.bringToTop();
        // this.counter.bringToTop();
        // this.unitStats.bringToTop();
        
        this.border = this.add.image(0, 0, CONSTANTS.SETUP_SCREEN_BORDER);
        this.border.setOrigin(0, 0);
    }

        
    runTutorial() {
        this.darkenInput(this);
        this.lockInput(true);
        const underlyingInteractives = [
            this.leftArrow,
            this.rightArrow,
            this.homeButton.sprite,
            this.saveButton.sprite,
            this.clearButton.sprite,
            this.tutorialButton.sprite
        ];

        console.log(this);
        console.log(this.selectGrid);

        this.selectGrid[0].tiles.forEach(tile => {
            underlyingInteractives.push(tile);
        });

        this.generatedBoard[0].tiles.forEach(tile => {
            underlyingInteractives.push(tile);
        });

        this.tutorialOverlay = new TutorialOverlay({
            scene: this,
            underlyingInteractives: underlyingInteractives,
            screens: [
                {
                    text: 'This is the army management screen, here you can predefine unit layouts to use in matches.',
                    imageKey: '',
                    imageIndex: 0,
                }, {
                    text: 'Select a unit from the unit selection grid and its stats will appear in the lower right.',
                    imageKey: '',
                    imageIndex: 17,
                }, {
                    text: 'With a unit selected you can place it on the deployment board.  You can swap, move, and remove units by interacting with the board and grid.',
                    imageKey: '',
                    imageIndex: 0,
                }, {
                    text: 'You can customize your 4 armies as much and as often as you like.  You will be given a starting army that will reset if you delete all of your others.',
                    imageKey: '',
                    imageIndex: 0,
                    callback: this.darkenInput
                }, {
                    text: 'An army needs at least one unit.  When you are satisfied, name and save your army for later battles.',
                    imageKey: '',
                    imageIndex: 0,
                    callback: this.lightenInput
                } 
            ],
            textConfig: CONSTANTS.TUTORIAL_TEXT_STYLE,
            buttonTextConfig: CONSTANTS.LIGHT_TEXT_STYLE,
            alignmentGrid: this.alignmentGrid,
            endEvent: CONSTANTS.TOGGLE_INPUT
        });

        emitter.on(CONSTANTS.TOGGLE_INPUT, (scene) => {
            emitter.emit(CONSTANTS.SETUP_TUTORIAL_RUN);
            scene.lockInput(false);
        });
    }

    darkenInput(scene) {
        scene.armyNameInputBox.style.backgroundColor = 'rgba(90, 90, 90, 0.75)';
        scene.armyNameInput.style.backgroundColor = 'rgba(90, 90, 90, .75)';
    }

    lightenInput(scene) {
        scene.armyNameInputBox.style.backgroundColor = 'rgba(236, 238, 238, 1)';
        scene.armyNameInput.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    }

    lockInput(lock) {
        if (lock === false) {
            emitter.removeListener(CONSTANTS.TOGGLE_INPUT);
        }
        this.armyNameInput.readOnly = lock;
        this.armyNameInput.disabled = lock;
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

    addNoticeElement() {
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
    }

    shiftArmy() {
        console.log('Shift army' + this.armyName + ' current army: ' + this.currentArmy);
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
        const selectedArmy = game.player.armies.find(army => {
            if (army) {
                return army.armyId === this.currentArmy;
            }
        });
        this.armyNameInput.value = selectedArmy ? selectedArmy.name : '';
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

        this.armyNameInput.value = '';
    }

    loadHomeScene() {
        emitter.emit(CONSTANTS.CHECK_DEFAULT_ARMY);
        
        emitter.removeListener(CONSTANTS.NEED_NAME_NOTICE);
        emitter.removeListener(CONSTANTS.NEED_UNITS_NOTICE);
        emitter.removeListener(CONSTANTS.ARMY_DELETED_NOTICE);
        emitter.removeListener(CONSTANTS.ARMY_SAVED_NOTICE);
        emitter.removeListener(CONSTANTS.CLEAR_ARMY);
        emitter.removeListener(CONSTANTS.ACCEPT_BOARD_PLACEMENT);
        emitter.removeListener(CONSTANTS.BACK_TO_HOME);
        emitter.removeListener(CONSTANTS.RUN_TUTORIAL);


        this.clearButton.remove();
        this.saveButton.remove();
        this.homeButton.remove();
        
        let element = document.getElementById('input-box');
        if (element && element.style.display === 'block') {
            element.style.display = 'none';
        }

        console.log('back to home');

        game.scene.start(CONSTANTS.HOME_SCENE);
        game.scene.stop(CONSTANTS.SETUP_SCENE);
    }

    updateCounter() {
        this.counter.text = `Army Size: ${this.unitsPlaced[this.currentArmy]} / 10`;
    }

    updateDetailsView(unit) {
        this.unitStats.updateStats(unit);
    }

    hideDetailsView() {
        this.unitStats.hideStats();
    }
}