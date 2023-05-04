class Sorcery extends Unit {
    constructor(config) {
        config.tintTexture = CONSTANTS.LANCE_TINT;
        config.characterTexture = CONSTANTS.LANCE;
        
        super(config);

        this.type = CONSTANTS.SORCERY;
        this.description = 'Line of sight attack with radius 1';
        this.health = 20;
        this.defense = 0;
        this.offense = 15;
        this.range = 5;
        this.movement = 3;
        this.dodge = .1;
        this.block = .1;
        this.cooldown = 3;
        this.action = CONSTANTS.DAMAGE;
        
        this.currentHealth = this.health;
        this.currentCooldown = 0;
        this.unblockable = true;
        
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
        super.setTint(CONSTANTS.PURPLE_TINT);
        super.setDirection(config.direction);
    }

    highlightTilesInActionRange(range, generatedBoard, unitsBoard) { 
        let tilesOfInterest = super.highlightTilesInActionRange(range, generatedBoard, unitsBoard);

        tilesOfInterest = this.getAttachedTiles(tilesOfInterest, generatedBoard);

        console.log(tilesOfInterest);
        return tilesOfInterest;
    }

    getAttachedTiles(tilesOfInterest, generatedBoard) {
        let questionedTile;
        console.log(tilesOfInterest);

        tilesOfInterest.forEach(tileOfInterest => {
                    if (tileOfInterest.column - 1 >= 0) {
                        questionedTile = generatedBoard.board[tileOfInterest.row][tileOfInterest.column - 1];
                        
                        if (!tileOfInterest.attachedTiles.includes(questionedTile)) {
                            tileOfInterest.attachedTiles.push(questionedTile);
                        }
                    }
                    if (tileOfInterest.row + 1 < generatedBoard.mapRows) {
                        questionedTile = generatedBoard.board[tileOfInterest.row + 1][tileOfInterest.column]
                        
                        if (!tileOfInterest.attachedTiles.includes(questionedTile)) {
                            
                            tileOfInterest.attachedTiles.push(questionedTile);
                        }
                    }
                    if (tileOfInterest.column + 1 < generatedBoard.mapColumns) {
                        questionedTile = generatedBoard.board[tileOfInterest.row][tileOfInterest.column + 1]
                        
                        if (!tileOfInterest.attachedTiles.includes(questionedTile)) {
                            tileOfInterest.attachedTiles.push(questionedTile);
                        }
                    }
                    if (tileOfInterest.row - 1 >= 0) {
                        questionedTile = generatedBoard.board[tileOfInterest.row - 1][tileOfInterest.column]
                       
                        if (!tileOfInterest.attachedTiles.includes(questionedTile)) {
                            tileOfInterest.attachedTiles.push(questionedTile);
                        }
                    }
                });
        return tilesOfInterest;
    }
}