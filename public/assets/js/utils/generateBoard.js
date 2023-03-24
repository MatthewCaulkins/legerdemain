class GenerateBoard {
    constructor(config) {
        this.config = config;
        this.config.scale = this.config.scale ? this.config.scale : 1;

        // this._tileContainer = this.config.scene.add.container(0, 0);
        // this._tileContainer.setInteractive();

        this.createBoard();
    }

    // get tileContainer() {
    //     return this._tileContainer;
    // }

    createBoard() {
        // const tileWidth = this.config.tileWidth ? this.config.scale * this.config.tileWidth : 75;
        // const tileHeight = this.config.tileHeight ? this.config.scale * this.config.tileHeight : 75; // data.tileheight;
        
        // const diagonal = Math.sqrt(tileWidth ** 2 + tileHeight ** 2);
        // let tileWidthHalf = tileWidth * 2 / 3;
        // let tileHeightHalf = tileHeight * 2 / 3;

        // const layer = data.layers[0].data;

        const mapRows = this.config.mapRows ? this.config.mapRows : 3;
        const mapColumns = this.config.mapColumns ? this.config.mapColumns : 8;
        const segments = mapRows > mapColumns ? mapRows : mapColumns;

        // const centerX = mapRows * tileWidthHalf;
        // const centerX = .5 * segments * diagonal;
        // // const centerY = 16;
        // const centerY = diagonal; //-.5 * mapColumns * diagonal;

        //let i = 0;

        // Need to make this more mobile friendly.  Make the container, fill the things in it, then rotate the container.
        for (let y = 0; y < mapColumns; y++)
        {
            for (let x = 0; x < mapRows; x++)
            {
                // const id = layer[i] - 1;

                // const tx = (x - y) * (.5 * diagonal); // tileWidthHalf;
                // const ty = (x + y) * (.5 * diagonal); // tileHeightHalf;

                const tile = new Tile(this.config, x, y, segments);

                //const tx = (gameWidth / 2) - (.5 * mapRows * tileWidth);
                //const ty = (gameHeight / 2) - (.5 * mapColumns * tileHeight);

            //     const tile = this.config.scene.add.image(tx + centerX, ty + centerY, 'tile'); // centerX + tx, centerY + ty
            //     tile.scene = this.config.scene;
            //     tile.scaleX = this.config.scale;
            //     tile.scaleY = this.config.scale;

            //     tile.setDepth((x + y + (x * .1)) * 10); // ty
            //    // tile.setOrigin(0.5, 0.5);

            //     this.config.scene.boardContainer.add(tile);
            //    i++;
            }
        }
    }
}