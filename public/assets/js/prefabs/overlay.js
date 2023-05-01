class Overlay extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, 0, 0);

        // Background tint
        this.background = this.scene.add.graphics();
        
        this.background.fillStyle(CONSTANTS.BLACK, .5);
        this.background.fillRect(0, 0, gameWidth, gameHeight);

        this.add(this.background);
        
        // Main text or image

        // Accept button

        // Rotating texts

        // Add to scene
        this.scene.add.existing(this);
    }
}