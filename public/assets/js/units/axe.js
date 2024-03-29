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
        this.action = CONSTANTS.DAMAGE;

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
        super.setDirection(config.direction);
    }

    highlightTilesInActionRange(range, generatedBoard, unitsBoard) {
        const tilesOfInterest = super.highlightTilesInActionRange(range, generatedBoard, unitsBoard);

        tilesOfInterest.forEach(tile => {
            tilesOfInterest.forEach(secondaryTile => {
                if (secondaryTile != tile && tile != this.tile && secondaryTile != this.tile) {
                    tile.attachedTiles.push(secondaryTile);
                }
            });
        });

        return tilesOfInterest;
    }
}