class Button extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);
        this.fired = false;

        this.invalidateFired = config.invalidateFired != null ? config.invalidateFired : true;

        // this.config = config;
        //this.scene = config.scene;
        this.event = config.event;
        this.params = config.params

        this.sprite = this.scene.add.sprite(0, 0, config.texture);
        this.add(this.sprite);

        this.texture = config.texture;
        this.defaultKey = config.defaultKey;
        this.hoverKey = config.hoverKey;
        this.downKey = config.downKey;

        let animeConfig = {
            key: this.defaultKey,
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 0, end: 0, first: 0 }),
            frameRate: 1,
            repeat: 0
        };
        this.scene.anims.create(animeConfig);
        animeConfig = {
            key: this.hoverKey,
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 1, end: 1, first: 1 }),
            frameRate: 1,
            repeat: 0
        };
        this.scene.anims.create(animeConfig);
        animeConfig = {
            key: this.downKey,
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 2, end: 2, first: 2 }),
            frameRate: 1,
            repeat: 0
        };
        this.scene.anims.create(animeConfig);

        // if (config.text) {
        //     this.text = config.text;
        //     this.textConfig = config.textConfig;
        //     this.textConfig.wordWrap = {width: this.sprite.displayWidth - 10};

        //     this.text = this.scene.add.text(0, 0, this.text, this.textConfig);
        //     this.text.setOrigin(.5, .5);
        //     this.add(this.text);
        // }

        this.setSize(this.sprite.displayWidth, this.sprite.displayHeight);
        this.scene.add.existing(this);

        if (config.x) {
            this.x = config.x;
        }
        if (config.y) {
            this.y = config.y;
        }
        if (config.index) {
            config.alignmentGrid.positionItemAtIndex(config.index, this);
        }

        if(this.event) {
            this.sprite.setInteractive();
            this.sprite.on(CONSTANTS.POINTER_UP, this.onPointerup, this);
            this.sprite.on(CONSTANTS.POINTER_DOWN, this.onPointerdown, this);
            this.sprite.on(CONSTANTS.POINTER_OVER, this.onPointerover, this);    
            this.sprite.on(CONSTANTS.POINTER_OUT, this.onPointerout, this);
        }

        this.sprite.play(this.defaultKey);
    }

    onPointerup() {
        this.sprite.play(this.defaultKey);
    }

    onPointerdown() {
        if (!this.fired) {
            this.sprite.play(this.downKey);
            model.currentScene.sound.play(CONSTANTS.BUTTON_SOUND);
            if (this.params) {
                emitter.emit(this.event, this.params);
            } else {
                emitter.emit(this.event);
            }

            if (this.invalidateFired) {
                this.fired = true;
            }
        }
    }

    onPointerover() {
        this.sprite.play(this.hoverKey);
        // this.sprite.setTint(CONSTANTS.GREEN_TINT);
    }

    onPointerout() {
        this.sprite.play(this.defaultKey);
        // this.sprite.clearTint();
        this.fired = false;
    }

    remove() {
        emitter.removeListener(this.event);
        this.destroy();
    }
}