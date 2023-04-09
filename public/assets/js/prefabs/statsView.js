class StatsView extends Phaser.GameObjects.Container {
    constructor(scene) {

        super(scene, 0, 0);
    }
}



// createDetailsView() {
//     this.type = this.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
//     this.description = this.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
//     this.health = this.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
//     this.offense = this.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
//     this.defense = this.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
//     this.range = this.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
//     this.movement = this.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
//     this.dodge = this.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
//     this.block = this.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
//     this.cooldown = this.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
    
//     this.stats = [
//         this.type, this.description, this.health, this.defense, this.offense,
//         this.range, this.movement, this.dodge, this.block, this.cooldown
//     ];
// }

// updateDetailsView(unit) {
//     if (unit) {
//         this.type.text = `${unit.type}`;
//         this.description.text = `${unit.description}`;
//         this.health.text = `${CONSTANTS.HEALTH}: ${unit.health}`;
//         this.defense.text = `${CONSTANTS.DEFENSE}: ${100 * unit.defense}%`;
//         this.offense.text = `${CONSTANTS.OFFENSE}: ${unit.offense}`;
//         this.range.text = `${CONSTANTS.RANGE}: ${unit.range}`;
//         this.movement.text = `${CONSTANTS.MOVEMENT}: ${unit.movement}`;
//         this.dodge.text = `${CONSTANTS.DODGE}: ${100 * unit.dodge}%`;
//         this.block.text = `${CONSTANTS.BLOCK}: ${100 * unit.block}%`;
//         this.cooldown.text = `${CONSTANTS.COOLDOWN}: ${unit.cooldown} [+1 after move and attack]`;

//         this.stats.forEach(stat => {
//             stat.setVisible(true);
//         })
//     }
// }

// hideDetailsView() {
//     if (this.stats) {
//         this.stats.forEach(stat => {
//             stat.setVisible(false);
//         });
//     }
// }