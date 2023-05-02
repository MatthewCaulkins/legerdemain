class Overlay extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, 0, 0);

        // Background tint
        this.background = this.scene.add.graphics();
        
        this.background.fillStyle(CONSTANTS.BLACK, .5);
        this.background.fillRect(0, 0, gameWidth, gameHeight);

        this.add(this.background);

        // Main text or image
        this.image = this.scene.add.image(gameWidth / 2, gameHeight / 2, config.imageKey);

        // Accept button
        this.acceptButton = new Button({
            key: config.buttonKey,
            text: config.buttonText,
            textConfig: config.buttonTextConfig,
            event: config.buttonEvent, 
            x: gameWidth / 2,
            y: gameHeight / 2 + this.imagedisplayHeight / 2 + 30,
        });

        // Rotating texts

        // Add to scene
        this.scene.add.existing(this);
    }
}