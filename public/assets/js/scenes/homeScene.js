class HomeScene extends Phaser.Scene {
    constructor() {
        super({key: CONSTANTS.HOME_SCENE});
    }

    preload() {
        this.load.image('tile', 'assets/img/tile.png');
    }

    create() {
        console.log('Home Game');
        console.log(game);

        model.currentScene = this;
        this.scene = this;
        
        this.alignmentGrid = new AlignmentGrid({rows: 11, columns: 11, scene: this});
        this.alignmentGrid.showCellIndex();

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
    }

    // Change scenes
    loadPlayScene() {
        game.scene.start(CONSTANTS.PLAY_SCENE);
        game.scene.stop(CONSTANTS.HOME_SCENE);
    }

    loadSetupScene() {
        if (!this.ended) {
            game.scene.start(CONSTANTS.SETUP_SCENE);
            game.scene.stop(CONSTANTS.HOME_SCENE);
            // this.ended = true;
        }
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