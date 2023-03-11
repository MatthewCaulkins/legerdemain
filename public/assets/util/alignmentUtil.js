class AlignmentUtil {
    constructor(config) {
        this.config = config;

        if (!config.scene) return;

        if (!config.rows) {
            config.rows = 10;
        }
        if (!config.columns) {
            config.columns = 10;
        }
        if (!config.height) {
            config.height = game.config.height;
        }
        if (!config.width) {
            config.width = game.config.width;
        }

        this.scene = config.scene;

        // set grid size
        this.gridWidth = config.width / config.columns;
        this.gridHeight = config.height / config.rows;
    }

    draw() {
        this.graphics = this.scene.add.graphics();

        this.graphics.lineStyle(2, 0xff0000);

        for (let i = 0; i < this.config.width; i += this.gridWidth) {
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.config.height);
        }
        for (let j = 0; j < this.config.height; j += this.gridHeight) {
            this.graphics.moveTo(0, j);
            this.graphics.lineTo(this.config.width, j);
        }
        this.graphics.strokePath();
    }
}