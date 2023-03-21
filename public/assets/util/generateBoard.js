class GenerateBoard {
    constructor(config) {
        this.config = config;
        this.ROTATION_IN_RADIANS = 0.785398;
        this.config.scale = this.config.scale ? this.config.scale : 1;

        this.tileContainer = this.config.scene.add.container(0, 0);
        this.tileContainer.setInteractive();

        this.createBoard();
    }

    createBoard() {
        
        const tileWidth = this.config.tileWidth ? this.config.scale * this.config.tileWidth : 75;
        const tileHeight = this.config.tileHeight ? this.config.scale * this.config.tileHeight : 75; // data.tileheight;
        
        const diagonal = Math.sqrt(tileWidth ** 2 + tileHeight ** 2);
        // let tileWidthHalf = tileWidth * 2 / 3;
        // let tileHeightHalf = tileHeight * 2 / 3;

        // const layer = data.layers[0].data;

        const mapRows = this.config.mapRows ? this.config.mapRows : 3;
        const mapColumns = this.config.mapColumns ? this.config.mapColumns : 8;
        const segments = mapRows > mapColumns ? mapRows : mapColumns;

        // const centerX = mapRows * tileWidthHalf;
        const centerX = .5 * segments * diagonal;
        // const centerY = 16;
        const centerY = diagonal; //-.5 * mapColumns * diagonal;

        let i = 0;

        // Need to make this more mobile friendly.  Make the container, fill the things in it, then rotate the container.
        for (let y = 0; y < mapColumns; y++)
        {
            for (let x = 0; x < mapRows; x++)
            {
                // const id = layer[i] - 1;

                const tx = (x - y) * (.5 * diagonal); // tileWidthHalf;
                const ty = (x + y) * (.5 * diagonal); // tileHeightHalf;

                //const tx = (gameWidth / 2) - (.5 * mapRows * tileWidth);
                //const ty = (gameHeight / 2) - (.5 * mapColumns * tileHeight);

                const tile = this.config.scene.add.image(tx + centerX, ty + centerY, 'tile'); // centerX + tx, centerY + ty
                tile.scene = this.config.scene;
                tile.scaleX = this.config.scale;
                tile.scaleY = this.config.scale;
                tile.setInteractive();
                tile.on('pointerover', this.onPointerover.bind(tile));
                tile.on('pointerout', this.onPointerout.bind(tile));
                tile.on('pointerdown', this.onPointerdown.bind(tile));

                tile.depth = x + y; // ty
               // tile.setOrigin(0.5, 0.5);
                tile.setRotation(this.ROTATION_IN_RADIANS);

                this.tileContainer.add(tile);
                i++;
            }
        }
    }
    

    onPointerover() {
        this.setTint(0x86bfda);
        // this.y -= 3;
    } 

    onPointerout() {
        this.clearTint();
        // this.y += 3;
    }

    onPointerdown() {
        const x = this.x;
        const y = this.y;

        const character = this.scene.add.existing(new Unit(this.scene, x, y, 'character'));// , 'southEast', 100)));//this.scene.add.image(x, y, 'character');
        character.setOrigin(.5, .85);

        // character.y = this.y;
    }
}