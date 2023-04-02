class HomeScene extends Phaser.Scene {
    constructor() {
        super({key: 'HomeScene'});
    }

    preload() {
        this.load.image('tile', 'assets/img/tile.png');
    }

    create() {
        model.currentScene = this;
        this.scene = this;
        
        this.alignmentGrid = new AlignmentGrid({rows: 11, columns: 11, scene: this});
        this.alignmentGrid.showCellIndex();

        // Add navigation buttons
        this.playSceneButton = new Button({
            scene: this, 
            key: 'tile',
            text: 'Play',
            textConfig: { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' },
            event: 'LoadPlayScene',
            alignmentGrid: this.alignmentGrid,
            index: 12
        });
        emitter.on('LoadPlayScene', this.loadPlayScene);

        this.playSceneButton = new Button({
            scene: this, 
            key: 'tile',
            text: 'Setup',
            textConfig: { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' },
            event: 'LoadSetupScene',
            alignmentGrid: this.alignmentGrid,
            index: 14
        });
        emitter.on('LoadSetupScene', this.loadSetupScene);

        this.createHUD();
    }

    // Change scenes
    loadPlayScene() {
        game.scene.start('PlayScene');
        game.scene.stop('HomeScene');
    }

    loadSetupScene() {
        game.scene.start('SetupScene');
        game.scene.stop('HomeScene');
    }

    // Show players
    createHUD() {
        this.graphics = this.add.graphics();
        
        this.graphics.fillStyle(0xffffff, 1);
        this.graphics.fillRect(0, this.alignmentGrid.cellHeight * (this.alignmentGrid.rows - 2), gameWidth, gameHeight);

        const text = this.add.text(0, 0, `Welcome ${game.player.name}`, {
            color: '#000000'
        });

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