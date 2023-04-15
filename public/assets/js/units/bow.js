class Bow extends Unit {
    constructor(config) {
        config.tintTexture = CONSTANTS.LANCE_TINT;
        config.characterTexture = CONSTANTS.LANCE;
        
        super(config);

        this.type = CONSTANTS.BOW;
        this.description = 'Long range direct hit';
        this.health = 25;
        this.defense = .05;
        this.offense = 15;
        this.range = 5;
        this.movement = 3;
        this.dodge = .2;
        this.block = .1;
        this.cooldown = 2;
        
        this.currentHealth = this.health;
        this.currentCooldown = 0;
        
        // TODO: TEMPORARY UNTIL I GET UNIQUE UNITS ART - later will use this to set the player's army tint
        super.setTint(CONSTANTS.TEAL_TINT);
    }
}