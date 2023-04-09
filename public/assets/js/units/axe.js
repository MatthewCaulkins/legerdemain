class Axe extends Unit {
    constructor(config) {
        config.tintTexture = CONSTANTS.LANCE_TINT;
        config.characterTexture = CONSTANTS.LANCE;
        
        super(config);

        this.type = CONSTANTS.AXE;
        this.description = 'Attacks all adjacent tiles';
        this.health = 30;
        this.defense = .1;
        this.offense = 12;
        this.range = 1;
        this.movement = 3;
        this.dodge = .2;
        this.block = .2;
        this.cooldown = 1;

        // let animeConfig = {
        //     key: CONSTANTS.AXE_TOP_IDLE,
        //     frames: scene.anims.generateFrameNumbers(CONSTANTS.ORB, { start: 0, end: 0, first: 0 }),
        //     frameRate: 1,
        //     repeat: 0
        // };
        // scene.anims.create(animeConfig);
        // animeConfig = {
        //     key: CONSTANTS.AXE_RIGHT_IDLE,
        //     frames: scene.anims.generateFrameNumbers(CONSTANTS.ORB, { start: 1, end: 1, first: 1 }),
        //     frameRate: 1,
        //     repeat: 0
        // };
        // scene.anims.create(animeConfig);
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
        
        // TODO: TEMPORARY UNTIL I GET UNIQUE UNITS ART - later will use this to set the player's army tint
        super.setTint(CONSTANTS.BROWN_TINT);
    }
}