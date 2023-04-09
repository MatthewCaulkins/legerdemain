class Lance extends Unit {
    constructor(config) {
        config.tintTexture = CONSTANTS.LANCE_TINT;
        config.characterTexture = CONSTANTS.LANCE;

        super(config);

        this.type = CONSTANTS.LANCE;
        this.description = 'Can attack 2 spaces away; if a straight line, hits both';
        this.health = 30;
        this.defense = .1;
        this.offense = 15;
        this.range = 2;
        this.movement = 3;
        this.dodge = .15;
        this.block = .35;
        this.cooldown = 1;

        let animeConfig = {
            key: CONSTANTS.LANCE_RIGHT_IDLE,
            frames: this.scene.anims.generateFrameNumbers(CONSTANTS.LANCE, { start: 0, end: 0, first: 0 }),
            frameRate: 1,
            repeat: 0
        };
        this.scene.anims.create(animeConfig);
        animeConfig = {
            key: CONSTANTS.LANCE_TOP_IDLE,
            frames: this.scene.anims.generateFrameNumbers(CONSTANTS.LANCE, { start: 1, end: 1, first: 1 }),
            frameRate: 1,
            repeat: 0
        };
        this.scene.anims.create(animeConfig);
        // animeConfig = {
        //     key: CONSTANTS.AXE_DOWN_IDLE,
        //     frames: scene.anims.generateFrameNumbers(CONSTANTS.ORB, { start: 2, end: 2, first: 2 }),
        //     frameRate: 1,
        //     repeat: 0
        // };
        // scene.anims.create(animeConfig);
        // animeConfig = {
        //     key: CONSTANTS.AXE_LEFT_IDLE,
        //     frames: scene.anims.generateFrameNumbers(CONSTANTS.ORB, { start: 3, end: 3, first: 3 }),
        //     frameRate: 1,
        //     repeat: 0
        // };
        // scene.anims.create(animeConfig);
        animeConfig = {
            key: CONSTANTS.LANCE_TINT_RIGHT_IDLE,
            frames: this.scene.anims.generateFrameNumbers(CONSTANTS.LANCE_TINT, { start: 0, end: 0, first: 0 }),
            frameRate: 1,
            repeat: 0
        };
        this.scene.anims.create(animeConfig);
        animeConfig = {
            key: CONSTANTS.LANCE_TINT_TOP_IDLE,
            frames: this.scene.anims.generateFrameNumbers(CONSTANTS.LANCE_TINT, { start: 1, end: 1, first: 1 }),
            frameRate: 1,
            repeat: 0
        };
        this.scene.anims.create(animeConfig);


        // TODO: TEMPORARY UNTIL I GET UNIQUE UNITS ART - later will use this to set the player's army tint
        super.setTint(CONSTANTS.RED_TINT);
    }

    rotateCharacter() {

    }
}