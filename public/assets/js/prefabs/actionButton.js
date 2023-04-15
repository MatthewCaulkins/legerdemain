class ActionButton extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, config.x, config.y);
        this.playerNum = config.playerNum;

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
        this.sprite.on(CONSTANTS.POINTER_OVER, () => {
            // If this is players turn
                // If this is currently selected
            // If this action has been taken
            // else
            if (!this.activated) {
                this.sprite.play(this.hoverKey);
            } else {
                this.sprite.play(this.activeKey);
            }
        });
        this.sprite.on(CONSTANTS.POINTER_OUT, () => {
            // If this is players turn
                // If this is currently selected
            // If this action has been taken
            // Else
            if (!this.activated) {
                this.sprite.play(this.onKey);
            } else {
                this.sprite.play(this.activeKey);
            }
        });
        this.sprite.on(CONSTANTS.POINTER_DOWN, () => {
            if (this.scene.playerAction != this.phase) {
                this.activated = true;
                this.scene.playerAction = this.phase;
                this.sprite.play(this.activeKey);
            } else {
                this.activated = false;
                this.scene.playerAction = null;
                this.sprite.play(this.hoverKey);
            }
            // If this is players turn
                // If already selected
                // If another is selected
            // If this action has been taken
            // else
            this.sprite.play(this.activeKey);
        });
        // this.sprite.on(CONSTANTS.POINTER_UP, () => {
        //     // If this is players turn
        //         // If this is currently selected
        //     // If this action has been taken
        //     // else
        //     this.sprite.play(this.onKey);
        // });
        this.reset();
    }

    reset() {
        if (this.scene.playerTurn = this.playerNum) {
            this.sprite.play(this.onKey);
        } else {
            this.sprite.play(this.offKey);
        }
    }
}