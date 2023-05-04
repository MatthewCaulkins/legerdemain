class Healing extends Unit {
    constructor(config) {
        config.tintTexture = CONSTANTS.LANCE_TINT;
        config.characterTexture = CONSTANTS.LANCE;
        
        super(config);

        this.type = CONSTANTS.HEALING;
        this.description = 'Heals all units in a 3 tile radius of target tile';
        this.health = 18;
        this.defense = 0;
        this.offense = 15;
        this.range = 5;
        this.movement = 3;
        this.dodge = .15;
        this.block = 0;
        this.cooldown = 4;
        this.action = CONSTANTS.HEAL;
        this.area = 3;
        
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
        super.setTint(CONSTANTS.YELLOW_TINT);
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
            const attachedTiles = [tileOfInterest];

            for (let i = 0; i < this.area; i++) {
                attachedTiles.forEach(attachedTile => {
                    // console.log(tileOfInterest);

                    // console.log(`Column ${tileOfInterest.column}  Row ${tileOfInterest.row}`)
                    if (attachedTile.column - 1 >= 0) {
                        questionedTile = generatedBoard.board[attachedTile.row][attachedTile.column - 1];

                        // console.log(questionedTile);

                        // Will have to take into account friendly units in the Play Scene
                        // if (questionedTile.unit === null) {
                            if (!attachedTiles.includes(questionedTile)) {
                                // console.log(tileOfInterest.path);
                                // tileOfInterest.path.forEach(path => {
                                //     questionedTile.path.push(path);
                                // });
                                // questionedTile.path.push({direction: CONSTANTS.TOP, tileNum: questionedTile.number, unit: true}); //CONSTANTS.TOP); //tile: questionedTile, 
                                attachedTiles.push(questionedTile);
                            // } else {
                            //     console.log('tile included already');
                            }
                        // }
                    }
                    if (attachedTile.row + 1 < generatedBoard.mapRows) {
                        questionedTile = generatedBoard.board[attachedTile.row + 1][attachedTile.column]
                        // if (questionedTile.unit === null) {
                            // if (!tilesOfInterest.includes(questionedTile)) {
                            //     tileOfInterest.path.forEach(path => {
                            //         questionedTile.path.push(path);
                            //     })
                            //     questionedTile.path.push({direction: CONSTANTS.RIGHT, tileNum: questionedTile.number, unit: true}); //CONSTANTS.RIGHT);
                            //     tilesOfInterest.push(questionedTile);
                            // }
                            if (!attachedTiles.includes(questionedTile)) {
                                // console.log(tileOfInterest.path);
                                // tileOfInterest.path.forEach(path => {
                                //     questionedTile.path.push(path);
                                // });
                                // questionedTile.path.push({direction: CONSTANTS.TOP, tileNum: questionedTile.number, unit: true}); //CONSTANTS.TOP); //tile: questionedTile, 
                                attachedTiles.push(questionedTile);
                            // } else {
                            //     console.log('tile included already');
                            }
                        // }
                    }
                    if (attachedTile.column + 1 < generatedBoard.mapColumns) {
                        questionedTile = generatedBoard.board[attachedTile.row][attachedTile.column + 1]
                        // if (questionedTile.unit === null) {
                            // if (!tilesOfInterest.includes(questionedTile)) {
                            //     tileOfInterest.path.forEach(path => {
                            //         questionedTile.path.push(path);
                            //     })
                            //     questionedTile.path.push({direction: CONSTANTS.BOTTOM, tileNum: questionedTile.number, unit: true}); // CONSTANTS.DOWN);
                            //     tilesOfInterest.push(questionedTile);
                            // }
                            if (!attachedTiles.includes(questionedTile)) {
                                // console.log(tileOfInterest.path);
                                // tileOfInterest.path.forEach(path => {
                                //     questionedTile.path.push(path);
                                // });
                                // questionedTile.path.push({direction: CONSTANTS.TOP, tileNum: questionedTile.number, unit: true}); //CONSTANTS.TOP); //tile: questionedTile, 
                                attachedTiles.push(questionedTile);
                            // } else {
                            //     console.log('tile included already');
                            }
                        // }
                    }
                    if (attachedTile.row - 1 >= 0) {
                        questionedTile = generatedBoard.board[attachedTile.row - 1][attachedTile.column]
                        // if (questionedTile.unit === null) {
                            // if (!tilesOfInterest.includes(questionedTile)) {
                            //     tileOfInterest.path.forEach(path => {
                            //         questionedTile.path.push(path);
                            //     })
                            //     questionedTile.path.push({direction: CONSTANTS.LEFT, tileNum: questionedTile.number, unit: true}); // CONSTANTS.LEFT);
                            //     tilesOfInterest.push(questionedTile);
                            // }
                            if (!attachedTiles.includes(questionedTile)) {
                                // console.log(tileOfInterest.path);
                                // tileOfInterest.path.forEach(path => {
                                //     questionedTile.path.push(path);
                                // });
                                // questionedTile.path.push({direction: CONSTANTS.TOP, tileNum: questionedTile.number, unit: true}); //CONSTANTS.TOP); //tile: questionedTile, 
                                attachedTiles.push(questionedTile);
                            // } else {
                            //     console.log('tile included already');
                            }
                        // }
                    }
                });

                tileOfInterest.attachedTiles = attachedTiles;
            }
        });

        return tilesOfInterest;
    }
}