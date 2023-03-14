// import IsoPlugin from 'phaser3-plugin-isometric';

class boardTest extends Phaser.Scene {
    isoGroup1;
    isoGroup2;

    constructor() {
        // super(PlayScene);
        super('boardTest');
    }

    preload() {
        this.load.image('tile', 'assets/img/tile.png');
    }

    create() {
        // scene = this;
        this.buildMap();
        this.cameras.main.setSize(1600, 600);
    }

    onPointerover() {
        this.setTint(0x86bfda);
        this.y -= 3;
    }

    onPointerout() {
        this.clearTint();
        this.y += 3;
    }

    buildMap() {
        
        const tilewidth = 254;
        const tileheight = 148; // data.tileheight;

        tileWidthHalf = tilewidth / 2;
        tileHeightHalf = tileheight / 2;

        // const layer = data.layers[0].data;

        const mapwidth = 1;//5; // data.layers[0].width;
        const mapheight = 1;//5; //data.layers[0].height;

        const centerX = mapwidth * tileWidthHalf;
        const centerY = 16;

        let i = 0;

        for (let y = 0; y < mapheight; y++)
        {
            for (let x = 0; x < mapwidth; x++)
            {
                // const id = layer[i] - 1;

                const tx = (x - y) * tileWidthHalf;
                const ty = (x + y) * tileHeightHalf;

                const tile = this.add.image(centerX + tx, centerY + ty, 'tile');
                tile.setInteractive();
                tile.on('pointerover', this.onPointerover.bind(tile));
                tile.on('pointerout', this.onPointerout.bind(tile));

                tile.depth = centerY + ty;
                tile.setOrigin(0.5, 0.15);
                // tile.setRotation();

                i++;
            }
        }
    }
    // spawnTiles(tileKey, group, startX = 0, startY = 0) {
    //     let tile;
    //     // let tile2;

    //     for (let x = 0; x < 400; x += 40) {
    //         for (let y = 0; y < 400; y += 40) {
    //             tile = this.add.isoSprite(x + startX, y + startY, 0, tileKey, group);
    //             tile.setInteractive();
    //             tile.on('pointerover', this.onPointerover.bind(tile));
    //             tile.on('pointerout', this.onPointerout.bind(tile));
    //         }
    //     }
    // }
}

// export default PlayScene;