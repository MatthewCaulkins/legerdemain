class UnitStats extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene, 0, 0);

        this.sceneKey = scene.scene.key;

        this._active = false;
        this.hoverUnit = null;
        this.activeUnit = null;

        // if (this.sceneKey === CONSTANTS.PLAY_SCENE) {
        //     this.type = scene.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
        //     this.description = scene.add.text(0, 40, '', CONSTANTS.HUD_STYLE);
        //     this.health = scene.add.text(0, 40, '', CONSTANTS.HUD_STYLE);
        //     this.defense = scene.add.text(150, 40, '', CONSTANTS.HUD_STYLE);
        //     this.offense = scene.add.text(0, 80, '', CONSTANTS.HUD_STYLE);
        //     this.range = scene.add.text(150, 80, '', CONSTANTS.HUD_STYLE);
        //     this.dodge = scene.add.text(0, 120, '', CONSTANTS.HUD_STYLE);
        //     this.block = scene.add.text(150, 120, '', CONSTANTS.HUD_STYLE);
        //     this.movement = scene.add.text(0, 160, '', CONSTANTS.HUD_STYLE);
        //     this.cooldown = scene.add.text(150, 160, '', CONSTANTS.HUD_STYLE);
            
        //     this.stats = [
        //         this.type, this.health, this.defense, this.offense,
        //         this.range, this.movement, this.dodge, this.block, this.cooldown
        //     ];
            
        //     this.setSize(300, 180);
        // } else {
            this.type = scene.add.text(0, 0, '', CONSTANTS.HUD_STYLE);
            this.description = scene.add.text(0, 40, '', CONSTANTS.HUD_STYLE);
            this.health = scene.add.text(0, 100, '', CONSTANTS.HUD_STYLE);
            this.defense = scene.add.text(150, 100, '', CONSTANTS.HUD_STYLE);
            this.offense = scene.add.text(0, 140, '', CONSTANTS.HUD_STYLE);
            this.range = scene.add.text(150, 140, '', CONSTANTS.HUD_STYLE);
            this.dodge = scene.add.text(0, 180, '', CONSTANTS.HUD_STYLE);
            this.block = scene.add.text(150, 180, '', CONSTANTS.HUD_STYLE);
            this.movement = scene.add.text(0, 220, '', CONSTANTS.HUD_STYLE);
            this.cooldown = scene.add.text(150, 220, '', CONSTANTS.HUD_STYLE);
            this.disclaimer = scene.add.text(0, 280, '', CONSTANTS.HUD_STYLE);
            
            this.stats = [
                this.type, this.description, this.health, this.defense, this.offense,
                this.range, this.movement, this.dodge, this.block, this.cooldown, this.disclaimer
            ];
            
            this.setSize(300, 320);
        // }

        this.stats.forEach(stat => {
            this.add(stat);
        })

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
            this.type.text = `${this.capitalize(unit.type)}`;
            this.health.text = `${CONSTANTS.HEALTH}: ${unit.currentHealth} / ${unit.health}`;
            this.defense.text = `${CONSTANTS.DEFENSE}: ${100 * unit.defense}%`;
            this.offense.text = `${CONSTANTS.OFFENSE}: ${unit.offense}`;
            this.range.text = `${CONSTANTS.RANGE}: ${unit.range}`;
            this.movement.text = `${CONSTANTS.MOVEMENT}: ${unit.movement}`;
            this.dodge.text = `${CONSTANTS.DODGE}: ${100 * unit.dodge}%`;
            this.block.text = `${CONSTANTS.BLOCK}: ${100 * unit.block}%`;
            this.cooldown.text = `${CONSTANTS.COOLDOWN}: ${unit.currentCooldown}`;

            this.cooldown.text = `${CONSTANTS.COOLDOWN}: ${unit.cooldown} [+1]*`;

            this.description.text = `${unit.description}`;
            this.disclaimer.text = '*When using attack and move'
            
            if (this.sceneKey === CONSTANTS.SETUP_SCENE) {
                this.health.text = `${CONSTANTS.HEALTH}: ${unit.health}`;
            }
        }

        this.setVisible(true);
    }

    capitalize(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
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