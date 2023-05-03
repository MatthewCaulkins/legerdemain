class TutorialOverlay extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, 0, 0);

        this.currentSlide = -1;

        this.alignmentGrid = config.alignmentGrid;
        this.screens = config.screens;
        this.textConfig = config.textConfig;
        this.endEvent = config.endEvent;
        this.underlyingInteractives = config.underlyingInteractives;

        // Background tint
        this.background = this.scene.add.graphics();
        
        this.background.fillStyle(CONSTANTS.BLACK, .75);
        this.background.fillRect(0, 0, gameWidth, gameHeight);
        this.background.setInteractive();

        this.add(this.background);
        
        // Add navigation button
        this.nextButton = new Button({
            scene: config.scene,
            key: 'tile',
            text: 'Next',
            invalidateFired: false,
            textConfig: config.buttonTextConfig,
            event: CONSTANTS.NEXT_TUTORIAL_SCREEN, 
            params: this,
            x: (gameWidth / 2) + 50,
            y: gameHeight / 2 + 130,
        });
        emitter.on(CONSTANTS.NEXT_TUTORIAL_SCREEN, this.nextTutorialScreen);
        this.nextButton.setVisible(false);
        this.add(this.nextButton);

        this.previousButton = new Button({
            scene: config.scene,
            key: 'tile',
            text: 'Previous',
            invalidateFired: false,
            textConfig: config.buttonTextConfig,
            event: CONSTANTS.LAST_TUTORIAL_SCREEN, 
            params: this,
            x: (gameWidth / 2) - 50,
            y: gameHeight / 2 + 130,
        });
        emitter.on(CONSTANTS.LAST_TUTORIAL_SCREEN, this.previousTutorialScreen);
        this.previousButton.setVisible(false);
        this.add(this.previousButton);

        this.scene.add.existing(this);

        // Lock underlying interactives
        this.lockUnderlyingInteractives(true);

        // Start the tutorial
        this.nextTutorialScreen(this);
    }

    lockUnderlyingInteractives(lock) {
        console.log(this.underlyingInteractives);
        if (this.underlyingInteractives) {
            this.underlyingInteractives.forEach(interactive => {
                if (lock) {
                    interactive.disableInteractive();
                } else {
                    interactive.setInteractive();
                }
            });
        }
    }

    nextTutorialScreen(overlay) {
        overlay.currentSlide ++;

        console.log(overlay.screens);

        // close the tutorial button
        if (overlay.currentSlide === overlay.screens.length) {
            emitter.emit(overlay.endEvent, overlay.scene);
            emitter.removeListener(CONSTANTS.NEXT_TUTORIAL_SCREEN);
            emitter.removeListener(CONSTANTS.LAST_TUTORIAL_SCREEN);
            overlay.lockUnderlyingInteractives(false);

            overlay.destroy();
        } else {
            if (overlay.currentSlide === 0) {
                overlay.nextButton.setVisible(true);
            }
            if (overlay.currentSlide > 0) {
                overlay.previousButton.setVisible(true);
            }

            overlay.clearScreen();
            // overlay.textConfig.wordwrap = { width: gameWidth / 2 };
            
            overlay.text = overlay.scene.add.text(gameWidth / 2, gameHeight / 2, overlay.screens[overlay.currentSlide].text, overlay.textConfig);
            overlay.text.setOrigin(.5, .5);
            overlay.add(overlay.text);

            if (overlay.screens[overlay.currentSlide].callback != null) {
                overlay.screens[overlay.currentSlide].callback(overlay.scene);
            }
            
            if (overlay.screens[overlay.currentSlide].imageKey) {
                overlay.image = overlay.scene.add.image(0, 0, overlay.screens[overlay.currentSlide].imageKey);
                overlay.alignmentGrid.positionItemAtIndex(overlay.screens[overlay.currentSlide].imageIndex, overlay.image);
            }
        }
    }

    previousTutorialScreen(overlay) {
        overlay.currentSlide --;

        console.log('previous screen');
        console.log(overlay.screens);

        if (overlay.currentSlide === 0) {
            overlay.previousButton.setVisible(false);
        }
        
        overlay.clearScreen();
        // overlay.textConfig.wordwrap = { width: gameWidth / 2 };
        
        overlay.text = overlay.scene.add.text(gameWidth / 2, gameHeight / 2, overlay.screens[overlay.currentSlide].text, overlay.textConfig);
        overlay.text.setOrigin(.5, .5);
        overlay.add(overlay.text);

        if (overlay.screens[overlay.currentSlide].callback != null) {
            overlay.screens[overlay.currentSlide].callback(overlay.scene);
        }

        if (overlay.screens[overlay.currentSlide].imageKey) {
            overlay.image = overlay.scene.add.image(0, 0, overlay.screens[overlay.currentSlide].imageKey);
            overlay.alignmentGrid.positionItemAtIndex(overlay.screens[overlay.currentSlide].imageIndex, overlay.image);
        }
    }

    clearScreen() {
        if (this.image) {
            this.image.destroy();
            this.image = null;
        }
        if (this.text) {
            this.text.destroy();
            this.text = null;
        }
    }
}