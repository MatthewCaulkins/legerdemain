class Bow extends Unit {
    constructor(config) {
        config.tintTexture = CONSTANTS.LANCE_TINT;
        config.characterTexture = CONSTANTS.LANCE;
        
        super(config);

        this.type = CONSTANTS.BOW;
        this.description = 'Long range and shoots over units';
        this.health = 25;
        this.defense = .05;
        this.offense = 15;
        this.range = 6;
        this.movement = 3;
        this.dodge = .2;
        this.block = .1;
        this.cooldown = 2;
        this.action = CONSTANTS.DAMAGE;
        
        this.actionSound = CONSTANTS.BOWSTRING;
        
        this.currentHealth = this.health;
        this.currentCooldown = 0;
        
        // Frame keys
        // Frame keys
        this.topIdle = CONSTANTS.LANCE_TOP_IDLE;
        this.rightIdle = CONSTANTS.LANCE_RIGHT_IDLE;
        this.bottomIdle = CONSTANTS.LANCE_BOTTOM_IDLE;
        this.leftIdle = CONSTANTS.LANCE_LEFT_IDLE;

        this.topTintIdle = CONSTANTS.LANCE_TINT_RIGHT_IDLE;
        this.rightTintIdle = CONSTANTS.LANCE_TINT_TOP_IDLE;
        this.bottomTintIdle = CONSTANTS.LANCE_TINT_BOTTOM_IDLE;
        this.leftTintIdle = CONSTANTS.LANCE_TINT_LEFT_IDLE;

        let animeConfig = {
            key: this.topIdle,
            frames: this.scene.anims.generateFrameNumbers(CONSTANTS.LANCE, { start: 0, end: 0, first: 0 }),
            frameRate: 1,
            repeat: 0
        };
        this.scene.anims.create(animeConfig);
        animeConfig = {
            key: this.rightIdle,
            frames: this.scene.anims.generateFrameNumbers(CONSTANTS.LANCE, { start: 1, end: 1, first: 1 }),
            frameRate: 1,
            repeat: 0
        };
        this.scene.anims.create(animeConfig);
        animeConfig = {
            key: this.bottomIdle,
            frames: this.scene.anims.generateFrameNumbers(CONSTANTS.LANCE, { start: 2, end: 2, first: 2 }),
            frameRate: 1,
            repeat: 0
        };
        this.scene.anims.create(animeConfig);
        animeConfig = {
            key: this.leftIdle,
            frames: this.scene.anims.generateFrameNumbers(CONSTANTS.LANCE, { start: 3, end: 3, first: 3 }),
            frameRate: 1,
            repeat: 0
        };
        this.scene.anims.create(animeConfig);
        animeConfig = {
            key: this.topTintIdle,
            frames: this.scene.anims.generateFrameNumbers(CONSTANTS.LANCE_TINT, { start: 0, end: 0, first: 0 }),
            frameRate: 1,
            repeat: 0
        };
        this.scene.anims.create(animeConfig);
        animeConfig = {
            key: this.rightTintIdle,
            frames: this.scene.anims.generateFrameNumbers(CONSTANTS.LANCE_TINT, { start: 1, end: 1, first: 1 }),
            frameRate: 1,
            repeat: 0
        };
        this.scene.anims.create(animeConfig);
        animeConfig = {
            key: this.bottomTintIdle,
            frames: this.scene.anims.generateFrameNumbers(CONSTANTS.LANCE_TINT, { start: 2, end: 2, first: 2 }),
            frameRate: 1,
            repeat: 0
        };
        this.scene.anims.create(animeConfig);
        animeConfig = {
            key: this.leftTintIdle,
            frames: this.scene.anims.generateFrameNumbers(CONSTANTS.LANCE_TINT, { start: 3, end: 3, first: 3 }),
            frameRate: 1,
            repeat: 0
        };
        this.scene.anims.create(animeConfig);
        // TODO: TEMPORARY UNTIL I GET UNIQUE UNITS ART - later will use this to set the player's army tint
        super.setTint(CONSTANTS.TEAL_TINT);
        super.setDirection(config.direction);
    }
}