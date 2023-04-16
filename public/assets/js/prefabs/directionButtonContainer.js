class DirectionButtonContainer extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, -52, -85);

        let buttonConfig = {
            scene: config.scene,
            texture: CONSTANTS.TOP_DIRECTION_BUTTON,
            direction: CONSTANTS.TOP,
            x: 100,
            y: 25,
            unit: config.unit,
        }
        this.topDirectionButton = new DirectionButton(buttonConfig);
        this.add(this.topDirectionButton);

        buttonConfig = {
            scene: config.scene,
            texture: CONSTANTS.RIGHT_DIRECTION_BUTTON,
            direction: CONSTANTS.RIGHT,
            x: 100,
            y: 100,
            unit: config.unit,
        }
        this.rightDirectionButton = new DirectionButton(buttonConfig);
        this.add(this.rightDirectionButton);

        buttonConfig = {
            scene: config.scene,
            texture: CONSTANTS.BOTTOM_DIRECTION_BUTTON,
            direction: CONSTANTS.BOTTOM,
            x: 25,
            y: 100,
            unit: config.unit,
        }
        this.bottomDirectionButton = new DirectionButton(buttonConfig);
        this.add(this.bottomDirectionButton);

        buttonConfig = {
            scene: config.scene,
            texture: CONSTANTS.LEFT_DIRECTION_BUTTON,
            direction: CONSTANTS.LEFT,
            x: 25,
            y: 25,
            unit: config.unit,
        }
        this.leftDirectionButton = new DirectionButton(buttonConfig);
        this.add(this.leftDirectionButton);

        this.setSize(127, 131);
        this.scaleX = config.scale;
        this.scaleY = config.scale;

        config.scene.add.existing(this);

        this.setVisible(false);
    }
}