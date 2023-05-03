class ArmyArrow extends Phaser.GameObjects.Sprite {
    constructor(scene, direction) {
        super(scene, 0, 0, CONSTANTS.ARROW);

        let config = {
            key: 'off',
            frames: scene.anims.generateFrameNumbers(CONSTANTS.ARROW, { start: 0, end: 0, first: 0 }),
            frameRate: 1,
            repeat: 0
        };
        scene.anims.create(config);
        config = {
            key: 'on',
            frames: scene.anims.generateFrameNumbers(CONSTANTS.ARROW, { start: 1, end: 1, first: 1 }),
            frameRate: 1,
            repeat: 0
        };
        scene.anims.create(config);

        let callback = this.shiftArmyRight();
        if (direction === 'left') {
            this.scaleX = -1;
            callback = this.shiftArmyLeft();
        }

        this.setInteractive();
        this.on(CONSTANTS.POINTER_OVER, () => {
            this.play('on');
        });
        this.on(CONSTANTS.POINTER_OUT, () => {
            this.play('off');
        });
        this.on(CONSTANTS.POINTER_DOWN, () => {
            if (direction === 'left') {
                this.shiftArmyLeft();
            } else {
                this.shiftArmyRight();
            }
        }) ;//scene.shiftArmyLeft);

        // this.rightArrow.setInteractive();
        // this.rightArrow.on(CONSTANTS.POINTER_OVER, () => {
        //     this.rightArrow.play('on');
        // });
        // this.rightArrow.on(CONSTANTS.POINTER_OUT, () => {
        //     this.rightArrow.play('off');
        // });
        // this.rightArrow.on(CONSTANTS.POINTER_DOWN, this.shiftArmyRight);

        scene.add.existing(this);
        this.play('off');
    }

    shiftArmyLeft() {
        this.scene.currentArmy --;
        this.scene.shiftArmy();
    }

    shiftArmyRight() {
        this.scene.currentArmy ++;
        this.scene.shiftArmy();
    }
}