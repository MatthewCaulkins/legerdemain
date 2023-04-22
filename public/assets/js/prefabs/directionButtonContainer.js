class DirectionButtonContainer extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, 0, 0);

        this.offsetX = -52;
        this.offsetY = -85;

        let buttonConfig = {
            scene: this.scene,
            texture: CONSTANTS.TOP_DIRECTION_BUTTON,
            direction: CONSTANTS.TOP,
            x: 100,
            y: 25,
            // unit: config.unit,
        }
        this.topDirectionButton = new DirectionButton(buttonConfig);
        this.add(this.topDirectionButton);

        buttonConfig = {
            scene: this.scene,
            texture: CONSTANTS.RIGHT_DIRECTION_BUTTON,
            direction: CONSTANTS.RIGHT,
            x: 100,
            y: 100,
            // unit: config.unit,
        }
        this.rightDirectionButton = new DirectionButton(buttonConfig);
        this.add(this.rightDirectionButton);

        buttonConfig = {
            scene: this.scene,
            texture: CONSTANTS.BOTTOM_DIRECTION_BUTTON,
            direction: CONSTANTS.BOTTOM,
            x: 25,
            y: 100,
            // unit: config.unit,
        }
        this.bottomDirectionButton = new DirectionButton(buttonConfig);
        this.add(this.bottomDirectionButton);

        buttonConfig = {
            scene: this.scene,
            texture: CONSTANTS.LEFT_DIRECTION_BUTTON,
            direction: CONSTANTS.LEFT,
            x: 25,
            y: 25,
            // unit: config.unit,
        }
        this.leftDirectionButton = new DirectionButton(buttonConfig);
        this.add(this.leftDirectionButton);

        this.setSize(127, 131);
        this.scaleX = config.scale;
        this.scaleY = config.scale;

        this.scene.add.existing(this);

       // this.setVisible(false);
    }

    setUnit(unit) {
        this.topDirectionButton.unit = unit;
        this.rightDirectionButton.unit = unit;
        this.bottomDirectionButton.unit = unit;
        this.leftDirectionButton.unit = unit;

        if (unit) {
            this.x = unit.x + this.offsetX;
            this.y = unit.y + this.offsetY;
        }
    }
}