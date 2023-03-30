class HealthBar extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);

        this.scene = config.scene;
        
        // make the container
        this.container = this.scene.add.graphics();
        this.container.fillStyle(CONSTANTS.WHITE, 1);
        this.container.fillRect(0, 0, config.width, config.height);
        this.container.lineStyle(CONSTANTS.BLACK, 1);
        this.container.strokeRect(0, 0, config.width, config.height);

        this.add(this.container);

        this.container.x = -config.width / 2;
        this.container.y = -config.height / 2;

        this.scene.add.existing(this);

        this.x = config.x;
        this.y = config.y;

        // Make the full color
        this.bar = this.scene.add.graphics();
        this.bar.fillStyle(CONSTANTS.GREEN_TINT, 1);
        this.bar.fillRect(1, 1, config.width - 3, config.height -3);

        this.add(this.bar);

        this.bar.x = -config.width / 2 + 1;
        this.bar.y = -config.height / 2 + 1;
    }

    setPercent(percent) {
        this.bar.scaleX = percent;
    }
}