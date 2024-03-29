class Sword extends Unit {
    constructor(config) {
        config.tintTexture = CONSTANTS.LANCE_TINT;
        config.characterTexture = CONSTANTS.LANCE;
    
        super(config);

        this.type = CONSTANTS.SWORD;
        this.description = 'Line dash attack to first unit within 2 tiles';
        this.health = 30;
        this.defense = .05;
        this.offense = 18;
        this.range = 1;
        this.movement = 4;
        this.dodge = .25;
        this.block = .25;
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
        // TODO: TEMPORARY UNTIL I GET UNIQUE UNITS ART - later will use this to set the player's army tint
        super.setTint(CONSTANTS.GREEN_TINT);
        super.setDirection(config.direction);
    }

    highlightTilesInActionRange(range, generatedBoard, unitsBoard) {
        const tile = this.tile;
        let questionedTile;
        let dashTileNum;
        tile.path = [];

        const tilesOfInterest = [tile];

        for (let i = 0; i < 2; i++) {
            tilesOfInterest.forEach(tileOfInterest => {

                // console.log(tileOfInterest);

                // console.log(`Column ${tileOfInterest.column}  Row ${tileOfInterest.row}`)
                if (tileOfInterest.path.length === 0 || (tileOfInterest.path[0].direction === CONSTANTS.TOP && tileOfInterest.path[0].unit === null)) {
                    if (tileOfInterest.column - 1 >= 0) {
                        questionedTile = generatedBoard.board[tileOfInterest.row][tileOfInterest.column - 1];

                        // console.log(questionedTile);

                        // Will have to take into account friendly units in the Play Scene
                        // if (questionedTile.unit === null) {
                            if (!tilesOfInterest.includes(questionedTile)) {
                                // console.log(tileOfInterest.path);
                                tileOfInterest.path.forEach(path => {
                                    questionedTile.path.push(path);
                                });
                                
                                // dashTileNum = questionedTile.path[questionedTile.path.length - 1] && questionedTile.path[questionedTile.path.length - 1].tileNum != this.number ? questionedTile.path[questionedTile.path.length - 1].tileNum : null;
                                questionedTile.path.push({direction: CONSTANTS.TOP, tileNum: questionedTile.number, unit: questionedTile.unit}); //, dashTileNum: dashTileNum   CONSTANTS.TOP); //tile: questionedTile, 
                                tilesOfInterest.push(questionedTile);
                            // } else {
                            //     console.log('tile included already');
                            }
                        // }
                    }
                }
                
                if (tileOfInterest.path.length === 0 || (tileOfInterest.path[0].direction === CONSTANTS.RIGHT && tileOfInterest.path[0].unit === null)) {
                    if (tileOfInterest.row + 1 < generatedBoard.mapRows) {
                        questionedTile = generatedBoard.board[tileOfInterest.row + 1][tileOfInterest.column]
                        // if (questionedTile.unit === null) {
                            if (!tilesOfInterest.includes(questionedTile)) {
                                tileOfInterest.path.forEach(path => {
                                    questionedTile.path.push(path);
                                })

                                questionedTile.path.push({direction: CONSTANTS.RIGHT, tileNum: questionedTile.number, unit: questionedTile.unit}); //CONSTANTS.RIGHT);
                                tilesOfInterest.push(questionedTile);
                            }
                        // }
                    }
                }

                if (tileOfInterest.path.length === 0 || (tileOfInterest.path[0].direction === CONSTANTS.BOTTOM && tileOfInterest.path[0].unit === null)) {
                    if (tileOfInterest.column + 1 < generatedBoard.mapColumns) {
                        questionedTile = generatedBoard.board[tileOfInterest.row][tileOfInterest.column + 1]
                        // if (questionedTile.unit === null) {
                            if (!tilesOfInterest.includes(questionedTile)) {
                                tileOfInterest.path.forEach(path => {
                                    questionedTile.path.push(path);
                                })

                                questionedTile.path.push({direction: CONSTANTS.BOTTOM, tileNum: questionedTile.number, unit: questionedTile.unit}); // CONSTANTS.DOWN);
                                tilesOfInterest.push(questionedTile);
                            }
                        // }
                    }
                }
                
                if (tileOfInterest.path.length === 0 || (tileOfInterest.path[0].direction === CONSTANTS.LEFT && tileOfInterest.path[0].unit === null)) {
                    if (tileOfInterest.row - 1 >= 0) {
                        questionedTile = generatedBoard.board[tileOfInterest.row - 1][tileOfInterest.column]
                        // if (questionedTile.unit === null) {
                            if (!tilesOfInterest.includes(questionedTile)) {
                                tileOfInterest.path.forEach(path => {
                                    questionedTile.path.push(path);
                                })

                                questionedTile.path.push({direction: CONSTANTS.LEFT, tileNum: questionedTile.number, unit: questionedTile.unit}); // CONSTANTS.LEFT);
                                tilesOfInterest.push(questionedTile);
                            }
                        // }
                    }
                }
            });
        }

        return tilesOfInterest;
    }
}