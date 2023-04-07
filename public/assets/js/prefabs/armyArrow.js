class ArmyArrow extends Phaser.GameObjects.Sprite {
    constructor(scene, direction, callback) {
        super(scene, 0, 0, 'arrow');

        let config = {
            key: 'off',
            frames: scene.anims.generateFrameNumbers('arrow', { start: 0, end: 0, first: 0 }),
            frameRate: 1,
            repeat: 0
        };
        scene.anims.create(config);
        config = {
            key: 'on',
            frames: scene.anims.generateFrameNumbers('arrow', { start: 1, end: 1, first: 1 }),
            frameRate: 1,
            repeat: 0
        };
        scene.anims.create(config);

        if (direction === 'left') {
            this.scaleX = -1;
        }

        this.setInteractive();
        this.on(CONSTANTS.POINTER_OVER, () => {
            this.play('on');
        });
        this.on(CONSTANTS.POINTER_OUT, () => {
            this.play('off');
        });
        this.on(CONSTANTS.POINTER_DOWN, callback) ;//scene.shiftArmyLeft);

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
}