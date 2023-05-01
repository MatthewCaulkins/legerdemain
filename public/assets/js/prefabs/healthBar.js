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
        
        // this.currentColor = this.fullColor;
        this.bar = new Phaser.GameObjects.Rectangle(this.scene, -(config.width / 2) + 2, -(config.height / 2) + 2, config.width - 4, config.height - 4, this.currentColor, 1);
        this.bar.setOrigin(0, 0);
        // this.bar = this.scene.add.graphics();
        // this.bar.fillStyle(CONSTANTS.GREEN_TINT, 1);
        // this.bar.fillRect(1, 1, config.width - 3, config.height -3);

        this.add(this.bar);

        // this.bar.x = -(config.width / 2) + 1;
        // this.bar.y = -(config.height / 2) + 1;

        this.scene.add.existing(this);
        this.currentPercent = 1;
        
        this.setPercent(this.currentPercent);
        this.setDepth(this.z);

        this.setVisible(false);

        // TINT FROM GREEN TO RED

                // this.scene.tweens.addCounter({
                //     from: 0,
                //     to: 100,
                //     duration: 1000,
                //     ease: Phaser.Math.Easing.Sine.InOut,
                //     repeat: -1,
                //     yoyo: true,
                //     onUpdate: tween => {
                //         const value = tween.getValue();
                //         const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
                //             this.fullColor,
                //             this.emptyColor,
                //             100,
                //             value
                //         );

                //         const color = Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b);

                //         // console.log(color);
                //         this.bar.setFillStyle(color);
                //     }
                // })
    }

    setPercent(percent) {
        // const targetColorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
        //     this.emptyColor,
        //     this.fullColor,
        //     100,
        //     percent * 100
        // );
        // const targetColor = Phaser.Display.Color.GetColor(targetColorObject.r, targetColorObject.g, targetColorObject.b);
        // this.bar.setFillStyle(targetColor);

        this.scene.tweens.addCounter({
            // targets: this.bar, 
            // scaleX: percent, 
            from: this.currentPercent * 100, 
            to: percent * 100,
            duration: 1000, 
            repeat: 0,
            onStart: function () {},// console.log('onStart'); console.log(arguments); },
            onUpdate: tween => {
                const value = tween.getValue();
                const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
                    this.emptyColor,
                    this.fullColor,
                    // this.currentColor,
                    // targetColorObject,
                    100,
                    value
                );

                const color = Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b);

                this.bar.setFillStyle(color);
            },
            onComplete: function () { 
                // this.currentColor = this.tempColor;
                this.currentPercent = percent;
                console.log('Color tween complete');
            }
        });
        this.scene.tweens.add({
            targets: this.bar,
            scaleX: percent,
            // onComplete: function () {
            //     this.currentPercent = percent
            // }
        });

        this.currentPercent = percent;
        // this.scene.tweens.addCounter({
        //     from: 0,
        //     to: 100,
        //     duration: 1000,
        //     ease: Phaser.Math.Easing.Sine.InOut,
        //     repeat: -1,
        //     yoyo: true,
        //     onUpdate: tween => {
        //         const value = tween.getValue();
        //         const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
        //             this.fullColor,
        //             this.emptyColor,
        //             100,
        //             value
        //         );

        //         const color = Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b);

        //         // console.log(color);
        //         this.bar.setFillStyle(color);
        //     }
        // })
    }

    // setVisible(visible) {
    //     this.container.setVisible(visible);
    //     this.bar.setVisible(visible);
    // }
}