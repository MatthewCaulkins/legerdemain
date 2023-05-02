class Button extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);
        this.fired = false;

        // this.config = config;
        //this.scene = config.scene;
        this.event = config.event;
        this.params = config.params

        this.image = this.scene.add.image(0, 0, config.key);
        this.add(this.image);


        if (config.text) {
            this.text = config.text;
            this.textConfig = config.textConfig;
            this.textConfig.wordWrap = {width: this.image.displayWidth - 10};

            this.text = this.scene.add.text(0, 0, this.text, this.textConfig);
            this.text.setOrigin(.5, .5);
            this.add(this.text);
        }

        this.setSize(this.image.displayWidth, this.image.displayHeight);
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
            this.image.setInteractive();
            this.image.on(CONSTANTS.POINTER_DOWN, this.onPointerdown, this);
            this.image.on(CONSTANTS.POINTER_OVER, this.onPointerover, this);    
            this.image.on(CONSTANTS.POINTER_OUT, this.onPointerout, this);
        }
    }

    onPointerdown() {
        if (!this.fired) {
            if (this.params) {
                emitter.emit(this.event, this.params);
            } else {
                emitter.emit(this.event);
            }
            this.fired = true;
        }
    }

    onPointerover() {
        this.image.setTint(CONSTANTS.GREEN_TINT);
    }

    onPointerout() {
        this.image.clearTint();
        this.fired = false;
    }

    remove() {
        emitter.removeListener(this.event);
        this.destroy();
    }
}