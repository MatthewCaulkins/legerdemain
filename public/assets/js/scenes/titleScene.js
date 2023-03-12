class TitleScene extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload() {
    
    }

    create() {
        this.alignmentGrid = new AlignmentGrid({rows: 11, columns: 11, scene: this});
        this.alignmentGrid.showCellIndex();
    }

    update() {
        
    }
}