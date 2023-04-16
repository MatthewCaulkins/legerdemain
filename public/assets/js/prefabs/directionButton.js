class DirectionButton extends Phaser.GameObjects.Image {
    constructor(config) {
        super(config.scene, config.x, config.y, config.texture);

        this.direction = config.direction;
        this.unit = config.unit;

        config.scene.add.existing(this);

        this.setInteractive();
        this.on(CONSTANTS.POINTER_OVER, this.pointerOver, this);
        this.on(CONSTANTS.POINTER_OUT, this.pointerOut, this);
        this.on(CONSTANTS.POINTER_DOWN, this.pointerDown, this);
    }

    pointerOver() {
        console.log('direction pointer over');
        this.setTint(CONSTANTS.GREEN_TINT);
        // TODO: set the units direction
    }

    pointerOut() {
        console.log('direction pointer out');
        this.clearTint();
    }

    pointerDown() {
        console.log('direction pointer down');

    }
}