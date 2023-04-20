class MatchmakingTile extends Phaser.GameObjects.Container {
    constructor(config) { 
        super(config.scene, config.x, config.y);

        this.roomID = config.roomID;

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
        // console.log('added matchmaking tile');
        // console.log(this);
        
        this.setSize(150, 75);
        this.setRotation(CONSTANTS.BOARD_ORIENTATION);
        config.container.add(this);

        // this.leftUnit = null;
        // this.rightUnit = null;
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
        if (this.player1 === null) {
            // TODO: Send socket event that player joined
            this.player1 === game.player;
            console.log('left side clicked');

            this.createUnit(CONSTANTS.LANCE, this.leftSide);
            this.leftSide.unit.setRotation(-CONSTANTS.BOARD_ORIENTATION);
        }
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
        if (this.player2 === null) {
            // TODO: Send socket event that player joined
            this.player2 === game.player;
            console.log('right side clicked');

            this.createUnit(CONSTANTS.LANCE, this.rightSide);

            this.rightSide.unit.setRotation(-CONSTANTS.BOARD_ORIENTATION);
        }
    }



    createUnit(type, side) {
        let direction;

        if (side === this.leftSide) {
            direction = CONSTANTS.RIGHT;
        } else {
            direction = CONSTANTS.LEFT;
        }
        // console.log(type);
        // console.log(boardTile);
        switch(type) {
            case CONSTANTS.AXE:
                side.unit = new Axe({
                    scene: this.scene, 
                    player: game.player,
                    tile: side,
                    container: this,
                    direction: direction
                });
            break;
            case CONSTANTS.BOW:
                side.unit = new Bow({
                    scene: this.scene, 
                    player: game.player,
                    tile: side,
                    container: this,
                    direction: direction
                });
            break;
            case CONSTANTS.CONTROL:
                side.unit = new Control({
                    scene: this.scene, 
                    player: game.player,
                    tile: side,
                    container: this,
                    direction: direction
                });
            break;
            case CONSTANTS.DAGGER:
                side.unit = new Dagger({
                    scene: this.scene, 
                    player: game.player,
                    tile: side,
                    container: this,
                    direction: direction
                });
            break;
            case CONSTANTS.HEALING:
                side.unit = new Healing({
                    scene: this.scene, 
                    player: game.player,
                    tile: side,
                    container: this,
                    direction: direction
                });
            break;
            case CONSTANTS.LANCE:
                side.unit = new Lance({
                    scene: this.scene, 
                    player: game.player,
                    tile: side,
                    container: this,
                    direction: direction
                });
            break;
            case CONSTANTS.SHIELD:
                side.unit = new Shield({
                    scene: this.scene, 
                    player: game.player,
                    tile: side,
                    container: this,
                    direction: direction
                });
            break;
            case CONSTANTS.SORCERY:
                side.unit = new Sorcery({
                    scene: this.scene, 
                    player: game.player,
                    tile: side,
                    container: this,
                    direction: direction
                });
            break;
            case CONSTANTS.SWORD:
                side.unit = new Sword({
                    scene: this.scene, 
                    player: game.player,
                    tile: side,
                    container: this,
                    direction: direction
                });
            break;
        }
    }

    startGame() {

    }
}