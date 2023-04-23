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

        this.player1Name = this.scene.add.text(0, 0, '______________', CONSTANTS.DARK_TEXT_STYLE);
        this.player1Name.x = -65;
        this.player1Name.y = 65;
        this.player1Name.setOrigin(0, 0);
        this.player1Name.setRotation(CONSTANTS.MATCHMAKING_NAME_ORIENTATION);
        this.add(this.player1Name);

        this.vsText = this.scene.add.text(0, 0, 'VS', CONSTANTS.DARK_TEXT_STYLE);
        this.vsText.x = 36;
        this.vsText.y = 90;
        this.vsText.setOrigin(.5, .5);
        this.add(this.vsText);
        
        this.player2Name = this.scene.add.text(0, 0, '______________', CONSTANTS.DARK_TEXT_STYLE);
        this.player2Name.x = 120;
        this.player2Name.y = 65;
        this.player2Name.setOrigin(0, 0);
        this.player2Name.setRotation(CONSTANTS.MATCHMAKING_NAME_ORIENTATION);
        this.add(this.player2Name);

        if (config.player1) {
            // this.player1 = config.player1;
            this.player1Name.text = config.player1.name;
            this.createUnit(CONSTANTS.LANCE, CONSTANTS.LEFT, config.player1);
        }
        if (config.player2) {
            // this.player2 = config.player2;
            this.player2Name.text = config.player2.name;
            this.createUnit(CONSTANTS.LANCE, CONSTANTS.RIGHT, config.player2);
        }

        // this.leftUnit = null;
        // this.rightUnit = null;
    }
    
    onLeftSidePointerover() {
        if (this.player1 === null) {
            this.leftSide.setTint(CONSTANTS.GREEN_TINT);
        } else if (this.player1.playerId === game.player.playerId) {
            this.leftSide.setTint(CONSTANTS.RED_TINT);
        }
    }

    onLeftSidePointerout() {
        if (this.player1 === null || this.player1.playerId === game.player.playerId) {
            this.leftSide.clearTint();
        }
    }

    onLeftSidePointerdown() {
        // console.log(game.player.playerId);
        if (this.player1 === null) {
            // TODO: Send socket event that player joined
            emitter.emit(CONSTANTS.JOIN_ROOM, {player: game.player, side: CONSTANTS.LEFT, roomID: this.roomID});
            this.player1 = game.player;
            // console.log('left side clicked');

            // TODO: remove player from all other matchmaking tiles
            // this.createUnit(CONSTANTS.LANCE, CONSTANTS.LEFT);
        } else if (this.player1.playerId === game.player.playerId) {
            emitter.emit(CONSTANTS.LEAVE_ROOM, {player: game.player, side: CONSTANTS.LEFT, roomID: this.roomID});
            this.player1 = null;
            this.leftSide.unit.destroy();
        }
    }

    onRightSidePointerover() {
        if (this.player2 === null) {
            this.rightSide.setTint(CONSTANTS.GREEN_TINT);
        } else if (this.player2.playerId === game.player.playerId) {
            this.rightSide.setTint(CONSTANTS.RED_TINT);
        }
    }

    onRightSidePointerout() {
        if (this.player2 === null || this.player2.playerId === game.player.playerId) {
            this.rightSide.clearTint();
        }
    }

    onRightSidePointerdown() {
        if (this.player2 === null) {
            // TODO: Send socket event that player joined
            emitter.emit(CONSTANTS.JOIN_ROOM, {player: game.player, side: CONSTANTS.RIGHT, roomID: this.roomID});
            this.player2 = game.player;
            // console.log('right side clicked');

            // this.createUnit(CONSTANTS.LANCE, CONSTANTS.RIGHT);
        } else if (this.player2.playerId === game.player.playerId) {
            emitter.emit(CONSTANTS.LEAVE_ROOM, {player: game.player, side: CONSTANTS.RIGHT, roomID: this.roomID});
            this.player2 = null;
            this.rightSide.unit.destroy();
        }
    }

    createUnit(type, side, player) {
        let direction;
        let boardSide;

        if (side === CONSTANTS.LEFT) {
            boardSide = this.leftSide;
            direction = CONSTANTS.RIGHT;
            this.player1 = player;
        }
        if (side === CONSTANTS.RIGHT) {
            boardSide = this.rightSide;
            direction = CONSTANTS.LEFT;
            this.player2 = player;
        }
        // console.log(type);
        // console.log(boardTile);
        switch(type) {
            case CONSTANTS.AXE:
                boardSide.unit = new Axe({
                    scene: this.scene, 
                    player: game.player,
                    tile: boardSide,
                    container: this,
                    direction: direction
                });
            break;
            case CONSTANTS.BOW:
                boardSide.unit = new Bow({
                    scene: this.scene, 
                    player: game.player,
                    tile: boardSide,
                    container: this,
                    direction: direction
                });
            break;
            case CONSTANTS.CONTROL:
                boardSide.unit = new Control({
                    scene: this.scene, 
                    player: game.player,
                    tile: boardSide,
                    container: this,
                    direction: direction
                });
            break;
            case CONSTANTS.DAGGER:
                boardSide.unit = new Dagger({
                    scene: this.scene, 
                    player: game.player,
                    tile: boardSide,
                    container: this,
                    direction: direction
                });
            break;
            case CONSTANTS.HEALING:
                boardSide.unit = new Healing({
                    scene: this.scene, 
                    player: game.player,
                    tile: boardSide,
                    container: this,
                    direction: direction
                });
            break;
            case CONSTANTS.LANCE:
                boardSide.unit = new Lance({
                    scene: this.scene, 
                    player: game.player,
                    tile: boardSide,
                    container: this,
                    direction: direction
                });
            break;
            case CONSTANTS.SHIELD:
                boardSide.unit = new Shield({
                    scene: this.scene, 
                    player: game.player,
                    tile: boardSide,
                    container: this,
                    direction: direction
                });
            break;
            case CONSTANTS.SORCERY:
                boardSide.unit = new Sorcery({
                    scene: this.scene, 
                    player: game.player,
                    tile: boardSide,
                    container: this,
                    direction: direction
                });
            break;
            case CONSTANTS.SWORD:
                boardSide.unit = new Sword({
                    scene: this.scene, 
                    player: game.player,
                    tile: boardSide,
                    container: this,
                    direction: direction
                });
            break;
        }

        boardSide.unit.setRotation(-CONSTANTS.BOARD_ORIENTATION);
    }

    startGame() {

    }
}