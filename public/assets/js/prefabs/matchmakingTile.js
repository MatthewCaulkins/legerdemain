class MatchmakingTile extends Phaser.GameObjects.Container {
    constructor(config) { 
        super(config);

        this.leftSide = this.scene.add.image(0, 0, CONSTANTS.MATCHMAKING_TILE);
        this.rightSide = this.scene.add.image(75, 0, CONSTANTS.MATCHMAKING_TILE);
        
        this.add(this.leftSide);
        this.add(this.rightSide);

        this.rightSide.scaleX = -1;

        this.player1 = null;
        this.player2 = null;
    }
}