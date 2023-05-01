class ActionButton extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, config.x, config.y);
        // this.playerSide = config.playerSide;

        this.activated = false;
        this.used = false;

        this.phase = config.phase;
        this.onKey = config.onKey;
        this.hoverKey = config.hoverKey;
        this.activeKey = config.activeKey;
        this.offKey = config.offKey;

        let spriteConfig = {
            key: this.onKey,
            frames: config.scene.anims.generateFrameNumbers(config.key, { start: 0, end: 0, first: 0 }),
            frameRate: 1,
            repeat: 0
        };
        config.scene.anims.create(spriteConfig);
        spriteConfig = {
            key: this.hoverKey,
            frames: config.scene.anims.generateFrameNumbers(config.key, { start: 1, end: 1, first: 1 }),
            frameRate: 1,
            repeat: 0
        };
        config.scene.anims.create(spriteConfig);
        spriteConfig = {
            key: this.activeKey,
            frames: config.scene.anims.generateFrameNumbers(config.key, { start: 2, end: 2, first: 2 }),
            frameRate: 1,
            repeat: 0
        };
        config.scene.anims.create(spriteConfig);
        spriteConfig = {
            key: this.offKey,
            frames: config.scene.anims.generateFrameNumbers(config.key, { start: 3, end: 3, first: 3 }),
            frameRate: 1,
            repeat: 0
        };
        config.scene.anims.create(spriteConfig);

        this.sprite = config.scene.add.sprite(0, 0, config.key);
        this.add(this.sprite);

        this.text = config.scene.add.text(0, 55, config.text, config.textConfig);
        this.text.setOrigin(.5, .5);
        this.add(this.text);

        
        // this.setSize( ,);
        config.scene.add.existing(this);

        // Make the tile interactive and oriented
        this.sprite.setInteractive();
        this.sprite.on(CONSTANTS.POINTER_OVER, this.pointerOver, this);
        this.sprite.on(CONSTANTS.POINTER_OUT, this.pointerOut, this);
        this.sprite.on(CONSTANTS.POINTER_DOWN, this.pointerDown, this);
        this.reset();
    }

    pointerOver() {
        if (this.scene.playerTurn != this.scene.playerSide) return;
        if (this.used) return;
        if (this.scene.playerAction === CONSTANTS.MID_ACTION) return;

        // If this is players turn
            // If this is currently selected
        // If this action has been taken
        // else
        if (!this.activated) {
            this.sprite.play(this.hoverKey);
        } else {
            this.sprite.play(this.activeKey);
        }
    }

    pointerOut() {
        if (this.scene.playerTurn != this.scene.playerSide) return;
        if (this.used) return;
        if (this.scene.playerAction === CONSTANTS.MID_ACTION) return;

        // If this is players turn
            // If this is currently selected
        // If this action has been taken
        // Else
        if (this.scene.activeActionButton != this) {
            this.sprite.play(this.onKey);
        } else {
            this.sprite.play(this.activeKey);
        }
    }

    pointerDown() {
        if (this.scene.playerTurn != this.scene.playerSide) return;
        if (this.used) return;
        if (this.scene.playerAction === CONSTANTS.MID_ACTION) return;

        console.log(this.scene);
        console.log(this.phase);

        if (this.scene.activeActionButton != this) {
            this.sprite.play(this.activeKey);
            this.activated = true;
            this.scene.playerAction = this.phase;

            if (this.scene.turnUnit) {
                console.log(this.scene.turnUnit);
                this.scene.directions.setVisible(false);
                this.scene.turnUnit.resetDirection();
            }
            this.scene.clearPaths(false);

            // Clear last active button
            if (this.scene.activeActionButton) {
                this.scene.activeActionButton.activated = false;
                console.log(this.scene.activeActionButton);
                this.scene.activeActionButton.sprite.play(this.scene.activeActionButton.onKey);

                // Clear all highlights and such

                // if (this.scene.selectedFromTile || this.scene.turnUnit) {
                //     const tile = this.scene.turnUnit ? this.scene.turnUnit.tile : this.scene.selectedFromTile;

                //     this.scene.turnUnit = tile.unit;

                //     if (this.phase === CONSTANTS.ACTION_ACTION) {
                //         this.scene.highlightTilesInActionRange(tile)
                //     } else if (this.phase === CONSTANTS.DIRECTION_ACTION) {

                //     } else if (this.phase === CONSTANTS.MOVEMENT_ACTION) {
                //         this.scene.highlightTilesInMovementRange(tile);
                //     }
                // }
            }

            // if (this.scene.turnUnit) { // this.scene.selectedFromTile || 
            //     const tile = this.scene.turnUnit.tile;// ? this.scene.turnUnit.tile : this.scene.selectedFromTile;

            //     this.scene.turnUnit = tile.unit;
            //     this.scene.turnUnit.resetDirection();
            //     this.scene.positionDirections(this.scene.turnUnit);
            if (this.phase === CONSTANTS.WAIT_ACTION) {
                let fullCooldown = false;
                if (this.scene.actionButtonContainer.movementButton.used && this.scene.actionButtonContainer.actionButton.used) {
                    fullCooldown = true;
                }
                emitter.emit(CONSTANTS.END_TURN, {roomID: controller.gameRoom.roomID, fullCooldown: fullCooldown});
            } else {
                if (this.scene.turnUnit) { // this.scene.selectedFromTile || 
                    const tile = this.scene.turnUnit.tile;// ? this.scene.turnUnit.tile : this.scene.selectedFromTile;
    
                    this.scene.turnUnit = tile.unit;
                    this.scene.turnUnit.resetDirection();
                    this.scene.positionDirections(this.scene.turnUnit);

                    if (this.phase === CONSTANTS.ACTION_ACTION) {
                        this.scene.highlightTilesInActionRange(tile)
                    } else if (this.phase === CONSTANTS.DIRECTION_ACTION) {
                        this.scene.directions.setVisible(true);
                    } else if (this.phase === CONSTANTS.MOVEMENT_ACTION) {
                        this.scene.highlightTilesInMovementRange(tile);
                    } 
                }

            // }
            }

            this.scene.activeActionButton = this;
        } else {
            if (this.scene.turnUnit) {
                console.log(this.scene.turnUnit);
                this.scene.directions.setVisible(false);
                this.scene.turnUnit.resetDirection();
            }
            
            this.scene.playerAction = CONSTANTS.SELECTION_ACTION;
            this.activated = false;
            this.sprite.play(this.hoverKey);
            this.scene.activeActionButton = null;

            this.scene.clearPaths(false);
        }
        
        console.log(this.scene.playerAction);
    }

    setActive() {
        this.scene.activeActionButton = this;
        this.sprite.play(this.activeKey);
        this.activated = true;
        this.scene.playerAction = this.phase;
    }

    setUsed() {
        this.scene.activeActionButton = null;
        this.sprite.play(this.offKey);
        this.activated = false;
        this.used = true;
    }

    reset() {
        console.log(this.scene.playerTurn);
        console.log(this.scene.playerSide);
        if (this.scene.playerTurn === this.scene.playerSide) {
            this.activated = false;
            this.used = false;
            this.sprite.play(this.onKey);
        } else {
            this.activated = true;
            this.used = true;
            this.sprite.play(this.offKey);
        }
    }
}