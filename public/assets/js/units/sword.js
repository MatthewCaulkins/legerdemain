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
        
        // Frame keys
        this.topIdle = CONSTANTS.LANCE_TOP_IDLE;
        this.rightIdle = CONSTANTS.LANCE_RIGHT_IDLE;
        this.bottomIdle = CONSTANTS.LANCE_BOTTOM_IDLE;
        this.leftIdle = CONSTANTS.LANCE_LEFT_IDLE;

        this.topTintIdle = CONSTANTS.LANCE_TINT_RIGHT_IDLE;
        this.rightTintIdle = CONSTANTS.LANCE_TINT_TOP_IDLE;
        this.bottomTintIdle = CONSTANTS.LANCE_TINT_BOTTOM_IDLE;
        this.leftTintIdle = CONSTANTS.LANCE_TINT_LEFT_IDLE;
        // TODO: TEMPORARY UNTIL I GET UNIQUE UNITS ART - later will use this to set the player's army tint
        super.setTint(CONSTANTS.GREEN_TINT);
        super.setDirection(config.direction);
    }
}