class Orb extends Phaser.GameObjects.Sprite {
    constructor(scene, armyNum) {
        super(scene, 0, 0, CONSTANTS.ORB);
        this.armyNum = armyNum;

        let animeConfig = {
            key: CONSTANTS.EMPTY,
            frames: scene.anims.generateFrameNumbers(CONSTANTS.ORB, { start: 0, end: 0, first: 0 }),
            frameRate: 1,
            repeat: 0
        };
        scene.anims.create(animeConfig);
        animeConfig = {
            key: CONSTANTS.FILLED,
            frames: scene.anims.generateFrameNumbers(CONSTANTS.ORB, { start: 1, end: 1, first: 1 }),
            frameRate: 1,
            repeat: 0
        };
        scene.anims.create(animeConfig);
        animeConfig = {
            key: CONSTANTS.ACTIVE,
            frames: scene.anims.generateFrameNumbers(CONSTANTS.ORB, { start: 2, end: 2, first: 2 }),
            frameRate: 1,
            repeat: 0
        };
        scene.anims.create(animeConfig);

        scene.add.existing(this);
        this.play(CONSTANTS.EMPTY);
    }

    setActive(armyNum) {
        if (this.armyNum != armyNum) {
            const army = game.player.armies.find(army => {
                if (army) {
                    return army.armyId === this.armyNum;
                }
            });
            if (army && army.units.length > 0) {
                this.play(CONSTANTS.FILLED);
            } else {
                this.play(CONSTANTS.EMPTY);
            }
        } else {
            this.play(CONSTANTS.ACTIVE);
        }
    }
}