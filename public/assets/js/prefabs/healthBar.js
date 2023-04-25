class HealthBar extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, config.x, config.y);
        
        // make the container
        this.container = this.scene.add.graphics();
        this.container.fillStyle(CONSTANTS.WHITE, 1);
        this.container.fillRect(0, 0, config.width, config.height);
        this.container.lineStyle(CONSTANTS.BLACK, 1);
        this.container.strokeRect(0, 0, config.width, config.height);

        this.add(this.container);

        this.container.x = -(config.width / 2);
        this.container.y = -(config.height / 2);

        // this.x = config.x;
        // this.y = config.y;

        // Make the full color
        this.fullColor = new Phaser.Display.Color(CONSTANTS.GREEN_COLOR.r, CONSTANTS.GREEN_COLOR.g, CONSTANTS.GREEN_COLOR.b, CONSTANTS.GREEN_COLOR.a);
        this.emptyColor = new Phaser.Display.Color(CONSTANTS.RED_COLOR.r, CONSTANTS.RED_COLOR.g, CONSTANTS.RED_COLOR.b, CONSTANTS.RED_COLOR.a);
        this.bar = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, config.width - 4, config.height - 4, CONSTANTS.GREEN_TINT, 1);
        // this.bar = this.scene.add.graphics();
        // this.bar.fillStyle(CONSTANTS.GREEN_TINT, 1);
        // this.bar.fillRect(1, 1, config.width - 3, config.height -3);

        this.add(this.bar);

        // this.bar.x = -(config.width / 2) + 1;
        // this.bar.y = -(config.height / 2) + 1;

        this.scene.add.existing(this);
        
        this.setPercent(1);
        this.setDepth(this.z);

        // this.setVisible(false);

        // TINT FROM GREEN TO RED

        this.scene.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 1000,
            ease: Phaser.Math.Easing.Sine.InOut,
            repeat: -1,
            yoyo: true,
            onUpdate: tween => {
                const value = tween.getValue();
                const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
                    this.fullColor,
                    this.emptyColor,
                    100,
                    value
                );

                const color = Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b);

                // console.log(color);
                this.bar.setFillStyle(color);
            }
        })
    }

    setPercent(percent) {
        this.bar.scaleX = percent;
    }

    // setVisible(visible) {
    //     this.container.setVisible(visible);
    //     this.bar.setVisible(visible);
    // }
}