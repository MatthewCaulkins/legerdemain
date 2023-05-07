// GameObject Unit base class
class Unit extends Phaser.GameObjects.Container {
    constructor(config) { //}, motion, direction, distance) {
        // Create image game objects for this container
        const tint = config.scene.add.sprite(0, 0, config.tintTexture);
        const character = config.scene.add.sprite(0, 0, config.characterTexture);

        // const x = tile.x;
        // const y = tile.y;

        super(config.scene, 0, 0, [tint, character]);
        

        //this.scene.boardContainer.add(this.tint);
        //this.scene.boardContainer.add(this.character);
        this.playerId = config.playerId;

        if (this.scene.scene.key === CONSTANTS.HOME_SCENE) {

        } else {
            this.tint = tint;
            this.character = character;
            this.tile = config.tile;
            this.tintTexture = config.tintTexture;
            this.characterTexture = config.characterTexture;
            this.container = config.container;

            // Set the unit's container
            this.container.add(this);
            // this.container.add(this.tint);
            // this.container.add(this.character);

            // Set the depth to the same as the tile the unit is on
            // this.depth = this.tile.depth;
            // this.tint.setDepth(0);
            // this.character.setDepth(1);
            // this.tint.z = 0;
            // this.character.z = 1;

            // Set this units display size
            const width = character.displayWidth;
            const height = character.displayHeight;
            this.setSize(width, height);

            // Move this container to the tile it is on
            this.x = this.tile.x;
            this.y = this.tile.y;
            this.z = this.tile.z;
            this.tile.unit = this;

            // console.log('The dimensions of this container are ');
            // console.log(width);
            // console.log(height);
            // console.log('The position of this container is');
            // console.log(this.x);
            // console.log(this.y);
            // TODO: Change these to sprites eventually
            // this.startX = x;
            // this.startY = y;
            // this.distance = distance;

            // this.motion = motion;
            // this.anim = anims[motion];
            // this.direction = directions[direction];
            // this.speed = 0.15;
            // this.f = this.anim.startFrame;

            // Universal attributes used by sub-classes
            this.currentHealth;
            this.currentCooldown;
            this.currentDirection;
            
            this.description;
            this.health;
            this.defense;
            this.offense;
            this.range;
            this.movement;
            this.dodge;
            this.block;
            this.cooldown;
            this.unblockable = false;
            this.synchronous = true;


            this.active = false;

            // Add the healthbar for this unit
            this.healthBar = new HealthBar({
                scene: this.scene,
                width: 100,
                height: 10,
                x: 0,
                y: 0 - (.6 * height),
            });
            this.add(this.healthBar);

            // Add the block/dodge/dmg text
            this.actionResultsText = new ActionResultsText({
                scene: this.scene,
                textConfig: CONSTANTS.LIGHT_TEXT_STYLE,
                x: 0,
                y: 0 - (.5 * height),
            });
            this.add(this.actionResultsText);

            // Add directions
            
            // this.directions = new DirectionButtonContainer({
            //     scene: this.scene,
            //     unit: this,
            //     scale: .7
            // });
            // this.add(this.directions);
            // this.directions.setDepth(this.z);
        }
        
        // this.character.play()
        // this.depth = y + 64;

        // scene.time.delayedCall(this.anim.speed * 1000, this.changeFrame, [], this);
    }

    setActive(active, text = '') {
        this.active = active;
        this.showHealthbar(active);
        this.actionResultsText.setActive(active, text);
    }

    showHealthbar(visible) {
        this.healthBar.setVisible(visible);
    }

    // hideHealthbar() {
    //     this.healthBar.setVisible(false);
    // }

    // TODO: Set the tint for the player's army
    setTint(tint) {
        this.tint.setTint(tint);
    }

    resolveAction(value, action, turn, direction, text) {
        console.log('Resolve Action');
        console.log(value);
        console.log(action);
        console.log(turn);
        console.log(direction);
        console.log(text);

        switch (action) {
            case CONSTANTS.DAMAGE:
                if (turn && direction) {
                    this.setDirection(CONSTANTS.DIRECTION_OPPOSITES[direction]);
                }
                console.log('Current HP: ' + this.currentHealth);
                console.log('Damage: ' + value);
                this.currentHealth = (this.currentHealth - value) < 0 ? 0 : (this.currentHealth - value);

                console.log('Current HP: ' + this.currentHealth);

                this.healthBar.setPercent(this.currentHealth / this.health);
                this.setActive(true, text);
                break;
            case CONSTANTS.HEAL:
                this.currentHealth = (this.currentHealth + value) > this.health ? this.health : (this.currentHealth + value);
                this.healthBar.setPercent(this.currentHealth / this.health);
                this.setActive(true, text);
                break;
            case CONSTANTS.STOP:
                this.currentCooldown += 2;
                this.setActive(true, text);
                this.character.setTint(CONSTANTS.BLACK_TINT);
                break;
        }
    }

    setCooldown(both = false) {
        this.currentCooldown = both ? this.cooldown + 1 : this.cooldown;

        // TODO: make this the used sprite
        this.character.setTint(CONSTANTS.BLACK_TINT);
    }

    lowerCooldown() {
        if (this.currentCooldown > 0) {
            this.currentCooldown -= 1;
        }

        if (this.currentCooldown === 0) {
            
            // TODO: make this the used sprite
            this.character.clearTint();
        }
    }

