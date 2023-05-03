class ActionResultsText extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, config.x, config.y);

        config.textConfig.wordWrap = { width: 300 };
        this.text = this.scene.add.text(0, 0, CONSTANTS.BLOCK_RESULT, config.textConfig);
        this.text.setOrigin(.5, .5);
        this.add(this.text);

        config.scene.add.existing(this);

        this.setVisible(false);
    }

    // setVisible(visible) {
    //     this.text.setVisible(visible);
    // }

    setActive(active, text) {
        this.setVisible(active);
        this.text.text = text;

        this.scene.tweens.add({
            targets: this.text, 
            easing: 'quadratic.in',
            y: this.text.y - 5, 
            duration: 300, 
            yoyo: true, 
            repeat: 0,
            hold: 400,
        });
        // TODO: set a tween to 1 alpha -y, then to 0 alpha +y 
    }
}