class ActionResultsText extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, config.x, config.y);

        this.text = this.scene.add.text(0, 0, CONSTANTS.BLOCK_RESULT, config.textConfig);
        this.text.setOrigin(.5, .5);
        this.add(this.text);

        config.scene.add.existing(this);

        this.setVisible(false);
    }

    // setVisible(visible) {
    //     this.text.setVisible(visible);
    // }

    setActive(text) {
        // TODO: set a tween to 1 alpha -y, then to 0 alpha +y 
    }
}