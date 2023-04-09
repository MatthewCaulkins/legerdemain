class Tile extends Phaser.GameObjects.Image {
    constructor(config) {
        const x = config.x;
        const y = config.y;
        const segments = config.segments;

        const tileWidth = config.tileWidth ? config.scale * config.tileWidth : 75;
        const tileHeight = config.tileHeight ? config.scale * config.tileHeight : 75;
        
        const diagonal = Math.sqrt(tileWidth ** 2 + tileHeight ** 2);

        if (segments) {  // Diagonal
            const centerX = .5 * segments * diagonal;
            const centerY = diagonal;

            const tx = (x - y) * (.5 * diagonal); 
            const ty = (x + y) * (.5 * diagonal); 

            super(config.scene, tx + centerX, ty + centerY, CONSTANTS.TILE);
        } else { // Flat
            const tx = x * tileWidth + 10;
            const ty = y * tileHeight + 10;
            
            super(config.scene, tx, ty, CONSTANTS.TILE);
        }
        config.container.add(this);

        // this.scene = config.scene;
        this.scaleX = config.scale;
        this.scaleY = config.scale;

        // Save the board placement
        this.row = x;
        this.column = y;

        // this.setDepth((x + y + (x * .1)) * 10); 
        this.z = (x + y + (x * .02) + (y * .01)) * 100; //this.depth;

        // The unit on this tile
        this._unit = null;

        // Make the tile interactive and oriented
        this.setInteractive();

        // The number of this tile on the board
        this._number;
    }

    // Get the unit on this tile
    get unit() {
        return this._unit;
    }

    // Set the unit on this tile
    set unit(unit) {
        this._unit = unit;
    }

    // Get the number on this tile
    get number() {
        return this._number;
    }

    // Set the number on this tile
    set number(number) {
        this._number = number;
    }
}