    changeFrame ()
    {
        // this.f++;

        // var delay = this.anim.speed;

        // if (this.f === this.anim.endFrame)
        // {
        //     switch (this.motion)
        //     {
        //         case 'walk':
        //             this.f = this.anim.startFrame;
        //             this.frame = this.texture.get(this.direction.offset + this.f);
        //             scene.time.delayedCall(delay * 1000, this.changeFrame, [], this);
        //             break;

        //         case 'attack':
        //             delay = Math.random() * 2;
        //             scene.time.delayedCall(delay * 1000, this.resetAnimation, [], this);
        //             break;

        //         case 'idle':
        //             delay = 0.5 + Math.random();
        //             scene.time.delayedCall(delay * 1000, this.resetAnimation, [], this);
        //             break;

        //         case 'die':
        //             delay = 6 + Math.random() * 6;
        //             scene.time.delayedCall(delay * 1000, this.resetAnimation, [], this);
        //             break;
        //     }
        // }
        // else
        // {
        //     this.frame = this.texture.get(this.direction.offset + this.f);

        //     scene.time.delayedCall(delay * 1000, this.changeFrame, [], this);
        // }

    }

    setDirection(direction, save = true) {
        switch(direction) {
            case CONSTANTS.TOP:
                this.tint.play(this.topTintIdle);
                this.character.play(this.topIdle);                
                break;
            case CONSTANTS.RIGHT:
                this.tint.play(this.rightTintIdle);
                this.character.play(this.rightIdle);
                break;
            case CONSTANTS.BOTTOM:
                this.tint.play(this.bottomTintIdle);
                this.character.play(this.bottomIdle);                
                break;
            case CONSTANTS.LEFT:
                this.tint.play(this.leftTintIdle);
                this.character.play(this.leftIdle);
                break;
        }

        if (save) {
            this.currentDirection = direction;
        }
    }

    resetDirection() {
        this.setDirection(this.currentDirection);
    }

    resetAnimation ()
    {
        // this.f = this.anim.startFrame;

        // this.frame = this.texture.get(this.direction.offset + this.f);

        // scene.time.delayedCall(this.anim.speed * 1000, this.changeFrame, [], this);
    }

    update ()
    {
        // if (this.motion === 'walk')
        // {
        //     this.x += this.direction.x * this.speed;

        //     if (this.direction.y !== 0)
        //     {
        //         this.y += this.direction.y * this.speed;
        //         this.depth = this.y + 64;
        //     }

        //     //  Walked far enough?
        //     if (Phaser.Math.Distance.Between(this.startX, this.startY, this.x, this.y) >= this.distance)
        //     {
        //         this.direction = directions[this.direction.opposite];
        //         this.f = this.anim.startFrame;
        //         this.frame = this.texture.get(this.direction.offset + this.f);
        //         this.startX = this.x;
        //         this.startY = this.y;
        //     }
        // }
    }

    highlightTilesInActionRange(range, generatedBoard, unitsBoard) {
        const tile = this.tile;
        let questionedTile;
        tile.path = [];

        const tilesOfInterest = [tile];

        for (let i = 0; i < range; i++) {
            tilesOfInterest.forEach(tileOfInterest => {

                // console.log(tileOfInterest);

                // console.log(`Column ${tileOfInterest.column}  Row ${tileOfInterest.row}`)
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
                            questionedTile.path.push({direction: CONSTANTS.TOP, tileNum: questionedTile.number, unit: true}); //CONSTANTS.TOP); //tile: questionedTile, 
                            tilesOfInterest.push(questionedTile);
                        // } else {
                        //     console.log('tile included already');
                        }
                    // }
                }
                if (tileOfInterest.row + 1 < generatedBoard.mapRows) {
                    questionedTile = generatedBoard.board[tileOfInterest.row + 1][tileOfInterest.column]
                    // if (questionedTile.unit === null) {
                        if (!tilesOfInterest.includes(questionedTile)) {
                            tileOfInterest.path.forEach(path => {
                                questionedTile.path.push(path);
                            })
                            questionedTile.path.push({direction: CONSTANTS.RIGHT, tileNum: questionedTile.number, unit: true}); //CONSTANTS.RIGHT);
                            tilesOfInterest.push(questionedTile);
                        }
                    // }
                }
                if (tileOfInterest.column + 1 < generatedBoard.mapColumns) {
                    questionedTile = generatedBoard.board[tileOfInterest.row][tileOfInterest.column + 1]
                    // if (questionedTile.unit === null) {
                        if (!tilesOfInterest.includes(questionedTile)) {
                            tileOfInterest.path.forEach(path => {
                                questionedTile.path.push(path);
                            })
                            questionedTile.path.push({direction: CONSTANTS.BOTTOM, tileNum: questionedTile.number, unit: true}); // CONSTANTS.DOWN);
                            tilesOfInterest.push(questionedTile);
                        }
                    // }
                }
                if (tileOfInterest.row - 1 >= 0) {
                    questionedTile = generatedBoard.board[tileOfInterest.row - 1][tileOfInterest.column]
                    // if (questionedTile.unit === null) {
                        if (!tilesOfInterest.includes(questionedTile)) {
                            tileOfInterest.path.forEach(path => {
                                questionedTile.path.push(path);
                            })
                            questionedTile.path.push({direction: CONSTANTS.LEFT, tileNum: questionedTile.number, unit: true}); // CONSTANTS.LEFT);
                            tilesOfInterest.push(questionedTile);
                        }
                    // }
                }
            });
        }

        return tilesOfInterest;
    }
}
