class StatsView extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene, 0, 0);

        this._active = false;
        this.hoverUnit = null;
        this.activeUnit = null;

        this.type = scene.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
        this.description = scene.add.text(0, 20, '', CONSTANTS.HUD_STYLE);
        this.health = scene.add.text(40, 20, '', CONSTANTS.HUD_STYLE);
        this.offense = scene.add.text(80, 20, '', CONSTANTS.HUD_STYLE);
        this.defense = scene.add.text(0, 40, '', CONSTANTS.HUD_STYLE);
        this.range = scene.add.text(40, 40, '', CONSTANTS.HUD_STYLE);
        this.movement = scene.add.text(80, 40, '', CONSTANTS.HUD_STYLE);
        this.dodge = scene.add.text(0, 60, '', CONSTANTS.HUD_STYLE);
        this.block = scene.add.text(40, 60, '', CONSTANTS.HUD_STYLE);
        this.cooldown = scene.add.text(80, 60, '', CONSTANTS.HUD_STYLE);
        
        this.stats = [
            this.type, this.description, this.health, this.defense, this.offense,
            this.range, this.movement, this.dodge, this.block, this.cooldown
        ];

        this.stats.forEach(stat => {
            this.add(stat);
        })

        this.setSize(120, 80);

        this.scene.add.existing(this);
    }

    get active() {
        return this._active;
    }

    set active(active) {
        this._active = active;
    }




// createDetailsView() {
//     
    
//     
// }

    updateStats(unit) {
        if (unit) {
            this.type.text = `${unit.type}`;
            this.description.text = `${unit.description}`;
            this.health.text = `${CONSTANTS.HEALTH}: ${unit.health}`;
            this.defense.text = `${CONSTANTS.DEFENSE}: ${100 * unit.defense}%`;
            this.offense.text = `${CONSTANTS.OFFENSE}: ${unit.offense}`;
            this.range.text = `${CONSTANTS.RANGE}: ${unit.range}`;
            this.movement.text = `${CONSTANTS.MOVEMENT}: ${unit.movement}`;
            this.dodge.text = `${CONSTANTS.DODGE}: ${100 * unit.dodge}%`;
            this.block.text = `${CONSTANTS.BLOCK}: ${100 * unit.block}%`;
            this.cooldown.text = `${CONSTANTS.COOLDOWN}: ${unit.cooldown} [+1 after move and attack]`;
        }

        this.setVisible(true);
    }

    hideStats() {
        this.setVisible(false);
    }
}

// hideDetailsView() {
//     if (this.stats) {
//         this.stats.forEach(stat => {
//             stat.setVisible(false);
//         });
//     }
// }