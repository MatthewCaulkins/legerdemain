class MatchmakingTileContainer extends Phaser.GameObjects.Container {
    constructor(config) {
        const x = config.x;
        const y = config.y;
        const width = config.width;
        const height = config.height;

        super(config.scene, x, y);

        this.setSize(width, height);
        // this.setOrigin(0, 0);

        // Add Background so it's easy to find
        const background = this.scene.make.graphics({add: false})
            .fillStyle(0xffffff, 1)
            .fillRect(0, 0, width, height);
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
        let matchmakingConfig = {
            scene: this.scene,
            container: this,
            matchmakingId: 1,
            x: 100,
            y: 100
        };
        this.matchmakingContainers['container1'] = new MatchmakingTile(matchmakingConfig);

        matchmakingConfig = {
            scene: this.scene,
            container: this,
            matchmakingId: 2,
            x: 100,
            y: 340
        };
        this.matchmakingContainers['container2'] = new MatchmakingTile(matchmakingConfig);

        matchmakingConfig = {
            scene: this.scene,
            container: this,
            matchmakingId: 2,
            x: 340,
            y: 100
        };
        this.matchmakingContainers['container3'] = new MatchmakingTile(matchmakingConfig);

        matchmakingConfig = {
            scene: this.scene,
            container: this,
            matchmakingId: 2,
            x: 580,
            y: 100
        };
        this.matchmakingContainers['container4'] = new MatchmakingTile(matchmakingConfig);
        
        matchmakingConfig = {
            scene: this.scene,
            container: this,
            matchmakingId: 2,
            x: 820,
            y: 100
        };
        this.matchmakingContainers['container5'] = new MatchmakingTile(matchmakingConfig);
    }

    moveContainers() {
        // console.log('move container '+ this.matchmakingContainers['container1'].x);
        // this.matchmakingContainers['container1'].x -= 5;
        // this.matchmakingContainers['container1'].y -= 5;

        // if (this.matchmakingContainers['container1'].x < -150) {
        //     this.matchmakingContainers['container1'].x = gameWidth;
        // }
        // if (this.matchmakingContainers['container1'].y < -150) {
        //     this.matchmakingContainers['container1'].y = gameHeight;
        // }
    }
}