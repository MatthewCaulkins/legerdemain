class ScrollArrow extends Phaser.GameObjects.Sprite {
    constructor(scene, direction, scale = 1) {
        super(scene, 0, 0, CONSTANTS.ARROW);

        this.playerArmies = scene.scene.key === CONSTANTS.PLAY_SCENE ? scene.playerArmies.length - 1 : 3;

        console.log(this.playerArmies);

        let config = {
            key: CONSTANTS.OFF,
            frames: scene.anims.generateFrameNumbers(CONSTANTS.ARROW, { start: 0, end: 0, first: 0 }),
            frameRate: 1,
            repeat: 0
        };
        scene.anims.create(config);
        config = {
            key: CONSTANTS.HOVER,
            frames: scene.anims.generateFrameNumbers(CONSTANTS.ARROW, { start: 1, end: 1, first: 1 }),
            frameRate: 1,
            repeat: 0
        };
        scene.anims.create(config);
        config = {
            key: CONSTANTS.ON,
            frames: scene.anims.generateFrameNumbers(CONSTANTS.ARROW, { start: 2, end: 2, first: 2 }),
            frameRate: 1,
            repeat: 0
        };
        scene.anims.create(config);

        // Set scale
        this.scale = scale;

        //let callback = this.shiftArmyRight;
        if (direction === CONSTANTS.LEFT) {
            this.scaleX = -1;
            //callback = this.shiftArmyLeft;
        }


        // Add interactivity
        this.setInteractive();
        this.on(CONSTANTS.POINTER_OVER, () => {
            this.play(CONSTANTS.HOVER);
        });
        this.on(CONSTANTS.POINTER_OUT, () => {
            this.play(CONSTANTS.OFF);
        });
        this.on(CONSTANTS.POINTER_DOWN, () => {
            this.play(CONSTANTS.ON);
            if (direction === CONSTANTS.LEFT) {
                this.shiftArmyLeft();
            } else {
                this.shiftArmyRight();
            }
        });
        this.on(CONSTANTS.POINTER_UP, () => {
            this.play(CONSTANTS.HOVER);
        });

        scene.add.existing(this);
        this.play(CONSTANTS.OFF);
    }

    shiftArmyLeft() {
        this.scene.currentArmy --;
        this.scene.currentArmy = this.scene.currentArmy < 0 ? this.playerArmies : this.scene.currentArmy;
        // if (this.scene.scene.key === CONSTANTS.SETUP_SCENE) {
        this.scene.shiftArmy();
        // } else {
            
        // }
    }

    shiftArmyRight() {
        this.scene.currentArmy ++;
        this.scene.currentArmy = this.scene.currentArmy > this.playerArmies ? 0 : this.scene.currentArmy;
        // if (this.scene.scene.key === CONSTANTS.SETUP_SCENE) {
        this.scene.shiftArmy();
        // } else {

        // }
    }
}