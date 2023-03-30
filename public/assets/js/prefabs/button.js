class Button extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);

        this.config = config;
        this.scene = config.scene;
        this.text = config.text;
        this.textConfig = config.textConfig;
        this.event = config.event;
        this.params = config.params

        this.image = this.scene.add.image(0, 0, this.config.key);
        this.add(this.image);

        this.text = this.scene.add.text(0, 0, this.text, this.textConfig);
        this.text.setOrigin(.5, .5);
        this.add(this.text);

        this.setSize(this.image.displayWidth, this.image.displayHeight);
        this.scene.add.existing(this);

        this.x = config.x;
        this.y = config.y;

        if(this.event) {
            this.image.setInteractive();
            this.image.on('pointerdown', this.pressed, this);
        }
    }

    pressed() {
        if (this.params) {
            emitter.emit(this.event, this.params);
        } else {
            emitter.emit(this.event);
        }
    }
}