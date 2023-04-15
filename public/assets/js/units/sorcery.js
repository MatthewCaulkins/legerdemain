class Sorcery extends Unit {
    constructor(config) {
        config.tintTexture = CONSTANTS.LANCE_TINT;
        config.characterTexture = CONSTANTS.LANCE;
        
        super(config);

        this.type = CONSTANTS.SORCERY;
        this.description = 'Line of sight attack with radius 1';
        this.health = 20;
        this.defense = 0;
        this.offense = 15;
        this.range = 5;
        this.movement = 3;
        this.dodge = .1;
        this.block = .1;
        this.cooldown = 3;
        
        this.currentHealth = this.health;
        this.currentCooldown = 0;
        
        // TODO: TEMPORARY UNTIL I GET UNIQUE UNITS ART - later will use this to set the player's army tint
        super.setTint(CONSTANTS.PURPLE_TINT);
    }
}