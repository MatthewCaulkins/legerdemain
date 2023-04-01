class Tile extends Phaser.GameObjects.Image {
    constructor(config, x, y, segments) {
        const tileWidth = config.tileWidth ? config.scale * config.tileWidth : 75;
        const tileHeight = config.tileHeight ? config.scale * config.tileHeight : 75; // data.tileheight;
        
        const diagonal = Math.sqrt(tileWidth ** 2 + tileHeight ** 2);

        const centerX = .5 * segments * diagonal;
        // const centerY = 16;
        const centerY = diagonal; //-.5 * mapColumns * diagonal;

        const tx = (x - y) * (.5 * diagonal); // tileWidthHalf;
        const ty = (x + y) * (.5 * diagonal); // tileHeightHalf;

        // this = config.scene.add.image(tx + centerX, ty + centerY, 'tile'); // centerX + tx, centerY + ty
        super(config.scene, tx + centerX, ty + centerY, 'tile');
        this.scene = config.scene;
        this.scaleX = config.scale;
        this.scaleY = config.scale;

        // Save the board placement
        this.row = x;
        this.column = y;

        this.setDepth((x + y + (x * .1)) * 10); // ty
       // tile.setOrigin(0.5, 0.5);

        config.container.add(this);

        this._unit;

        // Make the tile interactive and oriented
        this.setInteractive();
        this.setRotation(config.orientation);
    }

    // setTint(tint) {
    //     this.setTint(tint);
    // }

    // clearTint() {
    //     this.clearTint();
    // }

    // Set the unit on this tile
    get unit() {
        return this._unit;
    }

    // Get the unit on this tile
    set unit(unit) {
        this._unit = unit;
    }
}