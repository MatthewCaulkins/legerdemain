class Healing extends Unit {
    constructor(config) {
        config.tintTexture = CONSTANTS.LANCE_TINT;
        config.characterTexture = CONSTANTS.LANCE;
        
        super(config);

        this.type = CONSTANTS.HEALING;
        this.description = 'Area of effect heal with radius 3';
        this.health = 18;
        this.defense = 0;
        this.offense = 15;
        this.range = 5;
        this.movement = 3;
        this.dodge = .15;
        this.block = 0;
        this.cooldown = 4;
        
        // TODO: TEMPORARY UNTIL I GET UNIQUE UNITS ART - later will use this to set the player's army tint
        super.setTint(CONSTANTS.YELLOW_TINT);
    }
}