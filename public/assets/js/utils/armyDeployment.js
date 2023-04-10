class ArmyDeployment {
    constructor(config) {
        this.scene = config.scene;
        this.army = config.army;
        this.armyUnits = config.armyUnits;
        this.generatedBoard = config.generatedBoard;
        this.unitsBoard = config.unitsBoard;

        // Specific to setup scene
        this.selectGrid = config.selectGrid;

        if (this.armyUnits) {
            this.populateBoard();
        }
    }

    clearGameBoard() {
        this.generatedBoard.tiles.forEach(tile => {
            if (tile.unit) {
                tile.unit.destroy();
                tile.unit = null;
                if (this.selectGrid) {
                    tile.selectGridCounterpart = null;
                }
            }
        });

        if (this.selectGrid) {
            console.log(this.selectGrid);
            this.selectGrid.tiles.forEach(tile => {
                tile.clearTint();
                tile.unit.alpha = 1;
                tile.unitsBoardCounterpart = null;
            });
        }
    }

    populateBoard() {
        this.armyUnits.units.forEach(unit => {
            if (this.selectGrid) { // Setup scene
                let n = 0;
                this.scene.selectGridTile = null;

                do {
                    if (unit.unit === this.selectGrid.units[n] && this.selectGrid.tiles[n].unitsBoardCounterpart === null) {
                        this.scene.selectGridTile = this.selectGrid.tiles[n];
                    }
                    n++;
                } while (!this.scene.selectGridTile);

                this.addUnitToSetupBoard(this.generatedBoard.tiles[unit.tileNum], this.scene.selectGridTile);
            } else { // Play scene
                this.addUnitToGameBoard(unit);
            }
        });
    }

    addUnitToGameBoard(unit) {
        // TODO: Test for player 2
        // console.log(unit);
        const boardTile = this.generatedBoard.tiles[unit.tileNum];

        // console.log(boardTile);
        this.createUnit(unit.unit, boardTile);
    }

    addUnitToSetupBoard(boardTile, selectGridTile, incrementCounter = true) {
        if (selectGridTile) {

            // Link the two tiles
            selectGridTile.unitsBoardCounterpart = boardTile;
            boardTile.selectGridCounterpart = selectGridTile;

            // Clear the select grid tile but leave it knowing it is active
            selectGridTile.unit.alpha = .5;
            selectGridTile.setTint(CONSTANTS.ORANGE_TINT);
            this.createUnit(selectGridTile.unit.type, boardTile)

            this.scene.selectGridTile = null;
            this.scene.boardTile = null;

            if (incrementCounter) {
                this.scene.unitsPlaced[this.army] ++;
                this.scene.updateCounter();
                this.scene.hideStats();
            }
        }
    }


    createUnit(type, boardTile) {
        // console.log(type);
        // console.log(boardTile);
        switch(type) {
            case CONSTANTS.AXE:
                boardTile.unit = new Axe({
                    scene: this.scene, 
                    player: game.player,
                    tile: boardTile,
                    container: this.unitsBoard
                });
            break;
            case CONSTANTS.BOW:
                boardTile.unit = new Bow({
                    scene: this.scene, 
                    player: game.player,
                    tile: boardTile,
                    container: this.unitsBoard
                });
            break;
            case CONSTANTS.CONTROL:
                boardTile.unit = new Control({
                    scene: this.scene, 
                    player: game.player,
                    tile: boardTile,
                    container: this.unitsBoard
                });
            break;
            case CONSTANTS.DAGGER:
                boardTile.unit = new Dagger({
                    scene: this.scene, 
                    player: game.player,
                    tile: boardTile,
                    container: this.unitsBoard
                });
            break;
            case CONSTANTS.HEALING:
                boardTile.unit = new Healing({
                    scene: this.scene, 
                    player: game.player,
                    tile: boardTile,
                    container: this.unitsBoard
                });
            break;
            case CONSTANTS.LANCE:
                boardTile.unit = new Lance({
                    scene: this.scene, 
                    player: game.player,
                    tile: boardTile,
                    container: this.unitsBoard
                });
            break;
            case CONSTANTS.SHIELD:
                boardTile.unit = new Shield({
                    scene: this.scene, 
                    player: game.player,
                    tile: boardTile,
                    container: this.unitsBoard
                });
            break;
            case CONSTANTS.SORCERY:
                boardTile.unit = new Sorcery({
                    scene: this.scene, 
                    player: game.player,
                    tile: boardTile,
                    container: this.unitsBoard
                });
            break;
            case CONSTANTS.SWORD:
                boardTile.unit = new Sword({
                    scene: this.scene, 
                    player: game.player,
                    tile: boardTile,
                    container: this.unitsBoard
                });
            break;
        }
    }
}
