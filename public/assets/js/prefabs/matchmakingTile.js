class MatchmakingTile extends Phaser.GameObjects.Container {
    constructor(config) { 
        super(config.scene, config.x, config.y);

        this.id = config.matchmakingId;

        this.leftSide = this.scene.add.image(0, 0, CONSTANTS.MATCHMAKING_TILE);
        this.rightSide = this.scene.add.image(75, 0, CONSTANTS.MATCHMAKING_TILE);
        
        this.add(this.leftSide);
        this.add(this.rightSide);

        this.rightSide.scaleX = -1;

        this.player1 = null;
        this.player2 = null;

        // Add Interactions to the sides
        this.leftSide.setInteractive();
        this.leftSide.on(CONSTANTS.POINTER_DOWN, this.onLeftSidePointerdown, this);
        this.leftSide.on(CONSTANTS.POINTER_OVER, this.onLeftSidePointerover, this);            
        this.leftSide.on(CONSTANTS.POINTER_OUT, this.onLeftSidePointerout, this);
        
        this.rightSide.setInteractive();
        this.rightSide.on(CONSTANTS.POINTER_DOWN, this.onRightSidePointerdown, this);
        this.rightSide.on(CONSTANTS.POINTER_OVER, this.onRightSidePointerover, this);            
        this.rightSide.on(CONSTANTS.POINTER_OUT, this.onRightSidePointerout, this);

        
        // scene.add.existing(this);
        console.log('added matchmaking tile');
        console.log(this);
        
        this.setSize(150, 75);
        this.setRotation(CONSTANTS.BOARD_ORIENTATION);
        config.container.add(this);
    }
    
    onLeftSidePointerover() {
        if (this.player1 === null) {
            this.leftSide.setTint(CONSTANTS.GREEN_TINT);
        }
    }
    onLeftSidePointerout() {
        if (this.player1 === null) {
            this.leftSide.clearTint();
        }
    }
    onLeftSidePointerdown() {
        // TODO: Send socket event that player joined
        console.log('left side clicked');
    }

    onRightSidePointerover() {
        if (this.player2 === null) {
            this.rightSide.setTint(CONSTANTS.GREEN_TINT);
        }
    }
    onRightSidePointerout() {
        if (this.player2 === null) {
            this.rightSide.clearTint();
        }
    }
    onRightSidePointerdown() {
        // TODO: Send socket event that player joined
        console.log('right side clicked');
    }

    startGame() {

    }
}