class SelectUnitsGrid {
    constructor(config) {
        this.config = config;
        this.config.scale = this.config.scale ? this.config.scale : 1;
        this.board;

        this.createGrid();
        
        // this.totalPages;
        // this.page;
        // this.page;
    }

    createGrid() {
        this.scene = this.config.scene;
        this.container = this.config.container;
        
        this.gridRows = this.config.gridRows ? this.config.gridRows : 3;
        this.gridColumns = this.config.gridColumns ? this.config.gridColumns : 3;

        this.units = [];

        this.config.units.forEach(unit => {            
            switch(unit.unit) {
                case 'axe':
                    for (let i = 0; i < unit.num; i ++) {
                        this.units.push('axe');
                    }
                    break;
                case 'bow':
                    for (let i = 0; i < unit.num; i ++) {
                        this.units.push('bow');
                    }
                    break;
                case 'control':
                    for (let i = 0; i < unit.num; i ++) {
                        this.units.push('control');
                    }
                    break;
                case 'dagger':
                    for (let i = 0; i < unit.num; i ++) {
                        this.units.push('dagger');
                    }
                    break;
                case 'healing':
                    for (let i = 0; i < unit.num; i ++) {
                        this.units.push('healing');
                    }
                    break;
                case 'lance':
                    for (let i = 0; i < unit.num; i ++) {
                        this.units.push('lance');
                    }
                    break;
                case 'shield':
                    for (let i = 0; i < unit.num; i ++) {
                        this.units.push('shield');
                    }
                    break;
                case 'sorcery':
                    for (let i = 0; i < unit.num; i ++) {
                        this.units.push('sorcery');
                    }
                    break;
                case 'sword':
                    for (let i = 0; i < unit.num; i ++) {
                        this.units.push('sword');
                    }
                    break;
            }
        });

        // const tileConfig = {
        //     scene: this.scene,
        //     tileWidth: this.config.tileWidth, 
        //     tileHeight: this.config.tileHeight,
        //     scale: this.config.scale,
        //     container: this.boardContainer,
        //     orientation: CONSTANTS.UNITS_ORIENTATION
        // }

        const unitConfig = {
            scene: this.scene,
            player: this.config.player,
            container: this.container,
        }

        let n = 0;
        let unitType;
        
        // while n < unitNum make a new page
        // Setup the board for this page
        this.board = new Array(this.gridRows);
        for (let x = 0; x < this.gridRows; x++)
        {
            this.board[x] = new Array(this.gridColumns);
        }

        for (let y = 0; y < this.gridColumns; y++)
        {
            for (let x = 0; x < this.gridRows; x++)
            {
                if (this.units[n]) {
                    const tile = new Tile(this.config, x, y, 0, n);
                    this.board[x][y] = tile;
                    
                    unitConfig.tile = tile;

                    unitType = this.units[n];
                    switch(unitType) {
                        case 'axe':
                            new Axe(unitConfig);
                            break;
                        case 'bow':
                            new Bow(unitConfig);
                            break;
                        case 'control':
                            new Control(unitConfig);
                            break;
                        case 'dagger':
                            new Dagger(unitConfig);
                            break;
                        case 'healing':
                            new Healing(unitConfig);
                            break;
                        case 'lance':
                            new Lance(unitConfig);
                            break;
                        case 'shield':
                            new Shield(unitConfig);
                            break;
                        case 'sorcery':
                            new Sorcery(unitConfig);
                            break;
                        case 'sword':
                            new Sword(unitConfig);
                            break;
                    }
                }

                n++;
            }
        }

        this.container.setSize(this.gridRows * (this.config.tileWidth + 10), this.gridColumns * (this.config.tileHeight + 10));
    }
}