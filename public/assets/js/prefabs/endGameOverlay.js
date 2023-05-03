class EndGameOverlay extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, 0, 0);

        // Background tint
        this.background = this.scene.add.graphics();
        
        this.background.fillStyle(CONSTANTS.BLACK, .5);
        this.background.fillRect(0, 0, gameWidth, gameHeight);

        this.add(this.background);

        // Victory or defeat icon
        let spriteConfig = {
            key: CONSTANTS.DEFEAT,
            frames: config.scene.anims.generateFrameNumbers(CONSTANTS.END_GAME_ICON, { start: 0, end: 0, first: 0 }),
            frameRate: 1,
            repeat: 0
        };
        config.scene.anims.create(spriteConfig);
        
        spriteConfig = {
            key: CONSTANTS.VICTORY,
            frames: config.scene.anims.generateFrameNumbers(CONSTANTS.END_GAME_ICON, { start: 1, end: 1, first: 1 }),
            frameRate: 1,
            repeat: 0
        };
        config.scene.anims.create(spriteConfig);

        this.sprite = this.scene.add.sprite(gameWidth / 2, 0, CONSTANTS.END_GAME_ICON);
        this.sprite.y = -this.sprite.displayHeight / 2;
        this.add(this.sprite);
        this.sprite.play(config.imageKey);

        // Tween the icon down
        this.scene.tweens.add({
            targets: this.sprite,
            y: gameHeight / 2,
            duration: 1500, 
            yoyo: false, 
            repeat: 0,
            callbackScope: this,
            onComplete: function () {  
                this.addButton()
            }
        });
        
        // Add to scene
        this.scene.add.existing(this);

        // Add accept button
        this.acceptButton = new Button({
            scene: this.scene,
            key: config.buttonKey,
            text: config.buttonText,
            textConfig: config.buttonTextConfig,
            event: config.buttonEvent, 
            x: gameWidth / 2,
            y: gameHeight / 2 + this.sprite.displayHeight / 2,
        });

        this.add(this.acceptButton);
        this.acceptButton.setVisible(false);
    }

    addButton() {
        // Accept button
        this.acceptButton.setVisible(true);
    }
}