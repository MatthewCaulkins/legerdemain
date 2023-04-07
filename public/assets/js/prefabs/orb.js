class Orb extends Phaser.GameObjects.Sprite {
    constructor(scene, armyNum) {
        super(scene, 0, 0, CONSTANTS.ORB);
        this.armyNum = armyNum;

        let animeConfig = {
            key: 'empty',
            frames: scene.anims.generateFrameNumbers(CONSTANTS.ORB, { start: 0, end: 0, first: 0 }),
            frameRate: 1,
            repeat: 0
        };
        scene.anims.create(animeConfig);
        animeConfig = {
            key: 'filled',
            frames: scene.anims.generateFrameNumbers(CONSTANTS.ORB, { start: 1, end: 1, first: 1 }),
            frameRate: 1,
            repeat: 0
        };
        scene.anims.create(animeConfig);
        animeConfig = {
            key: 'active',
            frames: scene.anims.generateFrameNumbers(CONSTANTS.ORB, { start: 2, end: 2, first: 2 }),
            frameRate: 1,
            repeat: 0
        };
        scene.anims.create(animeConfig);

        scene.add.existing(this);
        this.play('empty');
    }

    setActive(armyNum) {
        if (this.armyNum != armyNum) {
            this.play('empty');
        } else {
            this.play('active');
        }
    }
}