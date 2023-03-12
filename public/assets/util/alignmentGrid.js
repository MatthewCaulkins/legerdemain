class AlignmentGrid {
    constructor(config) {
        this.config = config;

        if (!config.scene) return;

        if (!config.rows) {
            config.rows = 11;
        }
        if (!config.columns) {
            config.columns = 11;
        }
        if (!config.height) {
            config.height = game.config.height;
        }
        if (!config.width) {
            config.width = game.config.width;
        }

        this.scene = config.scene;

        // set cell sizes
        this.cellWidth = config.width / config.columns;
        this.cellHeight = config.height / config.rows;
    }

    drawGrid() {
        this.graphics = this.scene.add.graphics();

        // config.lineWidth, config.lineColor
        this.graphics.lineStyle(2, 0xff0000);

        for (let i = 0; i < this.config.width; i += this.cellWidth) {
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.config.height);
        }
        for (let j = 0; j < this.config.height; j += this.cellHeight) {
            this.graphics.moveTo(0, j);
            this.graphics.lineTo(this.config.width, j);
        }
        this.graphics.strokePath();
    }

    // Position an object at x, y position
    positionItemAt(x, y, obj) {
        var posX = this.cellWidth * x + this.cellWidth / 2;
        var posY = this.cellHeight * y + this.cellHeight / 2;

        obj.x = posX;
        obj.y = posY;
    }

    // Position an object at the cell by it's index
    positionItemAtIndex(index, obj) {
        var posY = Math.floor(index / this.config.columns);
        var posX = index - (posY * this.config.columns);

        this.positionItemAt(posX, posY, obj);
    }

    // Show index of the cell
    showCellIndex() {
        this.drawGrid();
        let n = 0;

        for (let i = 0; i < this.config.rows; i++) {
            for (let j = 0; j < this.config.columns; j++) {
                var text = this.scene.add.text(0, 0, n, {
                    color: '#ff0000'
                });
                text.setOrigin(.5, .5);
                this.positionItemAtIndex(n, text);
                n ++;
            }
        }
    }
}