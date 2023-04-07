class ArmyDeployment {
    constructor(config) {
        this.scene = config.scene;
        this.army = config.army;
        this.armyUnits = config.armyUnits;
        this.generatedBoard = config.generatedBoard;
        this.unitsBoard = config.unitsBoard;

        // Specific to setup scene
        this.selectGrid = config.selectGrid;

        this.armyUnits.units.forEach(unit => {

            if (this.selectGrid) {
                let n = 0;
                this.scene.selectGridTile = null;

                do {
                    if (unit.unit === this.selectGrid.units[n] && this.selectGrid.tiles[n].unitsBoardCounterpart === null) {
                        this.scene.selectGridTile = this.selectGrid.tiles[n];
                    }
                    n++;
                } while (!this.scene.selectGridTile);

                this.addUnitToSetupBoard(this.generatedBoard.tiles[unit.tileNum], this.scene.selectGridTile);
            } else {
                this.addUnitToGameBoard(unit);
            }
        });
    }

    addUnitToGameBoard(unit) {
        // TODO: Test for player 2
        const boardTile = this.generatedBoard.tiles[unit.tileNum];

        this.createUnit(unit.type, boardTile);
    }

    addUnitToSetupBoard(boardTile, selectGridTile, incrementCounter = true) {
        if (selectGridTile) {

            // Link the two tiles
            selectGridTile.unitsBoardCounterpart = boardTile;
            boardTile.selectGridCounterpart = selectGridTile;

            // Clear the select grid tile but leave it knowing it is active
            selectGridTile.setTint(CONSTANTS.ORANGE_TINT);
            this.createUnit(selectGridTile.unit.type, boardTile)

            this.scene.selectGridTile = null;
            this.scene.boardTile = null;

            if (incrementCounter) {
                this.scene.unitsPlaced[this.army] ++;
                this.scene.updateCounter();
                this.scene.hideDetailsView();
            }
        }
    }


    createUnit(type, boardTile) {
        let unit;

        switch(type) {
            case CONSTANTS.AXE:
                unit = new Axe({
                    scene: this.scene, 
                    player: game.player,
                    tile: boardTile,
                    container: this.unitsBoard
                });
            break;
            case CONSTANTS.BOW:
                unit = new Bow({
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
