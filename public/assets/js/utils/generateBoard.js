class GenerateBoard {
    constructor(config) {
        this.config = config;
        this.config.scale = this.config.scale ? this.config.scale : 1;

        // this._tileContainer = this.config.scene.add.container(0, 0);
        // this._tileContainer.setInteractive();

        this.createBoard();

        this.board;
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

        this.mapRows = this.config.mapRows ? this.config.mapRows : 3;
        this.mapColumns = this.config.mapColumns ? this.config.mapColumns : 11;
        const segments = this.mapRows > this.mapColumns ? this.mapRows : this.mapColumns;

        // const centerX = mapRows * tileWidthHalf;
        // const centerX = .5 * segments * diagonal;
        // // const centerY = 16;
        // const centerY = diagonal; //-.5 * mapColumns * diagonal;

        //let i = 0;

        // Need to make this more mobile friendly.  Make the container, fill the things in it, then rotate the container.

        // Create a board to recall tiles and units later
        this.board = new Array(this.mapRows);
        for (let x = 0; x < this.mapRows; x++)
        {
            this.board[x] = new Array(this.mapColumns);
        }
        
        let n = 0;
        for (let y = 0; y < this.mapColumns; y++)
        {
            for (let x = 0; x < this.mapRows; x++)
            {

                // const id = layer[i] - 1;

                // const tx = (x - y) * (.5 * diagonal); // tileWidthHalf;
                // const ty = (x + y) * (.5 * diagonal); // tileHeightHalf;

                // if (this.config.orientation === CONSTANTS.UNITS_ORIENTATION) {
                const tile = new Tile(this.config, x, y, segments, n);
                this.board[x][y] = tile;
                n++;
                // }

                // if (this.config.index && this.config.alignmentGrid) {
                //     this.config.alignmentGrid.positionItemAtIndex(this.config.index + x + y, tile);
                // }
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

        console.log(this.board);
        // this.config.container.iterate(this.addInteractionToTile, this, this.config);
    }

    // addInteractionToTile(tile, config) {
    //     // tile.setInteractive();
    //     // tile.setRotation(tile.scene.ROTATION_IN_RADIANS);

    //     console.log(config);

    //     if (config.onPointerover) {
    //         tile.on('pointerover', config.onPointerover.bind(tile));
    //     }
    //     if (config.onPointerout) {
    //         tile.on('pointerout', config.onPointerout.bind(tile));
    //     }
    //     if (config.onPointerdown) {
    //         tile.on('pointerdown', config.onPointerdown.bind(tile));
    //     }
    // }
}