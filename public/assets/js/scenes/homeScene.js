class HomeScene extends Phaser.Scene {
    constructor() {
        super({key: CONSTANTS.HOME_SCENE});
    }

    preload() {
        this.load.image(CONSTANTS.TILE, 'assets/img/tile.png');
        this.load.image(CONSTANTS.MATCHMAKING_TILE, 'assets/img/board.png');
        this.load.image(CONSTANTS.ACTION_BUTTON_CONTAINER, 'assets/img/actionButtonContainer.png');

        // Direction buttons
        this.load.image(CONSTANTS.TOP_DIRECTION_BUTTON, 'assets/img/topDirectionButton.png');
        this.load.image(CONSTANTS.RIGHT_DIRECTION_BUTTON, 'assets/img/rightDirectionButton.png');
        this.load.image(CONSTANTS.BOTTOM_DIRECTION_BUTTON, 'assets/img/bottomDirectionButton.png');
        this.load.image(CONSTANTS.LEFT_DIRECTION_BUTTON, 'assets/img/leftDirectionButton.png');
        
        // Image (eventually Sprite sheets) for characters
        this.load.image(CONSTANTS.SWORD, 'assets/img/sword.png');
        this.load.image(CONSTANTS.SWORD_TINT, 'assets/img/swordTint.png');

        // Sprite sheets
            // Characters
        this.load.spritesheet(CONSTANTS.LANCE, 'assets/img/lance.png', {frameWidth: 150, frameHeight: 150, endFrame: 1});
        this.load.spritesheet(CONSTANTS.LANCE_TINT, 'assets/img/lanceTint.png', {frameWidth: 150, frameHeight: 150, endFrame: 1});

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
        this.alignmentGrid.showCellIndex();

        // Add matchmaking tiles
        console.log(this);

        // Add navigation buttons
        this.playSceneButton = new Button({
            scene: this, 
            key: 'tile',
            text: 'Play',
            textConfig: CONSTANTS.LIGHT_TEXT_STYLE,
            event: CONSTANTS.LOAD_PLAY_SCENE,
            alignmentGrid: this.alignmentGrid,
            index: 12
        });
        emitter.once(CONSTANTS.LOAD_PLAY_SCENE, this.loadPlayScene);

        this.setupSceneButton = new Button({
            scene: this, 
            key: 'tile',
            text: 'Setup',
            textConfig: CONSTANTS.LIGHT_TEXT_STYLE,
            event: CONSTANTS.LOAD_SETUP_SCENE,
            alignmentGrid: this.alignmentGrid,
            index: 14
        });
        emitter.on(CONSTANTS.LOAD_SETUP_SCENE, this.loadSetupScene);

        if (game.player) {
            this.createHUD();
        }

        emitter.emit(CONSTANTS.GAME_LOADED);
        emitter.once(CONSTANTS.CREATE_HUD, this.createHUD.bind(this));

        
        // TODO: add matchmaking tile container
        this.matchmakingContainer = new MatchmakingTile(this);
        this.alignmentGrid.positionItemAtIndex(34, this.matchmakingContainer);
    }

    // Change scenes
    loadPlayScene() {
        emitter.removeListener(CONSTANTS.LOAD_PLAY_SCENE);
        emitter.removeListener(CONSTANTS.LOAD_SETUP_SCENE);
        emitter.removeListener(CONSTANTS.CREATE_HUD);

        game.scene.start(CONSTANTS.PLAY_SCENE);
        game.scene.stop(CONSTANTS.HOME_SCENE);
    }

    loadSetupScene() {
        emitter.removeListener(CONSTANTS.LOAD_PLAY_SCENE);
        emitter.removeListener(CONSTANTS.LOAD_SETUP_SCENE);
        emitter.removeListener(CONSTANTS.CREATE_HUD);

        game.scene.start(CONSTANTS.SETUP_SCENE);
        game.scene.stop(CONSTANTS.HOME_SCENE);
    }

    // Show players
    createHUD() {
        this.graphics = this.add.graphics();
        
        this.graphics.fillStyle(0xffffff, 1);
        this.graphics.fillRect(0, this.alignmentGrid.cellHeight * (this.alignmentGrid.rows - 2), gameWidth, gameHeight);

        console.log(controller);
        const text = this.add.text(0, 0, `Welcome ${game.player.name}`, CONSTANTS.DARK_TEXT_STYLE);

        this.alignmentGrid.positionItemAtIndex(100, text);
    }

    // loadPlayScene(scene) {
    //     scene.start('PlayScene');
    // }

    // loadSetupScene(scene) {
    //     scene.start('SetupScene');
    // }
        // create the game Controller
        // controller = new Controller();

    //    var myText = this.scene.add.text(x, y, 'Text');
    //    myText.setText('new text');
    //    myText.setOrigin(.5, .5);

        // Scroll code
        // // Add scroll 
        // this.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {

        //     soil.tilePositionX += deltaX * 0.5;
        //     soil.tilePositionY += deltaY * 0.5;
    
        // });
    
        // this.add.text(10, 10, 'Scroll your mouse-wheel', { font: '16px Courier', fill: '#00ff00' });


        // List all players not in a game

    update() {
        
    }
}