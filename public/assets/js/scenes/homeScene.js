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
            x: 100,
            y: 100
        });
        emitter.on('LoadPlayScene', () => {
            this.scene.start('PlayScene');
        });

        this.playSceneButton = new Button({
            scene: this, 
            key: 'tile',
            text: 'Setup',
            textConfig: { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' },
            event: 'LoadSetupScene',
            x: 200,
            y: 100
        });
        emitter.on('LoadSetupScene', () => {
            this.scene.start('SetupScene');
        });
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