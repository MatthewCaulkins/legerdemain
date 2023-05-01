class ActionButtonContainer extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, 0, 0);

        this.image = config.scene.add.image(0, 0, CONSTANTS.ACTION_BUTTON_CONTAINER);
        this.image.setOrigin(0, 0);
        this.add(this.image);

        let buttonConfig = {
            scene: config.scene,
            // playerSide: config.playerSide,
            x: 115,
            y: 45,
            key: CONSTANTS.MOVE_BUTTON,
            onKey: CONSTANTS.MOVE_BUTTON_ON,
            hoverKey: CONSTANTS.MOVE_BUTTON_HOVER,
            activeKey: CONSTANTS.MOVE_BUTTON_ACTIVE,
            offKey: CONSTANTS.MOVE_BUTTON_OFF,
            text: 'MOVE',
            textConfig: CONSTANTS.LIGHT_TEXT_STYLE,
            phase: CONSTANTS.MOVEMENT_ACTION
        }
        this.movementButton = new ActionButton(buttonConfig);
        this.add(this.movementButton);
        // this.alignmentGrid.positionItemAtIndex(53, this.movementButton);

        buttonConfig = {
            scene: config.scene,
            // playerSide: config.playerSide,
            x: 30,
            y: 130,
            key: CONSTANTS.ACTION_BUTTON,
            onKey: CONSTANTS.ACTION_BUTTON_ON,
            hoverKey: CONSTANTS.ACTION_BUTTON_HOVER,
            activeKey: CONSTANTS.ACTION_BUTTON_ACTIVE,
            offKey: CONSTANTS.ACTION_BUTTON_OFF,
            text: 'ACTION',
            textConfig: CONSTANTS.LIGHT_TEXT_STYLE,
            phase: CONSTANTS.ACTION_ACTION
        }
        this.actionButton = new ActionButton(buttonConfig);
        this.add(this.actionButton);
        // this.alignmentGrid.positionItemAtIndex(63, this.actionButton);

        buttonConfig = {
            scene: config.scene,
            // playerSide: config.playerSide,
            x: 200,
            y: 130,
            key: CONSTANTS.DIRECTION_BUTTON,
            onKey: CONSTANTS.DIRECTION_BUTTON_ON,
            hoverKey: CONSTANTS.DIRECTION_BUTTON_HOVER,
            activeKey: CONSTANTS.DIRECTION_BUTTON_ACTIVE,
            offKey: CONSTANTS.DIRECTION_BUTTON_OFF,
            text: 'DIRECTION',
            textConfig: CONSTANTS.LIGHT_TEXT_STYLE,
            phase: CONSTANTS.DIRECTION_ACTION
        }
        this.directionButton = new ActionButton(buttonConfig);
        this.add(this.directionButton);
        // this.alignmentGrid.positionItemAtIndex(65, this.directionButton);

        buttonConfig = {
            scene: config.scene,
            // playerSide: config.playerSide,
            x: 115,
            y: 215,
            key: CONSTANTS.WAIT_BUTTON,
            onKey: CONSTANTS.WAIT_BUTTON_ON,
            hoverKey: CONSTANTS.WAIT_BUTTON_HOVER,
            activeKey: CONSTANTS.WAIT_BUTTON_ACTIVE,
            offKey: CONSTANTS.WAIT_BUTTON_OFF,
            text: 'WAIT',
            textConfig: CONSTANTS.LIGHT_TEXT_STYLE,
            phase: CONSTANTS.WAIT_ACTION
        }
        this.waitButton = new ActionButton(buttonConfig);
        this.add(this.waitButton);
        // this.alignmentGrid.positionItemAtIndex(75, this.waitButton);

        this.setSize(227, 271);
        config.scene.add.existing(this);
    }

    setActive(buttonName) {
        let button = null;

        switch(buttonName) {
            case CONSTANTS.MOVE_BUTTON:
                button = this.movementButton;
                break;
            case CONSTANTS.ACTION_BUTTON:
                button = this.actionButton;
                break;
            case CONSTANTS.DIRECTION_BUTTON:
                button = this.directionButton;
                break;
            case CONSTANTS.WAIT_BUTTON:
                button = this.waitButton;
                break;
        }

        button.setActive();
    }
    
    setUsed(buttonName) {
        let button = null;

        switch(buttonName) {
            case CONSTANTS.MOVE_BUTTON:
                button = this.movementButton;
                break;
            case CONSTANTS.ACTION_BUTTON:
                button = this.actionButton;
                break;
            case CONSTANTS.DIRECTION_BUTTON:
                button = this.directionButton;
                break;
            case CONSTANTS.WAIT_BUTTON:
                button = this.waitButton;
                break;
        }

        button.setUsed();
    }

    reset() {
        this.directionButton.reset();
        this.actionButton.reset();
        this.movementButton.reset();
        this.waitButton.reset();
    }
}