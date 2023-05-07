class HomeScene extends Phaser.Scene {
    constructor() {
        super({key: CONSTANTS.HOME_SCENE});
    }

    preload() {
        // Sounds
        this.load.audio(CONSTANTS.FOOTSTEP, 'assets/sounds/Footstep.wav');
        this.load.audio(CONSTANTS.HOME_LOOP, 'assets/sounds/Home_music_loop.wav');
        this.load.audio(CONSTANTS.GAME_MUSIC, 'assets/sounds/Battle_melody_maybe.wav');
        this.load.audio(CONSTANTS.KNIFE2, 'assets/sounds/Knife2.wav');
        this.load.audio(CONSTANTS.MESMERIZE, 'assets/sounds/Control.wav');
        this.load.audio(CONSTANTS.COMET, 'assets/sounds/Sorcery_fireball.wav');
        this.load.audio(CONSTANTS.BOWSTRING, 'assets/sounds/Bow.wav');
        this.load.audio(CONSTANTS.HEALING, 'assets/sounds/Healing_twinkle_baby.wav');
        this.load.audio(CONSTANTS.DODGE_SOUND, 'assets/sounds/Dodge.mp3');
        this.load.audio(CONSTANTS.BLOCK_SOUND1, 'assets/sounds/Block.wav');
        this.load.audio(CONSTANTS.BLOCK_SOUND2, 'assets/sounds/Block_alternate_fast.wav');
        this.load.audio(CONSTANTS.ARROW_SOUND, 'assets/sounds/Arrows.wav');
        this.load.audio(CONSTANTS.BUTTON_SOUND, 'assets/sounds/Button.wav');
        this.load.audio(CONSTANTS.PICK_UP, 'assets/sounds/Pickup.wav');
        this.load.audio(CONSTANTS.PUT_DOWN, 'assets/sounds/Put_down.wav');
        this.load.audio(CONSTANTS.MATCHMAKE_SELECT_SOUND, 'assets/sounds/Confirm.wav');
        this.load.audio(CONSTANTS.VICTORY_SOUND, 'assets/sounds/Victory.wav');
        this.load.audio(CONSTANTS.DEFEAT_SOUND, 'assets/sounds/Defeat.wav');

        // Overlay images
        this.load.spritesheet(CONSTANTS.END_GAME_ICON, 'assets/img/endGameIcon.png', {frameWidth: 500, frameHeight: 500, endFrame: 1});

        // Tiles
        this.load.image(CONSTANTS.TILE, 'assets/img/tile.png');
        this.load.image(CONSTANTS.MATCHMAKING_TILE, 'assets/img/board.png');

        // Action buttons
        this.load.image(CONSTANTS.ACTION_BUTTON_CONTAINER, 'assets/img/actionButtonContainer.png');
        this.load.image(CONSTANTS.TOP_DIRECTION_BUTTON, 'assets/img/topDirectionButton.png');
        this.load.image(CONSTANTS.RIGHT_DIRECTION_BUTTON, 'assets/img/rightDirectionButton.png');
        this.load.image(CONSTANTS.BOTTOM_DIRECTION_BUTTON, 'assets/img/bottomDirectionButton.png');
        this.load.image(CONSTANTS.LEFT_DIRECTION_BUTTON, 'assets/img/leftDirectionButton.png');

        // Screen backgrounds
        this.load.image(CONSTANTS.HOME_SCREEN_BACKGROUND, 'assets/img/homeScreen.png');
        this.load.image(CONSTANTS.SETUP_SCREEN_BACKGROUND, 'assets/img/setupScreen.png');
        this.load.image(CONSTANTS.SETUP_SCREEN_BORDER, 'assets/img/setupScreenBorder.png');
        
        // Buttons
        this.load.spritesheet(CONSTANTS.ARMY_SETUP_BUTTON, 'assets/img/armySetupButton.png', {frameWidth: 75, frameHeight: 75, endFrame: 2});
        this.load.spritesheet(CONSTANTS.BACK_BUTTON, 'assets/img/backButton.png', {frameWidth: 75, frameHeight: 75, endFrame: 2});
        this.load.spritesheet(CONSTANTS.CLEAR_ARMY_BUTTON, 'assets/img/clearArmyButton.png', {frameWidth: 75, frameHeight: 75, endFrame: 2});
        this.load.spritesheet(CONSTANTS.QUIT_BUTTON, 'assets/img/quitButton.png', {frameWidth: 75, frameHeight: 75, endFrame: 2});
        this.load.spritesheet(CONSTANTS.SAVE_ARMY_BUTTON, 'assets/img/saveArmyButton.png', {frameWidth: 75, frameHeight: 75, endFrame: 2});
        this.load.spritesheet(CONSTANTS.SELECT_ARMY_BUTTON, 'assets/img/selectArmyButton.png', {frameWidth: 75, frameHeight: 75, endFrame: 2});
        this.load.spritesheet(CONSTANTS.TUTORIAL_BUTTON, 'assets/img/tutorialButton.png', {frameWidth: 75, frameHeight: 75, endFrame: 2});
        this.load.spritesheet(CONSTANTS.NEXT_BUTTON, 'assets/img/nextButton.png', {frameWidth: 75, frameHeight: 75, endFrame: 2});
        this.load.spritesheet(CONSTANTS.PREVIOUS_BUTTON, 'assets/img/previousButton.png', {frameWidth: 75, frameHeight: 75, endFrame: 2});

        // Sprite sheets
            // Characters
        this.load.spritesheet(CONSTANTS.LANCE, 'assets/img/lance.png', {frameWidth: 150, frameHeight: 150, endFrame: 3});
        this.load.spritesheet(CONSTANTS.LANCE_TINT, 'assets/img/lanceTint.png', {frameWidth: 150, frameHeight: 150, endFrame: 3});

            // Scene Assets
        this.load.spritesheet(CONSTANTS.ARROW, 'assets/img/scrollArrow.png', {frameWidth: 50, frameHeight: 99, endFrame: 2});
        this.load.spritesheet(CONSTANTS.ORB, 'assets/img/orbs.png', {frameWidth: 33, frameHeight: 32, endFrame: 2});
        this.load.spritesheet(CONSTANTS.ACTION_BUTTON, 'assets/img/attackButton.png', {frameWidth: 100, frameHeight: 100, endFrame: 3});
        this.load.spritesheet(CONSTANTS.MOVE_BUTTON, 'assets/img/moveButton.png', {frameWidth: 100, frameHeight: 100, endFrame: 3});
        this.load.spritesheet(CONSTANTS.DIRECTION_BUTTON, 'assets/img/directionButton.png', {frameWidth: 100, frameHeight: 100, endFrame: 3});
        this.load.spritesheet(CONSTANTS.WAIT_BUTTON, 'assets/img/waitButton.png', {frameWidth: 100, frameHeight: 100, endFrame: 3});
        
        // this.AXE = 'axe';
        // this.AXE_TINT = 'axeTint';
        // this.BOW = 'bow';
        // this.BOW_TINT = 'bowTint';
        // this.CONTROL = 'control';
        // this.CONTROL_TINT = 'controlTint';
        // this.DAGGER = 'dagger';
        // this.DAGGER_TINT = 'daggerTint';
        // this.HEALING = 'healing';
        // this.HEALING_TINT = 'healingTint';
        // this.LANCE = 'lance';
        // this.LANCE_TINT = 'lanceTint';
        // this.SHIELD = 'shield';
        // this.SHIELD_TINT = 'shieldTint';
        // this.SORCERY = 'sorcery';
        // this.SORCERY_TINT = 'sorceryTint';
        // this.SWORD = 'sword';
        // this.SWORD_TINT = 'swordTint';
    }

    create() {        
        model.currentScene = this;
        this.scene = this;
        
        this.alignmentGrid = new AlignmentGrid({rows: 11, columns: 11, scene: this});
        // this.alignmentGrid.showCellIndex();

        // Add matchmaking tiles
        console.log(this);

        this.background = this.add.image(0, 0, CONSTANTS.HOME_SCREEN_BACKGROUND);
        this.background.setOrigin(0, 0);
        // Add navigation buttons
        // this.playSceneButton = new Button({
        //     scene: this, 
        //     key: 'tile',
        //     text: 'Play',
        //     textConfig: CONSTANTS.LIGHT_TEXT_STYLE,
        //     event: CONSTANTS.LOAD_PLAY_SCENE,
        //     alignmentGrid: this.alignmentGrid,
        //     index: 12
        // });
        // emitter.once(CONSTANTS.LOAD_PLAY_SCENE, this.loadPlayScene);

        // Setup the controller and load the HUD
        if (game.player) {
            this.createHUD();
        }

        if (!controller.connected) {
            emitter.emit(CONSTANTS.GAME_LOADED);
        } else {
            emitter.emit(CONSTANTS.GET_ROOMS);
        }
        emitter.once(CONSTANTS.CREATE_HUD, this.createHUD, this);

        // Start a game when the room is full
        emitter.on(CONSTANTS.START_GAME, () => {
            console.log('start game triggered');
            this.startGame();
        });

        // Looping music
    }

    // Change scenes
    // loadPlayScene() {
    //     // emitter.removeListener(CONSTANTS.LOAD_PLAY_SCENE);
    //     emitter.removeListener(CONSTANTS.LOAD_SETUP_SCENE);
    //     emitter.removeListener(CONSTANTS.CREATE_HUD);
    //     emitter.removeListener(CONSTANTS.CREATE_NEW_ROOM);
    //     emitter.removeListener(CONSTANTS.START_GAME);
    //     emitter.emit(CONSTANTS.CLEAR_PLAYER_FROM_ROOMS);

    //     game.scene.start(CONSTANTS.PLAY_SCENE);
    //     game.scene.stop(CONSTANTS.HOME_SCENE);
    // }

    loadSetupScene() {
        // emitter.removeListener(CONSTANTS.LOAD_PLAY_SCENE);
        emitter.removeListener(CONSTANTS.LOAD_SETUP_SCENE);
        emitter.removeListener(CONSTANTS.CREATE_HUD);
        emitter.removeListener(CONSTANTS.CREATE_NEW_ROOM);
        emitter.removeListener(CONSTANTS.CREATE_ROOMS);
        emitter.removeListener(CONSTANTS.MATCHMAKING_TILES_CREATED);
        emitter.removeListener(CONSTANTS.UPDATE_ROOMS);
        emitter.removeListener(CONSTANTS.START_GAME);
        emitter.removeListener(CONSTANTS.RUN_TUTORIAL);
        emitter.emit(CONSTANTS.CLEAR_PLAYER_FROM_ROOMS);

        game.scene.start(CONSTANTS.SETUP_SCENE);
        game.scene.stop(CONSTANTS.HOME_SCENE);
    }

    startGame() {
        // emitter.removeListener(CONSTANTS.LOAD_PLAY_SCENE);
        emitter.removeListener(CONSTANTS.LOAD_SETUP_SCENE);
        emitter.removeListener(CONSTANTS.CREATE_HUD);
        emitter.removeListener(CONSTANTS.CREATE_NEW_ROOM);
        emitter.removeListener(CONSTANTS.CREATE_ROOMS);
        emitter.removeListener(CONSTANTS.MATCHMAKING_TILES_CREATED);
        emitter.removeListener(CONSTANTS.UPDATE_ROOMS);
        emitter.removeListener(CONSTANTS.START_GAME);
        emitter.removeListener(CONSTANTS.RUN_TUTORIAL);

        game.scene.start(CONSTANTS.PLAY_SCENE);
        game.scene.stop(CONSTANTS.HOME_SCENE);
    }

    // Show players
    createHUD() {
        // this.graphics = this.add.graphics();
        
        // this.graphics.fillStyle(0xffffff, 1);
        // this.graphics.fillRect(0, this.alignmentGrid.cellHeight * (this.alignmentGrid.rows - 2), gameWidth, gameHeight);

        // console.log(controller);
        // const text = this.add.text(0, 0, `Welcome ${game.player.name}`, CONSTANTS.DARK_TEXT_STYLE);

        // this.alignmentGrid.positionItemAtIndex(100, text);

        const matcmakingContainerConfig = {
            scene: this,
            x: 110,
            y: 200,
            width: gameWidth - 220,
            height: gameHeight - 400
        };
        this.matchmakingTileContainer = new MatchmakingTileContainer(matcmakingContainerConfig);

        this.setupSceneButton = new Button({
            scene: this, 
            texture: CONSTANTS.ARMY_SETUP_BUTTON,
            event: CONSTANTS.LOAD_SETUP_SCENE,
            alignmentGrid: this.alignmentGrid,
            defaultKey: CONSTANTS.ARMY_SETUP_BUTTON_DEFAULT,
            hoverKey: CONSTANTS.ARMY_SETUP_BUTTON_HOVER,
            downKey: CONSTANTS.ARMY_SETUP_BUTTON_DOWN,
            index: 12
        });
        emitter.on(CONSTANTS.LOAD_SETUP_SCENE, this.loadSetupScene);

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

        // TODO: only do this automatically if not saved that it is done
        emitter.on(CONSTANTS.MATCHMAKING_TILES_CREATED, this.runTutorial, this);
        emitter.on(CONSTANTS.RUN_HOME_TUTORIAL, this.runTutorial, this);
    }

    runTutorial() {    
        const underlyingInteractives = [
            this.setupSceneButton.sprite, 
            this.tutorialButton.sprite
        ];

        Object.keys(controller.rooms).forEach(roomID => {
            underlyingInteractives.push(controller.rooms[roomID].leftSide);
            underlyingInteractives.push(controller.rooms[roomID].rightSide);
        })

        this.tutorialOverlay = new TutorialOverlay({
            scene: this,
            underlyingInteractives: underlyingInteractives,
            screens: [
                {
                    text: 'This is the home screen, where you can manager your armies or join a match.',
                    imageKey: '',
                    imageIndex: 0,
                }, 
                {
                    text: 'To manage your army layouts click on the Army Setup button in the upper left.',
                    imageKey: '',
                    imageIndex: 12,
                },
                {
                    text: 'You can join or leave a match by selecting a side on a matchmaking tile.  The match will start when both sides are occupied.',
                    imageKey: '',
                    imageIndex: 34,
                }    
            ],
            textConfig: CONSTANTS.TUTORIAL_TEXT_STYLE,
            buttonTextConfig: CONSTANTS.LIGHT_TEXT_STYLE,
            alignmentGrid: this.alignmentGrid,
            endEvent: CONSTANTS.HOME_TUTORIAL_RUN
        });
    }
}