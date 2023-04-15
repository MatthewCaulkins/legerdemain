class Sword extends Unit {
    constructor(config) {
        config.tintTexture = CONSTANTS.LANCE_TINT;
        config.characterTexture = CONSTANTS.LANCE;
    
        super(config);

        this.type = CONSTANTS.SWORD;
        this.description = 'Can dash to attack 2 space away in a straight line';
        this.health = 30;
        this.defense = .05;
        this.offense = 18;
        this.range = 1;
        this.movement = 4;
        this.dodge = .25;
        this.block = .25;
        this.cooldown = 1;
        
        this.currentHealth = this.health;
        this.currentCooldown = 0;
        
        // TODO: TEMPORARY UNTIL I GET UNIQUE UNITS ART - later will use this to set the player's army tint
        super.setTint(CONSTANTS.GREEN_TINT);
    }
}