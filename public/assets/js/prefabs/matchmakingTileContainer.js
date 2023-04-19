class MatchmakingTileContainer extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, 0, 0);

        const x = config.x;
        const y = config.y;
        const width = config.width;
        const height = config.height;

        this.setSize(width, height);
        // this.setOrigin(0, 0);

        // Add Background so it's easy to find
        const background = this.scene.make.graphics({add: false})
            .fillStyle(0xffffff, 1)
            .fillRect(x, y, width, height);
        this.add(background);

        // Add a mask to this container
        const mask = this.scene.make.graphics({add: false})
            .fillStyle(0xffffff, .5)
            .fillRect(x, y, width, height);
        this.mask = new Phaser.Display.Masks.GeometryMask(this, mask);

        // Add to the scene
        this.scene.add.existing(this);

        // Keep a record of all active games
        this.matchmakingContainers = {};

        // TODO: make this triggered by socket io and given a room ID
        const matchmakingConfig = {
            scene: this.scene,
            container: this,
            matchmakingId: 1,
        }
        this.matchmakingContainers['container1'] = new MatchmakingTile(matchmakingConfig);
        console.log(this.matchmakingContainers['container1']);
        console.log(gameWidth);
    }

    moveContainers() {
        // console.log('move container '+ this.matchmakingContainers['container1'].x);
        this.matchmakingContainers['container1'].x -= 5;
        this.matchmakingContainers['container1'].y -= 5;

        if (this.matchmakingContainers['container1'].x < -150) {
            this.matchmakingContainers['container1'].x = gameWidth;
        }
        if (this.matchmakingContainers['container1'].y < -150) {
            this.matchmakingContainers['container1'].y = gameHeight;
        }
    }
}