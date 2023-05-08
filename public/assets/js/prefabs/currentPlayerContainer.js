class CurrentPlayerContainer extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, 0, 0);

        this.image = config.scene.add.image(0, 0, CONSTANTS.CURRENT_PLAYER_CONTAINER);
        this.add(this.image);
        
        this.textConfig = config.textConfig;
        this.textConfig.wordWrap = {width: this.image.displayWidth - 10};

        this.text = this.scene.add.text(0, 0, config.text, this.textConfig);
        this.text.setOrigin(.5, .5);
        this.add(this.text);

        this.scene.add.existing(this);
    }
}