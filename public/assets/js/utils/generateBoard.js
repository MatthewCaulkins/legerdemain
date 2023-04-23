class GenerateBoard {
    constructor(config) {
        this.config = config;
        this.config.scale = this.config.scale ? this.config.scale : 1;

        // Class variables
        this._tiles = [];
        this._board;
        this._mapRows = this.config.mapRows ? this.config.mapRows : 3;
        this._mapColumns = this.config.mapColumns ? this.config.mapColumns : 11;
        this._army = config.army;

        this.createBoard();
    }

    createBoard() {
        let tile;
        this.config.segments = this._mapRows > this._mapColumns ? this._mapRows : this._mapColumns;

        // Create a board to recall tiles and units later
        this._board = new Array(this._mapRows);
        for (let x = 0; x < this._mapRows; x++)
        {
            this._board[x] = new Array(this._mapColumns);
        }
        
        // Populate board with tiles
        let n = 0;
        for (let y = 0; y < this._mapColumns; y++)
        {
            for (let x = 0; x < this._mapRows; x++)
            {
                this.config.x = x;
                this.config.y = y;

                if (this.config.scene.scene.key === CONSTANTS.PLAY_SCENE) {
                    tile = new GameBoardTile(this.config);
                } else {
                    tile = new SetupBoardTile(this.config);
                }

                this._board[x][y] = tile;
            }
        }

        // Store tiles in an easier manner
        for (let x = 0; x < this._mapRows; x++)
        {
            for (let y = 0; y < this._mapColumns; y++)
            {
                const tile = this._board[x][y];
                tile.number = n;

                this._tiles[n] = tile;
                n++;
            }
        }
    }

    getTile(tileNumber) {
        return this._tiles[tileNumber];
    }

    // Bet the tiles
    get tiles() {
        return this._tiles;
    }

    // Get the whole board
    get board() {
        return this._board;
    }

    // Get the mapRows
    get mapRows() {
        return this._mapRows;
    }

    // Set the unit on this tile
    get mapColumns() {
        return this._mapColumns;
    }
}